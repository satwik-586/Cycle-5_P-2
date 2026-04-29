
const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const bodyParser = require('body-parser');
const path = require('path');

// Create Express app
const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// MongoDB configuration
const MONGO_URI = 'mongodb://localhost:27017';
const DATABASE_NAME = 'SNIST';

let db;

// Connect to MongoDB
MongoClient.connect(MONGO_URI)
.then(client => {
    console.log('Connected to MongoDB');
    db = client.db(DATABASE_NAME);

    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
})
.catch(err => console.error(err));

