import * as React from "react"
import { useDispatch } from "react-redux"
import { shipmentActions } from "../../redux/slices/shipmentsData"
import RenderCounter from "./renderCounter"

const ShipmentAdder = React.memo( () => {
    /* State for new shipment name */
    const [ newShipmentName, setNewShipmentName ] = React.useState( "" )

    /* Dispatch to send events to the redux store */
    const dispatch = useDispatch()

    /* Event to add the new shipment name */
    const confirmShipment = React.useCallback( () => {
        dispatch( shipmentActions.addShipment( {
            id: "",
            name: newShipmentName,
            itemIds: []
        } ) )
    }, [ dispatch, newShipmentName ] )

    return (
        <>
            <h1>Below you may add a new shipment:</h1>
            <input
                onChange={e => setNewShipmentName( e.target.value )}
                value={newShipmentName}
            />
            <button onClick={confirmShipment}>Add!</button>
            <RenderCounter />
        </>
    )
} )

export default ShipmentAdder
