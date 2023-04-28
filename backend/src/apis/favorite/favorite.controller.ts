import { NextFunction, Request, Response } from 'express'
import { Status } from '../../utils/interfaces/Status'
import { Customer } from '../../utils/models/Customer'
import {deleteFavorite, insertFavorite, Favorite, selectFavoriteByFavoriteId, selectFavoritesByFavoriteTruckId, selectFavoritesByFavoriteCustomerId} from '../../utils/models/Favorite'

export async function getFavoritesByFavoriteTruckId (request: Request, response: Response, nextFunction: NextFunction): Promise<Response<Status>> {
    try {
        const { favoriteTruckId } = request.params
        const data = await selectFavoritesByFavoriteTruckId(favoriteTruckId)
        return response.json({ status: 200, message: null, data })
    } catch (error) {
        return response.json({
            status: 500,
            message: '',
            data: []
        })
    }
}

export async function getFavoritesByFavoriteCustomerId (request: Request, response: Response, nextFunction: NextFunction): Promise<Response<Status>> {
    try {
        const { favoriteCustomerId } = request.params
        const data = await selectFavoritesByFavoriteCustomerId(favoriteCustomerId)
        return response.json({ status: 200, message: null, data })
    } catch (error) {
        return response.json({
            status: 500,
            message: '',
            data: []
        })
    }
}

export async function toggleFavoriteController (request: Request, response: Response): Promise<Response<string>> {
    try {

        const { favoriteTruckId } = request.body
        const customer = request.session.customer as Customer
        const favoriteCustomerId = customer.customerId as string
        const favorite: Favorite = {favoriteCustomerId, favoriteTruckId,}

        const status: Status = {
            status: 200,
            message: '',
            data: null

        }

        const selectedFavorite: Favorite|null = await selectFavoriteByFavoriteId(favorite)
        if (selectedFavorite === null) {
            status.message = await insertFavorite(favorite)
        } else {
            status.message = await deleteFavorite(favorite)
        }

        return response.json(status)
    } catch (error: any) {
        return (response.json({ status: 500, data: null, message: error.message }))
    }
}
