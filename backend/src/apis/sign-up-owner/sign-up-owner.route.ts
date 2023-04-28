import { Router } from 'express'
import { signUpOwnerController } from './sign-up-owner.controller'
import { asyncValidatorController } from '../../utils/controllers/async-validator.controller'
import {checkSchema, param} from 'express-validator'
import { signUpOwnerValidator } from './sign-up-owner.validator'
import { activationOwnerController } from './activation-owner.controller'

export const signUpOwnerRoute = Router()

signUpOwnerRoute.route('/').post(asyncValidatorController(checkSchema(signUpOwnerValidator)), signUpOwnerController)

signUpOwnerRoute.route('/activation/:activation')
    .get(
        asyncValidatorController([param('activation', 'invalid activation link').isHexadecimal().notEmpty()]),
        activationOwnerController
    )