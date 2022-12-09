import styled from 'styled-components'

const StyledTitle = styled.h1`
    font-size: ${props => props.size || '32px'};
`

export function Title(props) {
    return (
        <>
            <StyledTitle size={props.size}>{props.title}</StyledTitle>
        </>
    )
}

// DONE
