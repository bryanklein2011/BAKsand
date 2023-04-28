import { Schema } from 'express-validator'

export const ownerValidator: Schema = {
  ownerPhone: {
    escape: true,
    trim: true,
    optional: {
      options: {
        nullable: true
      }
    },
    isLength: {
      errorMessage: 'Owner phone must be between one and thirty two characters',
      options: { min: 1, max: 32 }
    }
  },
  ownerEmail: {
    isEmail: {
      errorMessage: 'Please provide a valid email'
    },
    // Uncomment the next line to sanitize email, but it removes +1 from testing email addresses.
    normalizeEmail: true,
    trim: true
  },
  ownerName: {
    escape: true,
    trim: true,
    isLength: {
      errorMessage: 'Owner name must be between one and thirty two characters',
      options: { min: 1, max: 64 }
    }
  }
}
