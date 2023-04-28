import { NextFunction, Request, Response } from 'express'
import { Owner, selectOwnerByOwnerActivationToken, updateOwner } from '../../utils/models/Owner'
import { Status } from '../../utils/interfaces/Status'

export async function activationOwnerController (request: Request, response: Response, nextFunction: NextFunction): Promise<Response<Status>> {
    try {
        const { activation } = request.params
        const owner = await selectOwnerByOwnerActivationToken(activation)

        const activationFailed = (): Response => response.json({
            status: 400,
            data: null,
            message: 'Account activation has failed. Have you already activated this account'
        })

        const activationSucceeded = async (owner: Owner): Promise<Response> => {
            const updatedOwner = { ...owner, ownerActivationToken: null }
            await updateOwner(updatedOwner)
            return response.json({
                status: 200,
                data: null,
                message: 'Account activation was successful'
            })
        }

        return (owner != null) ? await activationSucceeded(owner) : activationFailed()
    } catch (error: any) {
        return response.json({ status: 500, data: null, message: error.message })
    }
}