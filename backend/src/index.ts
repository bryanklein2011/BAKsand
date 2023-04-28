import { App } from './App'
import { Owner } from './utils/models/Owner'
import {Customer} from "./utils/models/Customer";

declare module 'express-session' {
  export interface SessionData {
    owner: Owner|undefined
    signature: string|undefined
    jwt: string|undefined

  }
}

declare module 'express-session' {
  export interface SessionData {
    customer: Customer|undefined
    signature: string|undefined
    jwt: string|undefined

  }
}


// instantiate new app and pass it a port as an argument to start with (4200)
async function main (): Promise<void> {
  try {
    const app = new App(4200)
    await app.listen()
  } catch (e) {
    console.log(e)
  }
}

main().catch(error => { console.error(error) })