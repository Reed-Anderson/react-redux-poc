import * as React from "react"
import { useDispatch, useSelector } from "react-redux"
import styled from "styled-components"
import { RootState } from "../../redux/store"
import RenderCounter from "./renderCounter"
import { shipmentActions } from "../../redux/slices/shipmentsData"
import { Item, Shipment } from "../../redux/types"
import ItemContainer from "./itemContainer"

interface ShipmentContainerProps {
    shipmentId: string
}

const StyledShipmentContainer = styled.div`
    border: 1px solid lightblue;
    padding: 10px;
`

const ShipmentContainer = React.memo( ( props: ShipmentContainerProps ) => {

    /**
     * Get the relevant shipment from the store
     */
    const shipment = useSelector( ( state: RootState ) => (
        state.shipmentData.shipments.byId.get( props.shipmentId )
    ) )

    /**
     * Use dispatch to make calls to redux
     */
    const dispatch = useDispatch()

    /**
     * Dispatches an update to Shipment with a random name
     */
    const clickRandomName = () => {
        const newShipment: Shipment = {
            ...shipment,
            name: Math.random().toString()
        }
        dispatch( shipmentActions.updateShipment( newShipment ) )
    }

    /**
     * Dispatches an add of an item with a random name
     */
    const clickRandomItem = () => {
        const newItem: Item = {
            id: "",
            name: Math.random().toString()
        }

        dispatch( shipmentActions.addItem( {
            item: newItem,
            shipment: shipment
        } ) )
    }

    /**
     * Dispatches a delete of this shipment
     */
    const clickDeleteShipment = () => {
        dispatch( shipmentActions.deleteShipment( shipment ) )
    }

    return (
        <StyledShipmentContainer>
            <div style={{ display: 'flex' }}>
                <div style={{ width: 300 }}>
                    {shipment.name}
                </div>
                <button onClick={clickRandomName}>
                    Give me random name!
                </button>
                <button onClick={clickRandomItem}>
                    Give me random item!
                </button>
                <button onClick={clickDeleteShipment}>
                    Delete me!
                </button>
                <div style={{ flexGrow: 1 }} />
                <RenderCounter />
            </div>
            {shipment.itemIds.map( itemId => (
                <ItemContainer key={itemId} itemId={itemId} />
            ) )}
        </StyledShipmentContainer>
    )
} )

export default ShipmentContainer
