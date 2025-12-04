require('dotenv').config();
const http = require('http');
const app = require('./app');
const { connectDB } = require('./db/mongo');
const config = require('./config/config');

const server = http.createServer(app);

connectDB()
    .then(() => {
        server.listen(config.PORT, () => {
            console.log(`Server running on port ${config.PORT}`);
        });
    })
    .catch((err) => {
        console.error('Failed to connect to DB', err);
        process.exit(1);
    });
