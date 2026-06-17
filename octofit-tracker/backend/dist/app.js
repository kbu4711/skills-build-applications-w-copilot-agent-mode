"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const api_1 = require("./routes/api");
const app = (0, express_1.default)();
const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName ? `https://${codespaceName}-8000.app.github.dev` : 'http://localhost:8000';
app.use(express_1.default.json());
app.use('/api', (0, express_rate_limit_1.default)({
    windowMs: 60 * 1000,
    limit: 120,
    standardHeaders: true,
    legacyHeaders: false
}));
app.use('/api', api_1.apiRouter);
app.get('/', (_req, res) => {
    res.json({
        message: 'Octofit Tracker API',
        apiBaseUrl: `${baseUrl}/api`
    });
});
app.use((err, _req, res, _next) => {
    const message = err instanceof Error ? err.message : 'Unexpected error';
    res.status(500).json({ error: message });
});
exports.default = app;
