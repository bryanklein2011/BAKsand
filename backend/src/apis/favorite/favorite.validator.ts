import { Schema } from 'express-validator'

export const favoriteValidator: Schema = {
    favoriteTruckId: {
        isUUID: {
            errorMessage: 'please provide a valid favoriteTruckId'
        }
    },

    favoriteCustomerId: {
        isUUID: {
            errorMessage: 'please provide a valid favoriteCustomerId'
        }
    }
}