import { Router } from 'express'
const router = Router();

import Contacts from '../models/contacts'

// validation with @hapi/joi
// import { validatePost } from '../controllers/validate'
// interfaces

// delete a contact
router.get('/:deletedID', async (req, res) => {
    try {
        const { deletedID } = req.params
        await Contacts.findByIdAndDelete(deletedID)
        res.redirect('/api/contacts')
    } catch (error) {
        res.status(404).json({msg: error})
    }
})

export default router