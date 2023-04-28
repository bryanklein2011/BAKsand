import { Router } from 'express'
import { getAllMenus, getMenuByMenuId, getMenusByMenuTruckId, postMenu} from './menu.controller'
import { asyncValidatorController } from '../../utils/controllers/async-validator.controller'
import { check, checkSchema } from 'express-validator'
import { isLoggedIn } from "../../utils/controllers/is-logged-in.controller"
import { menuValidator } from './menu.validator'

const router = Router()
router.route('/:menuId').get(asyncValidatorController([
    check('menuId', 'please provide a valid menuId').isUUID()
]), getMenuByMenuId)

router.route('/menuTruckId/:menuTruckId').get(asyncValidatorController([
    check('menuTruckId', 'please provide a valid menuTruckId').isUUID()
]), getMenusByMenuTruckId)


router.route('/')
    .get(getAllMenus)
    .post(isLoggedIn('owner'),asyncValidatorController(checkSchema((menuValidator))) ,postMenu)

export default router