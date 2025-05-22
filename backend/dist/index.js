"use strict";
/// <reference types="./types/express" />
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const data_source_1 = require("./data-source");
const auth_1 = __importDefault(require("./routes/auth"));
const software_1 = __importDefault(require("./routes/software"));
const request_1 = __importDefault(require("./routes/request"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/api/auth", auth_1.default);
app.use("/api/software", software_1.default);
app.use("/api/requests", request_1.default);
data_source_1.AppDataSource.initialize().then(() => {
    app.listen(5000, () => {
        console.log("Server started on http://localhost:5000");
    });
}).catch(err => console.error(err));
