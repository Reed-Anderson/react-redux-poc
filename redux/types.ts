/*******************************************************************************
 * Simple Data Types
 ******************************************************************************/

export interface Shipment {
    id: string,
    name: string,
    itemIds: string[]
}

export interface Item {
    id: string,
    name: string
}

/*******************************************************************************
 * Action Types
 ******************************************************************************/

export interface AddItemType {
    item: Item,
    shipment: Shipment
}