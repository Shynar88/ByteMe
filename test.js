var http     = require("http");
var querystring = require('querystring');

const username = process.argv[2] 
const password = process.argv[3] 
const API  = process.argv[4]; // API
const ID   = process.argv[5]; // ID
const _req = process.argv[6]; // req 

let http_method = "GET";
let url = "url"
let postData = "";
let flag = false;
let _headers = "";

function makeid() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  
    for (var i = 0; i < 5; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  
    return text;
  }

switch(API) {
    case "browse?type=all":
        url = "event/browse?type=all";
        _headers = {
            "Content-Type": "application/json",
            'Authorization': 'Basic ' + new Buffer(username + ':' + password).toString('base64')
        };
        break;

    case "browse?type=attending":
        url = "event/browse?type=attending";
        _headers = {
            "Content-Type": "application/json",
            'Authorization': 'Basic ' + new Buffer(username + ':' + password).toString('base64')
        };
        break;    

    case "browse?type=created":
        url = "event/browse?type=created";
        _headers = {
            "Content-Type": "application/json",
            'Authorization': 'Basic ' + new Buffer(username + ':' + password).toString('base64')
        };
        break;

    case "add":
        http_method = "POST";
        url = "event/add";
        postData = JSON.stringify(
            {    
                "Request": "Add_event",     
                "User": {   
                    "email": "user1@gmail.com",      
                    "pw_hash": "XXA83jd3kljsdf",    
                    "ip": "143.248.143.29"  
                },        
                "Event": {      
                    "abstract": "BlaBla",       
                    "place": "Kaist",       
                    "time": "2018-11-03 03:01:00.914138+00:00",         
                    "title": "Zombies",         
                    "details": "Blabla",
                    "speaker": "Steve",   
                    "poster_image": "imageimage" 
                }       
            }
        );
        _headers = {
            "Content-Type": "application/json",
            'Content-Length': postData.length,
            'Authorization': 'Basic ' + new Buffer(username + ':' + password).toString('base64')
        };
        break;

    case "del":
        http_method = "DELETE";
        url = "event/delete/"+ID;
        _headers = {
            "Content-Type": "application/json",
            'Content-Length': postData.length,
            'Authorization': 'Basic ' + new Buffer(username + ':' + password).toString('base64')
        };
        break;

    case "mod":
        http_method = "POST";
        url = "event/modify/"+ID;
        postData = JSON.stringify(
            {
                "Request": "Modify_event",
                "User": {   
                    "email": "user1@gmail.com",      
                    "pw_hash": "XXA83jd3kljsdf",    
                    "ip": "143.248.143.29"  
                },    
                "Event": {
                    "abstract": "Superman is the best",
                    "place": "Kaist",
                    "time": "2018-11-03 03:01:00.914138+00:00",         
                    "title": "Superman",         
                    "details": "Blabla",
                    "poster_image": "imageimage",
                    "speaker": "Harlem"
                }
            }
        )
        _headers = {
            "Content-Type": "application/json",
            'Content-Length': postData.length,
            'Authorization': 'Basic ' + new Buffer(username + ':' + password).toString('base64')
        };
        break;

    case "approve":
        http_method = "POST";
        url = "event/request/approvel/"+ID;
        postData = querystring.stringify({req: _req});
        _headers = {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': Buffer.byteLength(postData),
            'Authorization': 'Basic ' + new Buffer(username + ':' + password).toString('base64')
        }
        break;

    case "register":
        http_method = "POST";
        url = "account/register"
        postData = JSON.stringify(
            {
                "User": {
                    "id": makeid(), 
                    "email": makeid()+"@kaist.ac.kr", 
                    "pw_hash": "password@"
                }
            }
        );
        _headers = {
            'Content-Type': 'application/json',
            'Content-Length': postData.length,
            'Authorization': 'Basic ' + new Buffer(username + ':' + password).toString('base64')
        }
        break;
    
    case "attend":
        http_method = "POST";
        url = "event/attend/"+ID
        _headers = {
            'Content-Type': 'application/json',
            'Content-Length': postData.length,
            'Authorization': 'Basic ' + new Buffer(username + ':' + password).toString('base64')
        }
        break;

    case "unattend":
        http_method = "POST";
        url = "event/unattend/"+ID
        _headers = {
            'Content-Type': 'application/json',
            'Content-Length': postData.length,
            'Authorization': 'Basic ' + new Buffer(username + ':' + password).toString('base64')
        }
        break;
}

var options = {
    url: "127.0.0.1",
    port: "8000",
    path: "/api/v1/"+url,
    method: http_method,
    headers: _headers,
};

if(flag) form.pipe(req);

const req = http.request(options, (res) => {
    console.log(`STATUS: ${res.statusCode}\n`);
    console.log(`HEADERS: ${JSON.stringify(res.headers)}\n`);
    // res.setEncoding('utf8');
    res.on('data', (chunk) => {
        console.log(`BODY: ${chunk}\n`);
    });
    res.on('end', () => {
        console.log('No more data in response.');
    });
});


// // write data to request body
req.write(postData);

req.on('error', (e) => {
    console.error(`problem with request: ${e.message}`);
});

req.end();