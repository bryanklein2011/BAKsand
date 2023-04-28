import { sql } from '../database.utils'

export interface Menu{
    menuId: string|null,
    menuTruckId:string,
    menuName: string,
    menuPrice:string,
    menuDescription:string,
    menuImgUrl: string,
}

export async function insertMenu (menu: Menu): Promise<string> {
    const {menuTruckId, menuName, menuPrice, menuDescription, menuImgUrl} = menu
    await sql `INSERT INTO menu (menu_id, menu_truck_id, menu_name, menu_price, menu_description, menu_img_url) VALUES(gen_random_uuid(), ${menuTruckId}, ${menuName}, ${menuPrice}, ${menuDescription}, ${menuImgUrl})`
    return 'Menu created successfully'
}

export async function selectAllMenus (): Promise<Menu[]> {
    return sql <Menu[]>  `SELECT menu_id, menu_truck_id, menu_name, menu_price, menu_description, menu_img_url FROM menu ORDER BY menu_truck_id DESC`
}

export async function selectMenuByMenuId (menuId: string): Promise<Menu|null> {
    const result = <Menu[]> await sql`SELECT menu_id, menu_truck_id, menu_name, menu_price, menu_description, menu_img_url  FROM menu WHERE menu_id = ${menuId}`
    return result?.length === 1 ? result[0] : null
}

export async function selectMenusByMenuTruckId (menuTruckId: string): Promise<Menu[]> {
    return <Menu[]> await sql`SELECT menu_id, menu_truck_id, menu_name, menu_price, menu_description, menu_img_url  FROM menu WHERE menu_truck_id = ${menuTruckId}`
}