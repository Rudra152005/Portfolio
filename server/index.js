const express = require('express');
const cors = require('cors');
const axios = require('axios');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Root test route
app.get('/', (req, res) => {
    res.json({ status: 'online', message: 'LeetCode Proxy is Running!' });
});

// LeetCode Stats Endpoint
app.get('/api/user-stats/:username', async (req, res) => {
    const { username } = req.params;
    const graphqlUrl = 'https://leetcode.com/graphql';
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
        const response = await axios.post(graphqlUrl, {
            query,
            variables: { username },
        }, {
            headers: {
                'Content-Type': 'application/json',
                'User-Agent': 'Mozilla/5.0',
                'Referer': `https://leetcode.com/${username}/`
            }
        });

        const data = response.data.data;
        if (!data || !data.matchedUser) {
            return res.status(404).json({ status: 'error', message: 'User not found' });
        }

        const stats = data.matchedUser.submitStats.acSubmissionNum;
        const calendarJson = JSON.parse(data.matchedUser.submissionCalendar || '{}');
        const timestamps = Object.keys(calendarJson).map(t => parseInt(t)).sort((a, b) => b - a);

        let currentStreak = 0;
        let maxStreak = 0;
        const oneDay = 86400;

        if (timestamps.length > 0) {
            const now = Math.floor(Date.now() / 1000);
            if (now - timestamps[0] < oneDay * 2) {
                currentStreak = 1;
                for (let i = 1; i < timestamps.length; i++) {
                    if (timestamps[i - 1] - timestamps[i] <= oneDay + 3600) currentStreak++;
                    else break;
                }
            }
            let currentTemp = 1;
            for (let i = 1; i < timestamps.length; i++) {
                if (timestamps[i - 1] - timestamps[i] <= oneDay + 3600) currentTemp++;
                else {
                    maxStreak = Math.max(maxStreak, currentTemp);
                    currentTemp = 1;
                }
            }
            maxStreak = Math.max(maxStreak, currentTemp);
        }

        res.json({
            status: 'success',
            totalSolved: stats.find(s => s.difficulty === 'All')?.count || 0,
            easySolved: stats.find(s => s.difficulty === 'Easy')?.count || 0,
            mediumSolved: stats.find(s => s.difficulty === 'Medium')?.count || 0,
            hardSolved: stats.find(s => s.difficulty === 'Hard')?.count || 0,
            streak: currentStreak,
            maxStreak: maxStreak,
            submissionCalendar: calendarJson
        });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
});

// GitHub Stats Endpoint
app.get('/api/github-stats/:username', async (req, res) => {
    const { username } = req.params;
    const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

    const headers = { 'User-Agent': 'Portfolio-Proxy' };
    if (GITHUB_TOKEN && GITHUB_TOKEN.startsWith('ghp_')) {
        headers['Authorization'] = `token ${GITHUB_TOKEN}`;
    }

    try {
        const userRes = await axios.get(`https://api.github.com/users/${username}`, { headers, timeout: 10000 });
        let repos = [];
        try {
            const reposRes = await axios.get(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`, { headers, timeout: 10000 });
            repos = reposRes.data;
        } catch (e) { }

        res.json({ status: 'success', user: userRes.data, repos });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
});

// Contact Form Endpoint
const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASS = process.env.EMAIL_PASS;
const RECEIVER_EMAIL = process.env.RECEIVER_EMAIL;

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
    },
});

app.post('/api/contact', async (req, res) => {
    const { name, email, message } = req.body;
    const timestamp = new Date().toLocaleString();

    if (!name || !email || !message) {
        return res.status(400).json({ status: 'error', message: 'All fields are required' });
    }

    const mailOptions = {
        from: `"${name}" <${EMAIL_USER}>`,
        to: RECEIVER_EMAIL,
        subject: `🚀 New Collaboration Inquiry: ${name}`,
        text: `Name: ${name}\nEmail: ${email}\nTime: ${timestamp}\n\nMessage Payload:\n${message}`,
        replyTo: email
    };

    try {
        console.log(`[Contact] Processing transmission from: ${name} (${email}) at ${timestamp}`);
        await transporter.sendMail(mailOptions);
        res.json({
            status: 'success',
            message: 'Thanks! Your message has been sent successfully.',
            timestamp: timestamp,
            whatsappMsg: encodeURIComponent(`Hi Rudhra, I just sent you a premium inquiry via your portfolio form at ${timestamp}. My email is ${email}. Let's discuss!`)
        });
    } catch (error) {
        console.error('[Contact Error]:', error.message);
        const errorMsg = error.code === 'EAUTH'
            ? 'Email authentication failed. Ensure you are using a 16-character Gmail App Password.'
            : 'Transmission failure.';
        res.status(500).json({ status: 'error', message: errorMsg });
    }
});

app.listen(PORT, () => console.log(`Proxy running on http://localhost:${PORT}`));
