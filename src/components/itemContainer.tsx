import * as React from "react"
import { useSelector } from "react-redux"
import styled from "styled-components"
import { RootState } from "../../redux/store"
import RenderCounter from "./renderCounter"

interface ItemContainerProps {
    itemId: string
}

const StyledItemContainer = styled.div`
    border: 1px solid lightpink;
    display: flex;
    padding: 10px;
`

const ItemContainer = React.memo( ( props: ItemContainerProps ) => {

    const item = useSelector( ( state: RootState ) => (
        state.shipmentData.items.byId.get( props.itemId )
    ) )

    return (
        <StyledItemContainer>
            {item.name}
            <div style={{ flexGrow: 1 }} />
            <RenderCounter />
        </StyledItemContainer>
    )
} )

export default ItemContainer
