import dotenv from 'dotenv';

import { createApp } from './app.js';

dotenv.config();

const app = createApp();
const port = Number(process.env.PORT ?? 3000);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});