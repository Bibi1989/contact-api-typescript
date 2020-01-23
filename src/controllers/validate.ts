import joi from '@hapi/joi'
import { Contact } from '../controllers/interfaces'

export const validatePost = (body: Contact) => {
    const schema = joi.object({
        firstname: joi.string().trim().required(),
        lastname: joi.string().trim().required(),
        email: joi.string().trim().email(),
        phone: joi.string().trim().min(10).required(),
        website: joi.string().trim(),
    })

    const { error } = schema.validate(body, {abortEarly: false, stripUnknown: true })
    
    return {
        error
    }
}