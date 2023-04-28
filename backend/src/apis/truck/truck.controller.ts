import { Request, Response, NextFunction } from 'express'
import {insertTruck, selectAllTrucks, selectTruckByTruckId, selectTrucksByTruckOwnerId, Truck} from '../../utils/models/Truck'
import { Status } from '../../utils/interfaces/Status'
import { Owner } from '../../utils/models/Owner'


export async function getAllTrucks (request: Request, response: Response): Promise<Response<Status>> {
    try {
        const data = await selectAllTrucks()
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

export async function getTrucksByTruckOwnerId (request: Request, response: Response, nextFunction: NextFunction): Promise<Response<Status>> {
    try {
        const { truckOwnerId } = request.params
        const data = await selectTrucksByTruckOwnerId(truckOwnerId)
        return response.json({ status: 200, message: null, data })
    } catch (error) {
        return response.json({
            status: 500,
            message: '',
            data: []
        })
    }
}

export async function getTruckByTruckId (request: Request, response: Response, nextFunction: NextFunction): Promise<Response<Status>> {
    try {
        const { truckId } = request.params
        const data = await selectTruckByTruckId(truckId)
        return response.json({ status: 200, message: null, data })
    } catch (error) {
        return response.json({
            status: 500,
            message: '',
            data: null
        })
    }
}

export async function postTruck (request: Request, response: Response): Promise<Response<Status>> {
    try {

        const owner: Owner = request.session.owner as Owner
        const truckOwnerId: string = owner.ownerId as string

        const { truckName, truckCardAccepted, truckFoodType } = request.body

        const truck: Truck = { truckId: null, truckOwnerId, truckName, truckCardAccepted, truckFoodType, truckLat: null, truckLng: null }
        const result = await insertTruck(truck)
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
            message: 'Error Creating truck try again later.',
            data: null,

        })
    }
}