const log = require("./logger").log;
const mongoose = require("mongoose");
mongoose.Promise = require("bluebird");
let dbName;

switch (process.env.NODE_ENV) {
    case "test":
        dbName = "todo_test";
        break;
    case "production":
        dbName = "todo";
        break;
    default:
        dbName = "todo_dev";
}

mongoose.connect(`mongodb://${process.env.DB_IP}:27017/${dbName}`);

mongoose.connection.on("error", (err) => {
    if (err.message.indexOf("ECONNREFUSED") !== -1) {
        log.error("Error: The server was not able to reach MongoDB.\nMaybe it's not running?");
        process.exit(1);
    } else {
        throw err;
    }
});
