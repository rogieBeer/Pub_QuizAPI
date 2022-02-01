const express = require("express");
const path = require('path');
const mongoose = require('mongoose')
const cors = require('cors');

// App
const app = express();

// Set port
const port = process.env.PORT || "3001";
app.set("port", port);

mongoose.connect("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX", { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', () => console.error(error))
db.once('open', () => console.log('DB Connected'))


app.use(cors());

app.use(express.json())

app.options('*', cors())

const quizRouter = require('./routes/quizRoute')
app.use('/quiz', quizRouter)

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '/views/index.html'));
  });

// Server
app.listen(port, () => console.log(`Server running on: ${port}`));