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
            res.render('home', { contacts: contacts });
        }
        else {
            res.render('home', { contacts: contacts });
        }
    }
    catch (error) {
        res.status(404).json({
            message: error
        });
    }
});
// get single contacts by id
router.get('/:getID', (req, res) => {
    const { getID } = req.params;
    contacts_1.default.findById(getID).then(doc => res.status(200).json(doc)).catch(() => res.status(404).json({ msg: "Id is not valid" }));
});
// update a contact
router.put('/:updateID', (req, res) => {
    try {
        const { updateID } = req.params;
        const updateContact = {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            phone: req.body.phone,
            email: req.body.email,
            website: req.body.website
        };
        contacts_1.default.findByIdAndUpdate(updateID, updateContact, { new: true }).then(doc => res.status(200).json({ message: "Contact Updated", data: doc })).catch(err => res.status(404).json(err));
    }
    catch (error) {
        res.status(404).json({
            msg: "Invalid Id"
        });
    }
});
exports.default = router;
//# sourceMappingURL=contactRoute.js.map