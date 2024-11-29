import CarsDBService from '../models/car/CarsDBService.mjs'
import OwnerDBService from '../models/owner/OwnersDBService.mjs'
import { validationResult } from 'express-validator'
import config from '../config/default.mjs'
import fs from 'fs'
import path from 'path'

class CarController {
  static async carsList(req, res) {
    try {
      const user = req.user || null
      const dataList = await CarsDBService.getList()

      res.render('cars/carsList', { cars: dataList, user })
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  }

  static async carsDetails(req, res) {
    try {
      const user = req.user || null
      const car = await CarsDBService.getById(req.params.id)
      res.render('cars/details', { car, user })
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  }

  static async carCreationForm(req, res) {
    try {
      const user = req.user || null
      const id = req.params.id
      let car = null

      if (id) car = await CarsDBService.getById(id)
      const owners = await OwnerDBService.getList()

      res.render('cars/form', { car, owners, errors: null, user })
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  }

  static async createCar(req, res) {
    const errors = validationResult(req)
    const car = req.body
    const owners = await OwnerDBService.getList()

    if (!errors.isEmpty()) {
      if (req.params.id) car.id = req.params.id

      const formattedErrors = {}
      errors.array().forEach(error => {
        formattedErrors[error.path] = error.msg
      })

      if (!req.file) {
        formattedErrors.imgSrc = 'Car image is required'
      }

      return res.status(400).render('cars/form', {
        errors: formattedErrors,
        car,
        owners,
      })
    }

    try {
      const data = { ...req.body }
      if (req.file?.buffer) data.imgSrc = req.file.buffer.toString('base64')

      if (req.params.id) {
        await CarsDBService.update(req.params.id, data)
      } else {
        await CarsDBService.create(data)
      }

      res.redirect('/cars')
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  }

  static async deleteCar(req, res) {
    if (!req.user) {
      return res.status(403).json({ error: 'Access denied' })
    }
    try {
      await CarsDBService.deleteById(req.body.id)
      res.json({ success: true })
    } catch (err) {
      console.error(err)
      res.status(500).json({ success: false, message: 'Failed to delete user' })
    }
  }
}

export default CarController
