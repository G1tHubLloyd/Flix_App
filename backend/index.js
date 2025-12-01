const express = require('express');
const cors = require('cors');
const moviesRouter = require('./routes/movies');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/movies', moviesRouter);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
