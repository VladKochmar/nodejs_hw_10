import UsersDBService from '../models/user/UsersDBService.mjs'
import TypesDBService from '../models/type/TypesDBService.mjs'
import { validationResult } from 'express-validator'

class UserController {
  static async registerForm(req, res) {
    try {
      const user = req.user || null
      res.render('register', {
        user,
        errors: [],
      })
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  }

  static async registerUser(req, res) {
    const errors = validationResult(req)
    const data = req.body

    if (!errors.isEmpty()) {
      return res.status(400).render('register', {
        errors: errors.array(),
        data,
        user: req.user,
      })
    }

    try {
      const type = await TypesDBService.findOne({ title: 'guest' })
      const dataObj = { ...req.body, type: type._id }

      await UsersDBService.create(dataObj)

      res.redirect('/cars')
    } catch (err) {
      res.status(500).render('register', {
        errors: [{ msg: err.message }],
        data,
        user: req.user,
      })
    }
  }
}

export default UserController
