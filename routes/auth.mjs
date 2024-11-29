import { Router } from 'express'
import AuthController from '../controllers/auth.mjs'

const router = Router()

router.get('/login', AuthController.loginForm)

router.post('/login', AuthController.login)

router.get('/logout', AuthController.logout)

export default router
