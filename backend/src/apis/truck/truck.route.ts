import { Router } from 'express'
import { getAllTrucks, getTruckByTruckId, getTrucksByTruckOwnerId, postTruck } from './truck.controller'
import { asyncValidatorController } from '../../utils/controllers/async-validator.controller'
import { check, checkSchema } from 'express-validator'
import { isLoggedIn } from "../../utils/controllers/is-logged-in.controller"
import { truckValidator } from './truck.validator'

const router = Router()
router.route('/:truckId').get(asyncValidatorController([
    check('truckId', 'please provide a valid truckId').isUUID()
]), getTruckByTruckId)

router.route('/truckOwnerId/:truckOwnerId').get(asyncValidatorController([
    check('truckOwnerId', 'please provide a valid truckOwnerId').isUUID()
]), getTrucksByTruckOwnerId)


router.route('/')
    .get(getAllTrucks)
    .post(isLoggedIn('owner'),asyncValidatorController(checkSchema((truckValidator))) ,postTruck)

export default router