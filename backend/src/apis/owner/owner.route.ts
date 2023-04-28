import { getOwnerByOwnerIdController, putOwnerController } from './owner.controller'
import { Router } from 'express'
import { check, checkSchema } from 'express-validator'
import { asyncValidatorController } from '../../utils/controllers/async-validator.controller'
import { isLoggedIn } from '../../utils/controllers/is-logged-in.controller'
import { ownerValidator } from './owner.validator'

export const ownerRoute: Router = Router()
ownerRoute.route('/')
  .post(putOwnerController)

ownerRoute.route('/:ownerId')
  .get(
    asyncValidatorController([
      check('ownerId', 'please provide a valid ownerId').isUUID()
    ])
    , getOwnerByOwnerIdController
  )
  .put(isLoggedIn('owner'), asyncValidatorController(checkSchema(ownerValidator)), putOwnerController)
