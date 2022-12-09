import styled from 'styled-components'
import { device } from './Device'

const StyledContainer = styled.div`
    align-items: ${props => props.align || 'center'};
    background-color: ${props => props.color || ''};
    display: flex;
    flex-direction: ${props => props.direction || 'column'};
    gap: ${props => props.gap || ''};
    justify-content: ${props => props.justify || 'center'};
    margin: ${props => props.margin || '0px 0px'};
    padding: ${props => props.padding || ''};
    width: 100%;

    @media ${device.tablet} {
        flex-direction: ${props => props.directionTablet};
    }
`

export function Container(props) {
    return (
        <StyledContainer
            align={props.align}
            color={props.color}
            direction={props.direction}
            directionTablet={props.directionTablet}
            gap={props.gap}
            margin={props.margin}
            padding={props.padding}
            justify={props.justify}>
            {props.children}
        </StyledContainer>
    )
}

// DONE
