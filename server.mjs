import dotenv from 'dotenv';
dotenv.config();

import app from './app.mjs';

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
