import campaignMonitor from 'campaignmonitor';

const apiKey = process.env.CAMPMONITOR_API_KEY;
const apiConn = campaignMonitor({ apiKey: apiKey });

export default apiConn;


