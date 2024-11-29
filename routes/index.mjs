import { Router } from 'express'
import carsRouter from './cars.mjs'
import authRouter from './auth.mjs'
import usersRouter from './users.mjs'
import mainRouter from './main.mjs'

const routes = Router()

routes.use('/', mainRouter)
routes.use('/auth', authRouter)
routes.use('/cars', carsRouter)
routes.use('/users', usersRouter)

export default routes
