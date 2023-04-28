import { Request, Response } from 'express';
import Mailgun from "mailgun.js";
import formData from 'form-data'
import {setActivationToken, setHash} from '../../utils/auth.utils'
import { insertOwner, Owner } from '../../utils/models/Owner'
import {Status} from "../../utils/interfaces/Status";


export async function signUpOwnerController (request: Request, response: Response): Promise<Response | undefined> {
  try {

    const mailGun = new Mailgun(formData)
    const mailGunClient = mailGun.client({username:'api', key:process.env.MAILGUN_API_KEY as string})
    const { ownerName, ownerPhone, ownerEmail, ownerPassword, ownerPasswordConfirm } = request.body
    const ownerHash = await setHash(ownerPassword)
    const ownerActivationToken = setActivationToken()
    const basePath: string = `${request.protocol}://${request.hostname}/${request.originalUrl}/activation/${ownerActivationToken}`
    const message = `<h2>Welcome to Food Truck.</h2>
    <p>Please confirm your email address before continuing </p>
    <p><a href="${basePath}">${basePath}</a></p>
`
    const mailgunMessage = {
      from: `Mailgun Sandbox <postmaster@${process.env.MAILGUN_DOMAIN as string}>`,
      to: ownerEmail,
      subject: 'One step closer to Sticky Head -- Account Activation',
      html: message
    }

    const owner: Owner = { ownerId: null, ownerName, ownerPhone, ownerEmail, ownerHash, ownerActivationToken }

    await insertOwner(owner)
    await mailGunClient.messages.create(process.env.MAILGUN_DOMAIN as string, mailgunMessage)

    const status: Status = {
      status: 200,
      message: 'Account successfully created please check your email.',
      data: null
    }

    return response.json(status)
  } catch (error: any) {
      if (error.message === "Forbidden") {
          const status: Status = {
              status: 200,
              message: 'Account successfully created.',
              data: null
          }

          return response.json(status)
      }
    const status: Status = {
      status: 500,
      message: error.message,
      data: null
    }

    return response.json(status)
  }
}