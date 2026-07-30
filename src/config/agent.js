import dotenv from 'dotenv';

dotenv.config();

export default {

    id: process.env.AGENT_ID,

    host: process.env.HOST,

    port: Number(process.env.PORT),

    timeout: Number(process.env.REQUEST_TIMEOUT),

    environment: process.env.NODE_ENV,

};