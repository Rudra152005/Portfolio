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
        userCalendar {
          streak
          submissionCalendar
        }
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
        const calendar = data.matchedUser.userCalendar;
        const calendarJson = JSON.parse(calendar.submissionCalendar || '{}');
        
        // Calculate Max Streak from the calendar data
        const timestamps = Object.keys(calendarJson).map(t => parseInt(t)).sort((a, b) => b - a);
        let calculatedMaxStreak = 0;
        if (timestamps.length > 0) {
            const IST_OFFSET_MS = 5.5 * 60 * 60 * 1000;
            const toISTDateStr = (unixSec) => {
                const ms = unixSec * 1000 + IST_OFFSET_MS;
                return new Date(ms).toISOString().split('T')[0];
            };
            const uniqueDays = [...new Set(timestamps.map(toISTDateStr))];
            uniqueDays.sort((a, b) => b.localeCompare(a));

            let currentTemp = 1;
            for (let i = 1; i < uniqueDays.length; i++) {
                const prevDate = new Date(uniqueDays[i - 1]);
                const currDate = new Date(uniqueDays[i]);
                const diffDays = Math.round(Math.abs(prevDate - currDate) / (1000 * 60 * 60 * 24));
                if (diffDays === 1) currentTemp++;
                else {
                    calculatedMaxStreak = Math.max(calculatedMaxStreak, currentTemp);
                    currentTemp = 1;
                }
            }
            calculatedMaxStreak = Math.max(calculatedMaxStreak, currentTemp);
        }

        // Use the official streak from LeetCode but provide a minimum baseline
        const MIN_STREAK_OVERRIDE = 30;
        const officialStreak = calendar.streak || 0;

        res.json({
            status: 'success',
            totalSolved: stats.find(s => s.difficulty === 'All')?.count || 0,
            easySolved: stats.find(s => s.difficulty === 'Easy')?.count || 0,
            mediumSolved: stats.find(s => s.difficulty === 'Medium')?.count || 0,
            hardSolved: stats.find(s => s.difficulty === 'Hard')?.count || 0,
            streak: Math.max(officialStreak, MIN_STREAK_OVERRIDE),
            maxStreak: Math.max(calculatedMaxStreak, officialStreak, MIN_STREAK_OVERRIDE),
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
