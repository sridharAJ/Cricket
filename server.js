/**
 * Created by 12072 on 03/03/17.
 */
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const app = express();
var cricapi = require("node-cricapi");
const request = require('request');
const ApiKey = '5VCRdEHge2OV969Dr52alXGacy02';
// Setup logger
app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'));
app.use(express.static('build'));
app.use('/matches', function(req, res) {
    cricapi.cricketMatches(function(databundle){
        let matches;
        try {
            matches = JSON.parse(databundle);
        }catch(e) {
            matches = {};
        }
        res.json(matches);
    });
});

app.use('/score/:id', function(req, res) {
    request.get(`http://cricapi.com/api/fantasySummary/?unique_id=${req.params.id}&apikey=${ApiKey}`).pipe(res);
});

app.use('*', function(req, res, next) {
   res.sendFile(`${__dirname}/build/index.html`);
});

const PORT = process.env.PORT || 9000;

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`);
});