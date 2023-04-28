import { Request, Response, NextFunction } from 'express'
import {insertMenu, selectAllMenus, selectMenuByMenuId, selectMenusByMenuTruckId, Menu} from '../../utils/models/Menu'
import { Status } from '../../utils/interfaces/Status'
import { Owner } from '../../utils/models/Owner'
import {selectTruckByTruckId} from "../../utils/models/Truck";


export async function getAllMenus (request: Request, response: Response): Promise<Response<Status>> {
    try {
        const data = await selectAllMenus()
        const status: Status = { status: 200, message: null, data }
        return response.json(status)
    } catch (error) {
        return response.json({
            status: 500,
            message: '',
            data: []
        })
    }
}

export async function getMenusByMenuTruckId (request: Request, response: Response, nextFunction: NextFunction): Promise<Response<Status>> {
    try {
        const { menuTruckId } = request.params
        const data = await selectMenusByMenuTruckId(menuTruckId)
        return response.json({ status: 200, message: null, data })
    } catch (error) {
        return response.json({
            status: 500,
            message: '',
            data: []
        })
    }
}

export async function getMenuByMenuId (request: Request, response: Response, nextFunction: NextFunction): Promise<Response<Status>> {
    try {
        const { menuId } = request.params
        const data = await selectMenuByMenuId(menuId)
        return response.json({ status: 200, message: null, data })
    } catch (error) {
        return response.json({
            status: 500,
            message: '',
            data: null
        })
    }
}

export async function postMenu (request: Request, response: Response): Promise<Response<Status>> {
    try {

        const owner: Owner = request.session.owner as Owner
        const ownerId: string = owner.ownerId as string
        const { menuTruckId, menuName, menuPrice, menuDescription, menuImgUrl } = request.body

        const truck = await selectTruckByTruckId(menuTruckId)

        if (ownerId !== truck?.truckOwnerId) {return response.json({ status: 400, data: null, message: 'Please login to your Truck Owner profile to post a menu item.' })
        }
        const menu: Menu = { menuId: null, menuTruckId, menuName, menuPrice, menuDescription, menuImgUrl }

        const result = await insertMenu(menu)
        const status: Status = {
            status: 200,
            message: result,
            data: null
        }
        return response.json(status)
    } catch (error) {
        console.log(error)
        return response.json({
            status: 500,
            message: 'Error Creating menu try again later.',
            data: null,

        })
    }
}