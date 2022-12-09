import styled from 'styled-components'
import { Text } from './Text'

const StyledAlign = styled.div`
    align-items: left;
    display: flex;
    flex-direction: column;
    width: 100%;
    // padding-left: 12px;
`

export function AlignLeft({ children }) {
    return (
        <>
            <StyledAlign>{children}</StyledAlign>
        </>
    )
}

// DONE