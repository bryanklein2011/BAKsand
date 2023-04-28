import { sql } from '../database.utils'

export interface Owner {
  ownerId: string|null,
  ownerName: string,
  ownerPhone: string,
  ownerEmail: string,
  ownerHash: string,
  ownerActivationToken: string|null
  
}

export interface PartialOwner {
  ownerId: string|null,
  ownerName: string,
  ownerPhone: string,
  ownerEmail: string,
}


export async function insertOwner (owner: Owner): Promise<string> {
  const { ownerName, ownerPhone, ownerEmail, ownerHash,ownerActivationToken } = owner
   await sql`INSERT INTO owner (owner_id, owner_name, owner_phone, owner_email, owner_hash, owner_activation_token) VALUES(gen_random_uuid(), ${ownerName}, ${ownerPhone}, ${ownerEmail}, ${ownerHash}, ${ownerActivationToken})`
  return 'Owner successfully created'
}

export async function updateOwner (owner: PartialOwner): Promise<string> {
  const { ownerName, ownerPhone, ownerEmail, ownerId } = owner
  await sql`UPDATE owner SET owner_name = ${ownerName}, owner_email = ${ownerEmail}, owner_phone = ${ownerPhone} WHERE owner_id = ${ownerId}`
  return 'Owner updated successfully'
}

export async function selectPartialOwnerByOwnerId (ownerId: string): Promise<PartialOwner|null> {
  const result = await sql<Owner[]>`SELECT owner_id, owner_phone, owner_email, owner_name from owner WHERE owner_id = ${ownerId}`
  return result?.length === 1 ? result[0] : null
}


export async function selectOwnerByOwnerEmail (ownerEmail: string): Promise<Owner|null> {
  const result = await sql <Owner[]>`SELECT owner_id, owner_phone, owner_email, owner_hash, owner_name from owner WHERE owner_email = ${ownerEmail}`
  return result?.length === 1 ? result[0] : null
}

export async function selectOwnerByOwnerActivationToken (ownerActivationToken: string): Promise<Owner|null> {
  const result = await sql<Owner[]>`SELECT owner_id, owner_phone, owner_email, owner_name from owner WHERE owner_activation_token = ${ownerActivationToken}`
  return result?.length === 1 ? result[0] : null
}
