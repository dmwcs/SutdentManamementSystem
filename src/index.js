require('dotenv').config();
const express  = require('express');
require('express-async-errors');
const unknownError = require('./middleware/error/unknownError');
const validationError = require('./middleware/error/validationError');
const castError = require('./middleware/error/castError');

const v1Routes = require('./routes/index.js');
const connectToDB = require('./utils/db.js');

const app = express() ;

const PORT = process.env.PORT || 3000;

app.use(express.json());


connectToDB().then(() => {
    app.listen(PORT, ()  => {
        console.log(`Server is running on port ${PORT}`);
    })
});

app.get('/', (req, res) => {
   res.status(200).send('hello');
});


app.use('/v1', v1Routes);

//error handling
app.use(validationError);
app.use(castError);
app.use(unknownError);



