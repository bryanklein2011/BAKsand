import { Router } from 'express'

import { signInOwnerValidator } from './sign-in-owner.validator'
import { signInOwnerController } from './sign-in-owner.controller'
import { checkSchema } from 'express-validator'
import { asyncValidatorController } from '../../utils/controllers/async-validator.controller'

export const signInOwnerRoute: Router = Router()

signInOwnerRoute.route('/')
  .post(asyncValidatorController(checkSchema(signInOwnerValidator)), signInOwnerController)
