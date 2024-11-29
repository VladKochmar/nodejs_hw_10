import { Router } from 'express'
import UserValidator from '../utils/UserValidator.mjs'
import UserController from '../controllers/user.mjs'
import { checkSchema } from 'express-validator'

const router = Router()

router.get('/register', UserController.registerForm)

router.post('/register', checkSchema(UserValidator.userSchema), UserController.registerUser)

export default router
