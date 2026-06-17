"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const database_1 = require("./config/database");
const port = Number(process.env.PORT || 8000);
const start = async () => {
    await (0, database_1.connectDatabase)();
    app_1.default.listen(port, () => {
        console.log(`Octofit backend listening on http://localhost:${port}`);
    });
};
start().catch((error) => {
    console.error('Failed to start server:', error);
    process.exit(1);
});
