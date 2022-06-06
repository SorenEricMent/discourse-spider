import {default as sqlite3}  from "sqlite3";
import * as fs from "fs";

function dbInitilize() {
    let db = new sqlite3.Database("../localdb.db");
}
dbInitilize();