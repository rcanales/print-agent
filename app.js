import express from 'express';
import helmet from 'helmet';

import routes from './src/routes/index.js';

const app = express();

app.use(helmet());

app.use(express.json());

app.use(express.urlencoded({
    extended: true
}));

app.use(routes);

export default app;