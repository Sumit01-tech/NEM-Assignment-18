const axios = require('axios');

const TOTAL_REQUESTS = 100;
const CONCURRENT = 10;
const URL = 'http://localhost:3000/todos';

const payload = { task: 'Load Test Task' };
let completed = 0;
let failed = 0;
let start = Date.now();

const makeRequest = async () => {
    try {
        await axios.post(URL, payload);
        completed++;
    } catch (err) {
        failed++;
    }
};

const runLoadTest = async () => {
    const requests = Array.from({ length: TOTAL_REQUESTS }, async (_, i) => {
        if (i % CONCURRENT === 0) await new Promise(res => setTimeout(res, 100)); // rate control
        return makeRequest();
    });

    await Promise.all(requests);
    const duration = (Date.now() - start) / 1000;

    console.log(`✅ Completed: ${completed}`);
    console.log(`❌ Failed: ${failed}`);
    console.log(`⏱ Time: ${duration.toFixed(2)}s`);
};

runLoadTest();
