const axios = require('axios');

const username = "RudraTiwari";
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

async function test() {
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
            console.log("User not found");
            return;
        }

        const calendarJson = JSON.parse(data.matchedUser.submissionCalendar || '{}');
        const timestamps = Object.keys(calendarJson).map(t => parseInt(t)).sort((a, b) => b - a);
        
        console.log("Found", timestamps.length, "submission days");
        if (timestamps.length > 0) {
            const IST_OFFSET_MS = 5.5 * 60 * 60 * 1000;
            const toISTDateStr = (unixSec) => {
                const ms = unixSec * 1000 + IST_OFFSET_MS;
                return new Date(ms).toISOString().split('T')[0];
            };

            const uniqueDays = [...new Set(timestamps.map(toISTDateStr))];
            uniqueDays.sort((a, b) => b.localeCompare(a));
            
            console.log("Recent unique days (IST):", uniqueDays.slice(0, 5));
            
            const nowIST = new Date(Date.now() + IST_OFFSET_MS);
            const todayStr = nowIST.toISOString().split('T')[0];
            const yesterdayDate = new Date(nowIST);
            yesterdayDate.setDate(yesterdayDate.getDate() - 1);
            const yesterdayStr = yesterdayDate.toISOString().split('T')[0];
            
            console.log("Today (IST):", todayStr);
            console.log("Yesterday (IST):", yesterdayStr);
            
            if (uniqueDays[0] === todayStr || uniqueDays[0] === yesterdayStr) {
                console.log("Streak is active!");
            } else {
                console.log("Streak is broken according to current logic.");
            }
        }
    } catch (error) {
        console.error("Error:", error.message);
    }
}

test();
