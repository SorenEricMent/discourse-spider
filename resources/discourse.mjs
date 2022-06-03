import https from 'https';
import {cookieParser, cookieRestore, HTTPSRequest, gUserAgent} from './utils.mjs';
/*fetch("https://limelight.moe/session/csrf", {
    "headers": {
        "accept": "application/json, text/javascript, \*\/*; q=0.01",
        "discourse-present": "true",
        "discourse-track-view": "true",
        "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"102\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"Linux\"",
        "x-csrf-token": "undefined",
        "x-requested-with": "XMLHttpRequest"
      },
      "referrer": "https://limelight.moe/login",
      "referrerPolicy": "strict-origin-when-cross-origin",
      "body": null,
      "method": "GET",
      "mode": "cors",
      "credentials": "omit"
    });
    //return {"csrf":"mpy1w8GV7oEWssWybsMXJlZ4/FouNVIVKbwkxy1hWTgRbLb1ZAzCRMFqgg/vOZw6EmRfs1HbRp4MiM409Ks7Zw=="}

    fetch("https://limelight.moe/session", {
  "headers": {
    "accept": "\*\/*",
    "accept-language": "zh-CN,zh;q=0.9,en;q=0.8",
    "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
    "discourse-present": "true",
    "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"102\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Linux\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "x-csrf-token": "mpy1w8GV7oEWssWybsMXJlZ4/FouNVIVKbwkxy1hWTgRbLb1ZAzCRMFqgg/vOZw6EmRfs1HbRp4MiM409Ks7Zw==",
    "x-requested-with": "XMLHttpRequest"
  },
  "referrer": "https://limelight.moe/login",
  "referrerPolicy": "strict-origin-when-cross-origin",
  "body": "login=winslow&password=LIMELIGHThyc233_&second_factor_method=1&timezone=Asia%2FShanghai",
  "method": "POST",
  "mode": "cors",
  "credentials": "include"
});



*/

//Discourse APIs
const discourse = {
   "login":{
    "csrf": function(host){
        return new Promise((resolve,reject)=>{
            let requestData = {
                "headers": {
                    "accept": "application/json, text/javascript, \*\/*; q=0.01",
                    "discourse-present": "true",
                    "discourse-track-view": "true",
                    "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"102\"",
                    "user-agent": gUserAgent,
                    "sec-ch-ua-mobile": "?0",
                    "sec-ch-ua-platform": "\"Linux\"",
                    "x-csrf-token": "undefined",
                    "x-requested-with": "XMLHttpRequest"
                  },
                  "referrer": "https://limelight.moe/login",
                  "referrerPolicy": "strict-origin-when-cross-origin",
                  "body": null,
                  "method": "GET",
                  "mode": "cors",
                  "credentials": "omit"
            };
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
                    "accept": "*/*",
                    "accept-language": "zh-CN,zh;q=0.9,en;q=0.8",
                    "user-agent": gUserAgent,
                    "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                    "discourse-present": "true",
                    "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"102\"",
                    "sec-ch-ua-mobile": "?0",
                    "sec-ch-ua-platform": "\"Linux\"",
                    "sec-fetch-dest": "empty",
                    "sec-fetch-mode": "cors",
                    "sec-fetch-site": "same-origin",
                    "x-csrf-token": csrf,
                    "cookie": cookie,
                    "x-requested-with": "XMLHttpRequest",
                    "Referer": host + "/login",
                    "Referrer-Policy": "strict-origin-when-cross-origin"
                },
                "method": "POST"
            };
            let body = "login=" + username + "&password=" + password + "&second_factor_method=1&timezone=Asia%2FShanghai";
            HTTPSRequest(host + "/session",body, requestData, (res) => {
                resolve(res);
            });
        });
    }
   }
}

export {discourse};


/*fetch("https://limelight.moe/manifest.webmanifest", {
  "headers": {
    "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"102\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Linux\""
  },
  "referrer": "https://limelight.moe/",
  "referrerPolicy": "strict-origin-when-cross-origin",
  "body": null,
  "method": "GET",
  "mode": "cors",
  "credentials": "omit"
}); */