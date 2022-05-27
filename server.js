const express = require('express');
const cors = require('cors')
var requests = require('requests');
var httpBuildQuery = require('http-build-query');
let parseString = require('xml2js').parseString;
var fs = require('fs');
var randomWords = require('random-words');

var csv2json = require('csv2json');



const app  = express()

app.use(express.json())
app.use(cors());

app.listen("2000", (req, res)=>{
console.log("server is runing on 2000");    
})
app.use("/post",(req,res)=>{
    res.send("data recieved successfully")
})


app.get("/getTopDomains", (req, res)=>{

    const params = {
        'partnerid'     : 328637,
        'signkey'       : '0c52021c61eb296bd926b5d4807731',
        'output_method' : 'xml',
        'keyword'       : randomWords(1),
        'tld'           : 'com',
        'kwtype'        : 'C',
        'no_hyphen'     : 1,
        'no_numeral'    : 1,
        'no_idn'        : 1,
        'resultsize'    : 40,
        'language'      : 'en',
    };
    
requests(`https://api.sedo.com/api/v1/DomainSearch?${httpBuildQuery(params)}`)
.on('data', function (chunk) {
    parseString(chunk, function (err, result) {
        if(result){
            res.send(result)
        }else{
            console.log(err)
        }

    });
    
    // res.send(xmlParser.toJson(chunk))
})
.on('end', function (err) {
  if (err) return console.log('connection closed due to errors', err);

})

})
app.post("/getKeywords", (req, res)=>{
    const params = {
        'partnerid'     : 328637,
        'signkey'       : '0c52021c61eb296bd926b5d4807731',
        'output_method' : 'xml',
        'keyword'       : req.body.key,
        'tld'           : 'com',
        'kwtype'        : 'C',
        'no_hyphen'     : 1,
        'no_numeral'    : 1,
        'no_idn'        : 1,
        'resultsize'    : 40,
        'language'      : 'en',
    };
    
requests(`https://api.sedo.com/api/v1/DomainSearch?${httpBuildQuery(params)}`)
.on('data', function (chunk) {
    parseString(chunk, function (err, result) {
        if(result){
            res.send(result)
        }else{
            console.log(err)
        }

    });
    
    // res.send(xmlParser.toJson(chunk))
})
.on('end', function (err) {
  if (err) return console.log('connection closed due to errors', err);

})
})