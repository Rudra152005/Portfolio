const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Root test route
app.get('/', (req, res) => {
    res.json({ status: 'online', message: 'LeetCode Proxy is Running!' });
});

app.get('/api/user-stats/:username', async (req, res) => {
    const { username } = req.params;
    const graphqlUrl = 'https://leetcode.com/graphql';

    // This is the query that is known to work reliably
    const query = `
    query userPublicProfile($username: String!) {
      matchedUser(username: $username) {
        submitStats: submitStatsGlobal {
          acSubmissionNum {
            difficulty
            count
          }
        }
        submissionCalendar
      }
    }
  `;

    try {
        console.log(`[Proxy] Fetching LeetCode data for: ${username}`);
        const response = await axios.post(graphqlUrl, {
            query,
            variables: { username },
        }, {
            headers: {
                'Content-Type': 'application/json',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Referer': `https://leetcode.com/${username}/`
            }
        });

        const data = response.data.data;
        if (!data || !data.matchedUser) {
            return res.status(404).json({ status: 'error', message: 'User not found' });
        }

        const stats = data.matchedUser.submitStats.acSubmissionNum;
        const calendarJson = JSON.parse(data.matchedUser.submissionCalendar || '{}');

        // Calculate Streak from Calendar
        const timestamps = Object.keys(calendarJson).map(t => parseInt(t)).sort((a, b) => b - a);
        let currentStreak = 0;
        let maxStreak = 0;
        let tempStreak = 0;

        // Very basic streak calculation for the UI
        if (timestamps.length > 0) {
            // Check if today/yesterday has activity
            const now = Math.floor(Date.now() / 1000);
            const oneDay = 86400;
            const lastActive = timestamps[0];

            if (now - lastActive < oneDay * 2) {
                currentStreak = 1;
                // walk backwards to find consecutive days
                for (let i = 1; i < timestamps.length; i++) {
                    if (timestamps[i - 1] - timestamps[i] <= oneDay + 3600) { // +1hr buffer
                        currentStreak++;
                    } else {
                        break;
                    }
                }
            }

            // max streak loop
            let currentTemp = 1;
            for (let i = 1; i < timestamps.length; i++) {
                if (timestamps[i - 1] - timestamps[i] <= oneDay + 3600) {
                    currentTemp++;
                } else {
                    maxStreak = Math.max(maxStreak, currentTemp);
                    currentTemp = 1;
                }
            }
            maxStreak = Math.max(maxStreak, currentTemp);
        }

        const result = {
            status: 'success',
            totalSolved: stats.find(s => s.difficulty === 'All')?.count || 0,
            easySolved: stats.find(s => s.difficulty === 'Easy')?.count || 0,
            mediumSolved: stats.find(s => s.difficulty === 'Medium')?.count || 0,
            hardSolved: stats.find(s => s.difficulty === 'Hard')?.count || 0,
            streak: currentStreak,
            maxStreak: maxStreak,
            submissionCalendar: calendarJson
        };

        console.log(`[Proxy] Success: ${username} solved ${result.totalSolved}. Streak: ${result.streak}`);
        res.json(result);
    } catch (error) {
        console.error('[Proxy Error]:', error.message);
        res.status(500).json({ status: 'error', message: error.message });
    }
});

require('dotenv').config();

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

app.get('/api/github-stats/:username', async (req, res) => {
    const { username } = req.params;

    // Configure headers for authentication if token is provided
    const headers = {
        'User-Agent': 'Portfolio-Proxy'
    };

    if (GITHUB_TOKEN && GITHUB_TOKEN.startsWith('ghp_')) {
        headers['Authorization'] = `token ${GITHUB_TOKEN}`;
        console.log(`[Proxy] Using GitHub Token for ${username}`);
    }

    try {
        console.log(`[Proxy] Fetching GitHub data for: ${username}`);
        const userRes = await axios.get(`https://api.github.com/users/${username}`, {
            headers,
            timeout: 10000
        });

        let repos = [];
        try {
            const reposRes = await axios.get(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`, {
                headers,
                timeout: 10000
            });
            repos = reposRes.data;
        } catch (e) {
            console.warn(`[Proxy] GitHub Repos fetch failed (possibly rate limited or private): ${e.message}`);
        }

        res.json({
            status: 'success',
            user: userRes.data,
            repos: repos
        });
    } catch (error) {
        console.error('[Proxy GitHub Error]:', error.message);
        const isRateLimit = error.response && error.response.status === 403;
        res.status(isRateLimit ? 403 : 500).json({
            status: 'error',
            message: isRateLimit ? 'GitHub Rate Limit Exceeded' : 'Failed to fetch GitHub data',
            details: error.response ? error.response.data : error.message
        });
    }
});

app.listen(PORT, () => console.log(`Proxy running on http://localhost:${PORT}`));

