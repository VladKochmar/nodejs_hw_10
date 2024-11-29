import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import bcrypt from 'bcryptjs'
import UsersDBService from '../models/user/UsersDBService.mjs'

passport.use(
  new LocalStrategy({ usernameField: 'email', passwordField: 'password' }, async (email, password, done) => {
    try {
      const user = await UsersDBService.findOne({ email }, {}, ['type'])

      if (!user) return done(null, false, { message: 'Incorrect email or password' })

      const isMatch = await bcrypt.compare(password, user.password)

      if (!isMatch) return done(null, false, { message: 'Incorrect email or password' })

      return done(null, user)
    } catch (err) {
      return done(err)
    }
  })
)

passport.serializeUser((user, done) => {
  done(null, user._id)
})

passport.deserializeUser(async (id, done) => {
  try {
    const user = await UsersDBService.findOne({ _id: id }, {}, ['type'])
    done(null, user)
  } catch (err) {
    done(err)
  }
})

export default passport
