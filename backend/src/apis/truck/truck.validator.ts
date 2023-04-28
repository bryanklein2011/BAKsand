import { Schema } from 'express-validator'

export const truckValidator: Schema = {
    truckOwnerId: {
        isUUID: {
            errorMessage: 'Please provide a valid TruckOwnerId'
        }
    },

    truckName: {
        escape: true,
        trim: true,

        isLength: {
            errorMessage: 'Truck Name must between three and thirty two characters',
            options: {min: 3, max: 32}
        },
    },

    truckCardAccepted: {
        isBoolean: true

    },

    truckFoodType: {
        escape: true,
        trim: true,

        isLength: {
            errorMessage: 'Food Type cannot be longer than 32 characters',
            options: {min: 1, max: 32}
        },
    },
}
