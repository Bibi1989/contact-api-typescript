import { Router } from 'express'
const router = Router();

import Contacts from '../models/contacts'

// validation with @hapi/joi
// import { validatePost } from '../controllers/validate'
// interfaces
import { Contact } from '../controllers/interfaces'

/* GET contacts. */
router.get('/', async (_req, res) => {
    try {
        const contacts = await Contacts.find().sort({date: -1})
        if(contacts.length === 0) {
            res.render('home', {contacts: contacts})
        }else {
            res.render('home', {contacts: contacts})
        }
    } catch (error) {
        res.status(404).json({
            message: error
        })
    }
})

// get single contacts by id
router.get('/:getID', (req, res) => {
    const { getID } = req.params
    Contacts.findById(getID).then(doc => res.status(200).json(doc)).catch(() => res.status(404).json({msg: "Id is not valid"}))
})

// update a contact
router.put('/:updateID', (req, res) => {
    try {
        const { updateID } = req.params
        const updateContact: Contact = {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            phone: req.body.phone,
            email: req.body.email,
            website: req.body.website
        }
        Contacts.findByIdAndUpdate(updateID, updateContact, { new: true }).then(doc => res.status(200).json({ message: "Contact Updated", data: doc })).catch(err => res.status(404).json({msg: err}))
    } catch (error) {
        res.status(404).json({
            msg: "Invalid Id"
        })
    }
})


export default router;
