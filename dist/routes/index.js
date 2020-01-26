"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = express_1.Router();
const contacts_1 = __importDefault(require("../models/contacts"));
/* GET contacts. */
router.get('/', async (_req, res) => {
    try {
        const contacts = await contacts_1.default.find().sort({ date: -1 });
        if (contacts.length === 0) {
            res.render('postContact', { contacts: contacts });
        }
        else {
            res.render('postContact', { contacts: contacts });
        }
    }
    catch (error) {
        res.status(404).json({
            message: error
        });
    }
});
exports.default = router;
//# sourceMappingURL=index.js.map