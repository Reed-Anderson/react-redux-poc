import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { nanoid } from 'nanoid'
import { AddItemType, Item, Shipment } from '../types'

/*******************************************************************************
 * Types
 ******************************************************************************/

/**
 * Interface for Shipments state
 */
interface ShipmentsState {
    items: {
        allIds: string[]
        byId: Map<string, Item>
    },
    shipments: {
        allIds: string[]
        byId: Map<string, Shipment>
    }
}

/*******************************************************************************
 * Reducers
 ******************************************************************************/

/**
 * Reducer to add a new shipment
 */
const addShipment = {
    prepare: ( shipment: Shipment ) => {
        const id = nanoid()
        const editedShipment = { ...shipment, id: id }
        return { payload: editedShipment }
    },
    reducer: ( state: ShipmentsState, action: PayloadAction<Shipment> ) => {
        state.shipments.allIds = [
            ...state.shipments.allIds,
            action.payload.id
        ]
        state.shipments.byId.set( action.payload.id, action.payload )
    }
}

/**
 * Reducer to delete a shipment
 */
const deleteShipment = (
    state: ShipmentsState,
    action: PayloadAction<Shipment>
) => {
    state.items.allIds = state.items.allIds.filter( id =>
        !action.payload.itemIds.includes( id )
    )
    action.payload.itemIds.forEach( itemId =>
        state.items.byId.delete( itemId )
    )
    state.shipments.allIds = state.shipments.allIds.filter( id =>
        id !== action.payload.id
    )
    state.shipments.byId.delete( action.payload.id )
}

/**
 * Reducer to update a shipment
 */
const updateShipment = (
    state: ShipmentsState,
    action: PayloadAction<Shipment>
) => {
    state.shipments.byId.set( action.payload.id, action.payload )
}

/**
 * Reducer to add an item
 */
const addItem = {
    prepare: ( data: AddItemType ) => {
        data.item.id = nanoid()
        return { payload: data }
    },
    reducer: (
        state: ShipmentsState,
        action: PayloadAction<AddItemType>
    ) => {
        /* Handle Item Data */
        state.items.allIds = [ ...state.items.allIds, action.payload.item.id ]
        state.items.byId.set( action.payload.item.id, action.payload.item )

        /* Handle Shipment Data */
        const shipment =  state.shipments.byId.get( action.payload.shipment.id )
        shipment.itemIds = [ ...shipment.itemIds, action.payload.item.id ]
    }
}

/*******************************************************************************
 * ShipmentsData Slice
 ******************************************************************************/

const shipmentSlice = createSlice({
    name: 'shipmentData',
    initialState: {
        items: {
            allIds: [],
            byId: new Map()
        },
        shipments: {
            allIds: [],
            byId: new Map()
        }
    } as ShipmentsState,
    reducers: {
        addShipment: addShipment,
        deleteShipment: deleteShipment,
        updateShipment: updateShipment,
        addItem: addItem
    }
})

export const shipmentActions = shipmentSlice.actions
export default shipmentSlice.reducer
