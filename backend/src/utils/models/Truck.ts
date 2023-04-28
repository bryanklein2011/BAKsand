import { sql } from '../database.utils'

export interface Truck{
    truckId: string|null,
    truckOwnerId:string,
    truckName: string
    truckCardAccepted:string,
    truckFoodType:string,
    truckLat: string|null,
    truckLng: string|null,
}

export async function insertTruck (truck: Truck): Promise<string> {
    const {truckOwnerId, truckName, truckCardAccepted, truckFoodType, truckLat, truckLng} = truck
    await sql `INSERT INTO truck (truck_id, truck_owner_id, truck_name, truck_card_accepted, truck_food_type, truck_lat, truck_lng) VALUES(gen_random_uuid(), ${truckOwnerId}, ${truckName}, ${truckCardAccepted}, ${truckFoodType}, ${truckLat}, ${truckLng})`
    return 'Truck created successfully'
}

export async function selectAllTrucks (): Promise<Truck[]> {
    return sql <Truck[]>  `SELECT truck_id, truck_owner_id, truck_name, truck_card_accepted, truck_food_type, truck_lat, truck_lng FROM truck ORDER BY truck_food_type DESC`
}

export async function selectTruckByTruckId (truckId: string): Promise<Truck|null> {
    const result = <Truck[]> await sql`SELECT truck_id, truck_owner_id, truck_name, truck_card_accepted, truck_food_type, truck_lat, truck_lng  FROM truck WHERE truck_id = ${truckId}`
    return result?.length === 1 ? result[0] : null
}

export async function selectTrucksByTruckOwnerId (truckOwnerId: string): Promise<Truck[]> {
    return <Truck[]> await sql`SELECT truck_id, truck_owner_id, truck_name, truck_card_accepted, truck_food_type, truck_lat, truck_lng  FROM truck WHERE truck_owner_id = ${truckOwnerId}`
}