import {request} from "https";

const gUserAgent = "Discourse-Spider/0.1 By/WinslowSorenEricMent NodeJS/" + process.version;

const gHeader = {
    "headers":{
        "accept": "*/*",
        "discourse-present": "true",
        "discourse-track-view": "true",
        "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"102\"",
        "user-agent": gUserAgent,
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"Linux\"",
        "x-requested-with": "XMLHttpRequest"
    }
};


function cookieParser(raw){
    var cookies = {
        "complex":{},
        "flag":[],
    };
    let parser = function(str){
        let keyArray = str.split(";");
        for(const element of keyArray){
        if(element.indexOf("=") === -1){
            cookies.flag.push(element);
        }else{
            let keyValue = element.split("=");
            cookies.complex[keyValue[0]] = keyValue[1];
        }
        }
    }
    if(isArray(raw)){
        for(const element of raw){
            parser(element);
        }
    }else{
        parser(raw);
    } 
    return cookies;
}

function cookieRestore(obj){
    let cookie = "";
    for(const key in obj.complex){
        cookie += key + "=" + obj.complex[key] + ";";
    }
    return cookie;
}

function isArray(obj){
    return Object.prototype.toString.call(obj) === "[object Array]";
}

function HTTPSRequest(host,body,options,callback){
    let newRequest = request(host,options,(res) => {
        let response = Buffer.alloc(0);
        res.on('data', function (chunk) {
            response = Buffer.concat([response, chunk]);
        });
        res.on('end', () => {
            response = response.toString();
            callback([response,res]);
        });
        res.on('err', () => {
            throw new Error("HTTPSRequestFailed");
        });
    });
    newRequest.write(body);
    newRequest.end();
}

function mergeJSON(origin,override){
    for(const key in override){
        if(typeof override[key] === "object"){
            if(isArray(override[key])){
                origin[key] = override[key];
            }else{
                mergeJSON(origin[key],override[key]);
            }
        }else{
            origin[key] = override[key];
        }
    }
    return origin;
}

export {cookieParser, cookieRestore, HTTPSRequest, mergeJSON, gHeader};