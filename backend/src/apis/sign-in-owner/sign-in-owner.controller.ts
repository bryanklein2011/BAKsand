import { Request, Response } from 'express'
import 'express-session'
import { v4 as uuid } from 'uuid'
import { generateJwt, validatePassword } from '../../utils/auth.utils'
import { Owner, selectOwnerByOwnerEmail } from '../../utils/models/Owner'

export async function signInOwnerController (request: Request, response: Response): Promise<Response> {
  try {
    const { email, password } = request.body
    const owner = await selectOwnerByOwnerEmail(email)

    return (owner !== null) && await validatePassword(owner.ownerHash, password)
      ? signInSuccessful(request, response, owner)
      : signInFailed(response)
  } catch (error: any) {
    return response.json({ status: 500, data: null, message: error.message })
  }
}

function signInFailed (response: Response): Response {
  return response.json({ status: 400, message: 'Email or password is incorrect please try again.', data: null })
}

function signInSuccessful (request: Request, response: Response, owner: Owner): Response {
  const { ownerId, ownerName, ownerEmail } = owner
  const signature: string = uuid()
  const authorization: string = generateJwt({
    ownerId,
    ownerName,
    ownerEmail
  }, signature)

  request.session.owner = owner
  request.session.jwt = authorization
  request.session.signature = signature

  response.header({
    authorization
  })
  return response.json({ status: 200, message: 'Sign in successful', data: null })
}