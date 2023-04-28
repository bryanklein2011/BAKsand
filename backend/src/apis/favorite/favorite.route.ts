import { Router } from 'express'
import { getFavoritesByFavoriteCustomerId, getFavoritesByFavoriteTruckId, toggleFavoriteController} from './favorite.controller'
import { isLoggedIn } from "../../utils/controllers/is-logged-in.controller"
import { asyncValidatorController } from '../../utils/controllers/async-validator.controller'
import {check, checkSchema} from 'express-validator'
import { favoriteValidator} from "./favorite.validator";

const router = Router()

router.route('/')
    .post(isLoggedIn('customer'), asyncValidatorController(checkSchema(favoriteValidator)), toggleFavoriteController)
router.route('/favoriteTruckId/:favoriteTruckId')
    .get(asyncValidatorController([
        check('favoriteTruckId', 'please provide a valid Truck ID').isUUID()
    ]), getFavoritesByFavoriteTruckId)

router.route('/favoriteCustomerId/:favoriteCustomerId')
    .get(asyncValidatorController([
        check('favoriteCustomerId', 'please provide a valid Customer ID').isUUID()
    ]), getFavoritesByFavoriteCustomerId)

export default router