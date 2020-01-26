import { Router } from 'express'
const router = Router();

import Contacts from '../models/contacts'

// validation with @hapi/joi
import { validatePost } from '../controllers/validate'
// interfaces
import { Contact } from '../controllers/interfaces'

// post contact to the database
router.post('/', async (req: any, res: any) => {
    try {
    const { error } = validatePost(req.body)
    if(error) return res.status(404).json(error.details[0].message)

    const checkEmail = await Contacts.findOne({email: req.body.email})
    console.log(checkEmail);    
    if(checkEmail) return res.json("User with this email exist")

    const contactDetails: Contact = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        phone: req.body.phone,
        email: req.body.email,
        website: req.body.website
    }

    console.log(contactDetails)
    
    const contacts = new Contacts(contactDetails)
    await contacts.save()
    // res.status(200).json({
    //     message: "Successfully added a contact",
    //     body: contact
    // })
    res.redirect('/')
    } catch (error) {
        res.status(404).json({message: error})
    }
})

export default router