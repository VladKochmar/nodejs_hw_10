import passport from 'passport'

class AuthController {
  static loginForm(req, res) {
    const user = req.user || null
    res.render('login', { messages: null, user })
  }

  static login(req, res, next) {
    passport.authenticate('local', (err, user, info) => {
      if (err) return next(err)
      if (!user) return res.status(400).json({ message: info.message })
      req.logIn(user, err => {
        if (err) return next(err)
        res.redirect('/cars')
      })
    })(req, res, next)
  }

  static logout(req, res) {
    req.logout(err => {
      if (err) {
        return next(err)
      }
      res.redirect('/')
    })
  }
}

export default AuthController
