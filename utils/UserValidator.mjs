class UserValidator {
  static userSchema = {
    username: {
      notEmpty: {
        errorMessage: 'Name is required',
      },
      trim: true,
      escape: true,
    },
    email: {
      isEmail: {
        errorMessage: 'Invalid email address',
      },
      normalizeEmail: true,
      trim: true,
      escape: true,
    },
    password: {
      isLength: {
        options: { min: 6, max: 20 },
        errorMessage: 'Password must be at least 3 characters long',
      },
      trim: true,
      escape: true,
    },
  }
}

export default UserValidator
