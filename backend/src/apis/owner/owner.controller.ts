import { Request, Response } from 'express'
import { Owner, selectPartialOwnerByOwnerId, updateOwner} from '../../utils/models/Owner'
import { Status } from '../../utils/interfaces/Status'

export async function putOwnerController (request: Request, response: Response): Promise<Response> {
  try {
    const { ownerId } = request.params
    const owner = request.session.owner as Owner
    const ownerIdFromSession = owner.ownerId as string

    if (ownerId !== ownerIdFromSession) {
      return response.json({ status: 400, data: null, message: 'You are not allowed to perform this task' })
    }

    const { ownerPhone, ownerEmail, ownerName } = request.body
    const updatedValues = { ownerPhone, ownerEmail, ownerName }
    const previousOwner: Owner = await selectPartialOwnerByOwnerId(ownerId) as Owner

    const newOwner: Owner = { ...previousOwner, ...updatedValues }
    await updateOwner(newOwner)
    return response.json({ status: 200, data: null, message: 'Owner successfully updated' })
  } catch (error: any) {
    return response.json({ status: 400, data: null, message: error.message })
  }
}

export async function getOwnerByOwnerIdController (request: Request, response: Response): Promise<Response<Status>> {
  try {
    const { ownerId } = request.params
    const mySqlResult = await selectPartialOwnerByOwnerId(ownerId)
    const data = mySqlResult ?? null
    const status: Status = { status: 200, data, message: null }
    return response.json(status)
  } catch (error: any) {
    return (response.json({ status: 400, data: null, message: error.message }))
  }
}
