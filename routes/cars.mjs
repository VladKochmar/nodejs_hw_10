import { Router } from 'express'
import CarController from '../controllers/car.mjs'
import UploadManager from '../utils/UploadManager.mjs'
import upload from '../middleware/upload.mjs'
import CarValidator from '../utils/CarValidator.mjs'
import { checkSchema } from 'express-validator'
import { ensureAdmin, ensureAuthenticated } from '../middleware/auth.mjs'

const router = Router()

router.get('/', CarController.carsList)

router.get('/create/:id?', ensureAuthenticated, ensureAdmin, CarController.carCreationForm)

router.post('/create/:id?', ensureAuthenticated, ensureAdmin, upload.single('imgSrc'), checkSchema(CarValidator.carSchema), CarController.createCar)

router.get('/:id', CarController.carsDetails)

router.delete('/', ensureAuthenticated, ensureAdmin, CarController.deleteCar)

export default router
