"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = express_1.Router();
const contacts_1 = __importDefault(require("../models/contacts"));
// validation with @hapi/joi
const validate_1 = require("../controllers/validate");
// post contact to the database
router.post('/', async (req, res) => {
    try {
        const { error } = validate_1.validatePost(req.body);
        if (error)
            return res.status(404).json(error.details[0].message);
        const checkEmail = await contacts_1.default.findOne({ email: req.body.email });
        console.log(checkEmail);
        if (checkEmail)
            return res.json("User with this email exist");
        const contactDetails = {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            phone: req.body.phone,
            email: req.body.email,
            website: req.body.website
        };
        console.log(contactDetails);
        const contacts = new contacts_1.default(contactDetails);
        await contacts.save();
        // res.status(200).json({
        //     message: "Successfully added a contact",
        //     body: contact
        // })
        res.redirect('/');
    }
    catch (error) {
        res.status(404).json({ message: error });
    }
});
exports.default = router;
//# sourceMappingURL=postRoute.js.map