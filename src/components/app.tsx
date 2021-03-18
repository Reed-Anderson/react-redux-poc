import * as React from "react"
import { useSelector } from "react-redux"
import styled from "styled-components"
import { RootState } from "../../redux/store"
import RenderCounter from "./renderCounter"
import ShipmentAdder from "./shipmentAdder"
import ShipmentContainer from "./shipmentContainer"

const StyledShipmentList = styled.div`
    border: 1px solid lightgray;
    padding: 10px;
`

const App = () => {
    const shipmentIds = useSelector( ( state: RootState ) => (
        state.shipmentData.shipments.allIds
    ) )

    return (
        <>
            <ShipmentAdder />
            <h1>Below is my list of shipments:</h1>
            <StyledShipmentList>
                <RenderCounter />
                {shipmentIds.map( shipId => (
                    <ShipmentContainer key={shipId} shipmentId={shipId} />
                ) )}
            </StyledShipmentList>
        </>
    )
}

export default App
