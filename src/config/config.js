import dotenv from 'dotenv';

dotenv.config();

const config = {
    // === Laravel ===
    agentId: process.env.AGENT_ID,
    agentSecret: process.env.AGENT_SECRET,
    laravelBaseUrl: process.env.LARAVEL_BASE_URL,

    // === Print Agent ===
    pollInterval: Number(process.env.POLL_INTERVAL || 5000),

    // === Ambiente ===
    environment: process.env.NODE_ENV || 'production'
};

export default config;