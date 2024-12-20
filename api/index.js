// index.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv'); 
const { initializeDbAndServer } = require('./db');
const fileRouter = require('./routers/fileRouter');
const authRouter = require('./routers/authRouter');
const path = require('path');

dotenv.config(); 

const app = express();
const port = process.env.PORT || 3000; 
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());



app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/file', fileRouter);
app.use('/admin', authRouter);

initializeDbAndServer().then(() => {
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
}).catch(err => {
  console.error('Failed to initialize the database:', err);
  process.exit(1);
});
