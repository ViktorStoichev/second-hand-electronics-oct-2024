import express from 'express';
import routes from './routes.js';
import expressInit from './config/expressInit.js';
import handlebarsInit from './config/handlebarsInit.js';

const app = express();
const port = 3000;

handlebarsInit(app);
expressInit(app);

app.use(routes);

app.listen(port, () => console.log(`Server is listening on http://localhost:${port}...`));