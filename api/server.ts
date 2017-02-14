import {log} from "./config/logger";
const app = require("./config/express")();

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
    log.info(`Express server listening on port ${port}.\nEnvironment: ${process.env.NODE_ENV}`);
});
