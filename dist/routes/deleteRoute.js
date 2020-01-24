"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = express_1.Router();
const contacts_1 = __importDefault(require("../models/contacts"));
// validation with @hapi/joi
// import { validatePost } from '../controllers/validate'
// interfaces
// delete a contact
router.get('/:deletedID', async (req, res) => {
    try {
        const { deletedID } = req.params;
        await contacts_1.default.findByIdAndDelete(deletedID);
        res.redirect('/api/contacts');
    }
    catch (error) {
        res.status(404).json({ msg: error });
    }
});
exports.default = router;
//# sourceMappingURL=deleteRoute.js.map