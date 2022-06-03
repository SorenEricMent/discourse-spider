import {request} from "https";

let gUserAgent = "Discourse-Spider/0.1 WinslowSorenEricMent/114514 NodeJS/" + process.version;


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
export {cookieParser, cookieRestore, HTTPSRequest, gUserAgent};