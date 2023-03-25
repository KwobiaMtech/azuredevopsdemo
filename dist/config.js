"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalConfig = void 0;
/* eslint-disable prettier/prettier */
const config_1 = require("@nestjs/config");
const Joi = __importStar(require("joi"));
const GlobalConfigSchema = Joi.object({
    azure: Joi.object({
        container: Joi.string().required(),
        connectionString: Joi.string().required(),
    }),
});
exports.globalConfig = (0, config_1.registerAs)("global", () => {
    const cfg = {
        azure: {
            container: process.env.AZURE_STORAGE_CONTAINER,
            connectionString: process.env.AZURE_CONTAINER_CONNECTION_STRING,
        },
    };
    // Validate
    const result = GlobalConfigSchema.validate(cfg, {
        allowUnknown: true,
        abortEarly: false,
    });
    if (result.error) {
        console.error("GlobalConfig Validation errors:");
        for (const v of result.error.details) {
            console.error(v.message);
        }
        throw new Error("Missing configuration options");
    }
    return cfg;
});
//# sourceMappingURL=config.js.map