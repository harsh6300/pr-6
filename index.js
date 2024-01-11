const express = require('express');

const app = express();
const cookiparser = require('cookie-parser');
const port = 8000;

const path = require('path');
const fs = require('fs');
const db = require('./config/db')

const cookieParser = require('cookie-parser')
app.set('view engine', 'ejs');
    

app.use('/uploads',express.static(path.join(__dirname,'uploads')));

app.use(express.static(path.join(__dirname, 'public')))



app.use(cookieParser())
app.use(express.urlencoded());
app.use('/', require('./routes/indexroutes'));



app.listen(port, (err) => {
    if (err) {
        console.log("server is not started");
        return false;

    }
    console.log(`server is started on port :- ${port}`);
})