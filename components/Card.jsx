import styled from 'styled-components'
import { device } from './Device'

const StyledCard = styled.div`
    align-items: center;
    background-color: white;
    border-radius: 20px;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    display: flex;
    flex-direction: column;
    gap: ${props => props.gap || '16px'};
    justify-content: center;
    margin: ${props => props.margin || '20px 0px'};
    padding: 16px 20px;
    width: 100%;

    @media ${device.tablet} {
        padding: 16px 40px;
    }

    @media ${device.laptop} {
        padding: ${props => props.paddingTablet};
    }
`

export function Card(props) {
    return (
        <>
            <StyledCard
                gap={props.gap}
                margin={props.margin}
                paddingTablet={props.paddingTablet}>
                {props.children}
            </StyledCard>
        </>
    )
}

// DONE
