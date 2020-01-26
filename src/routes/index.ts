import { Router } from 'express'
const router = Router();

import Contacts from '../models/contacts'

/* GET contacts. */
router.get('/', async (_req, res) => {
    try {
        const contacts = await Contacts.find().sort({date: -1})
        if(contacts.length === 0) {
            res.render('postContact', {contacts: contacts})
        }else {
            res.render('postContact', {contacts: contacts})
        }
    } catch (error) {
        res.status(404).json({
            message: error
        })
    }
})


export default router;
