const axios = require('axios');
const TOTAL = 100;
const CONCURRENT = 10;
const URL = 'http://localhost:3000/todos';

let success = 0, fail = 0;
const payload = { task: 'Load test task' };

const makeRequest = async () => {
    try {
        await axios.post(URL, payload);
        success++;
    } catch {
        fail++;
    }
};

const run = async () => {
    const batch = Array.from({ length: TOTAL }, (_, i) => {
        if (i % CONCURRENT === 0) return new Promise(res => setTimeout(res, 100)).then(makeRequest);
        return makeRequest();
    });
    await Promise.all(batch);
    console.log(`✅ Success: ${success} ❌ Fail: ${fail}`);
};

run();
