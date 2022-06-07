import { discourse as d } from "./discourse.mjs";
import { cookieParser, cookieRestore } from "./utils.mjs";

const api = {
    "login": function(host,username,password){
        return new Promise((resolve,reject)=>{
            d.login.csrf(host).then((answer) => {
                let cookie = cookieRestore(answer[1]);
                let un = encodeURIComponent(username);
                let p = encodeURIComponent(password);
                d.login.session(host,answer[0],un,p,cookie).then((result) => {
                    resolve(result);
                }
                ).catch((err) => {
                    console.log(err);
                    reject(err);
                }
                );
            });
        });
    }
}

export {api};