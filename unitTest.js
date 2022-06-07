import {discourse} from "./resources/discourse.mjs";
import {api} from "./resources/api.mjs";
import {cookieParser, cookieRestore} from "./resources/utils.mjs";

//Login Test
// api.login("https://x.x","x","x").then((result) => {
//     console.log(result[0]);// Body
//     console.log(cookieParser(result[1].headers["set-cookie"]));//Cookie
// }
// ).catch((err) => {
//     console.log(err);
// }
// );
