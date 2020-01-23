"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("@hapi/joi"));
exports.validatePost = (body) => {
    const schema = joi_1.default.object({
        firstname: joi_1.default.string().trim().required(),
        lastname: joi_1.default.string().trim().required(),
        email: joi_1.default.string().trim().email(),
        phone: joi_1.default.string().trim().min(10).required(),
        website: joi_1.default.string().trim(),
    });
    const { error } = schema.validate(body, { abortEarly: false, stripUnknown: true });
    return {
        error
    };
};
//# sourceMappingURL=validate.js.map