import * as React from "react"
import styled from "styled-components"

/******************************************************************************
 *
 * RenderCounter
 *
 *****************************************************************************/

/**
 * Style for RenderCounter
 */
const StyledRenderCounter = styled.div`

`

/**
 * RenderCounter Component
 */
const RenderCounter = () => {
    const counter = React.useRef( 1 )
    React.useEffect( () => { counter.current++ } )

    return (
        <StyledRenderCounter>
            Rendered {counter.current} times.
        </StyledRenderCounter>
    )
}

export default RenderCounter
