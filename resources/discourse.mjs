import https from 'https';
import {cookieParser, cookieRestore, HTTPSRequest, gHeader, mergeJSON} from './utils.mjs';

//Discourse APIs
const discourse = {
   "login":{
    "csrf": function(host){
        return new Promise((resolve,reject)=>{
            let requestData = {
                "headers": {
                    "x-csrf-token": "undefined",
                  },
                  "referrer": host + "/login",
                  "referrerPolicy": "strict-origin-when-cross-origin",
                  "body": null,
                  "method": "GET",
                  "mode": "cors",
                  "credentials": "omit"
            };
            requestData = mergeJSON(requestData,gHeader);
            https.get(host + "/session/csrf", requestData, (res) => {
                let response = Buffer.alloc(0);
                res.on('data', function (chunk) {
                    response = Buffer.concat([response, chunk]);
                });
                res.on('end', () => {
                    response = response.toString();
                    let data = JSON.parse(response);
                    if(data.hasOwnProperty("csrf")){
                        resolve([data.csrf,cookieParser(res.headers["set-cookie"])]);
                    }else{
                        reject("Failed to request CSRF Token, login failed.");
                    }
                });
            });
        });
    },
    "session": function(host,csrf,username,password,cookie){
        return new Promise((resolve,reject)=>{
            let requestData = {
                "headers": {
                    "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                    "sec-fetch-dest": "empty",
                    "sec-fetch-mode": "cors",
                    "sec-fetch-site": "same-origin",
                    "x-csrf-token": csrf,
                    "cookie": cookie,
                    "Referer": host + "/login",
                    "Referrer-Policy": "strict-origin-when-cross-origin"
                },
                "method": "POST"
            };
            requestData = mergeJSON(requestData,gHeader);
            let body = "login=" + username + "&password=" + password + "&second_factor_method=1&timezone=Asia%2FShanghai";
            try{
                HTTPSRequest(host + "/session",body, requestData, (res) => {
                    resolve(res);
                });
            }catch(e){
                reject(e);
            }
        });
    }
   },
   "manifest":{
       "self": function(host,cookie){
           return new Promise((resolve,reject)=>{
               let requestData = {
                   "headers": {
                       "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                       "sec-fetch-dest": "empty",
                       "sec-fetch-mode": "cors",
                       "sec-fetch-site": "same-origin",
                       "cookie": cookie,
                       "Referer": host + "/login",
                       "Referrer-Policy": "strict-origin-when-cross-origin"
                   }
               };
               requestData = mergeJSON(requestData,gHeader);
               https.get(host + "/session/current.json", requestData, (res) => {
                   let response = Buffer.alloc(0);
                   res.on('data', function (chunk) {
                       response = Buffer.concat([response, chunk]);
                   });
                   res.on('end', () => {
                       response = response.toString();
                       let data = JSON.parse(response);
                       if(data.hasOwnProperty("current")){
                           resolve(data.current);
                       }else{
                           reject("Failed to request current manifest, cookie expired?");
                       }
                   });
               });
           });
       }
   },
   "user":{

   }
}

export {discourse};