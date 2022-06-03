import {discourse} from "./resources/discourse.mjs";
import {cookieParser, cookieRestore} from "./resources/utils.mjs";


const unitTest = {
    "login":function(){
        discourse.login.csrf("https://limelight.moe").then((answer) => {
            let cookie = cookieRestore(answer[1]);
            let un = encodeURIComponent("x");
            let p = encodeURIComponent("x");
            discourse.login.session("https://limelight.moe",answer[0],un,p,cookie).then((result) => {
                console.log(result[0],result[1].headers["set-cookie"]);
                console.log(cookieParser(result[1].headers["set-cookie"]));
            }
            ).catch((err) => {
                console.log(err);
            }
            );
        });
    }
}

unitTest.login();