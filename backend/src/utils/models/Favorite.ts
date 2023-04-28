import { sql } from '../database.utils'
import {Truck} from "./Truck";

export interface Favorite {
    favoriteCustomerId: string | null
    favoriteTruckId: string | null
}

export async function insertFavorite (favorite: Favorite): Promise<string> {
    const {favoriteCustomerId, favoriteTruckId} = favorite
    await sql `INSERT INTO "favorite" (favorite_customer_id, favorite_truck_id) VALUES(${favoriteCustomerId}, ${favoriteTruckId})`
    return 'Favorite Truck Added'
}

export async function deleteFavorite (favorite: Favorite): Promise<string> {
    const {favoriteCustomerId, favoriteTruckId} = favorite
    await sql `DELETE FROM "favorite" WHERE favorite_customer_id = ${favoriteCustomerId} AND favorite_truck_id = ${favoriteTruckId}`
    return 'Removed favorite truck successfully'
}

export async function selectFavoriteByFavoriteId (favorite: Favorite): Promise<Favorite|null> {
    const {favoriteCustomerId, favoriteTruckId} = favorite
    const result = <Favorite[]> await sql`SELECT favorite_customer_id, favorite_truck_id FROM "favorite" WHERE favorite_customer_id = ${favoriteCustomerId} AND favorite_truck_id = ${favoriteTruckId}`
    return result?.length === 1 ? result[0] : null
}

export async function selectFavoritesByFavoriteTruckId (favoriteTruckId: string): Promise<Favorite[]> {
    return <Favorite[]> await sql`SELECT favorite_customer_id, favorite_truck_id FROM "favorite" WHERE favorite_truck_id = ${favoriteTruckId}`
}

export async function selectFavoritesByFavoriteCustomerId (favoriteCustomerId: string): Promise<Favorite[]> {
    return <Favorite[]> await sql`SELECT favorite_customer_id, favorite_truck_id FROM "favorite" WHERE favorite_customer_id = ${favoriteCustomerId}`
}

export async function selectAllFavorites (): Promise<Favorite[]> {
    return sql <Favorite[]>  `SELECT  favorite_customer_id, favorite_truck_id FROM favorite ORDER BY favorite_customer_id DESC`
}