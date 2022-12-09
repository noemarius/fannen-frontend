import Image from 'next/image'
import styled from 'styled-components'
import { device } from './Device'
import { Text } from './Text'
import { Title } from './Title'

const MemberContainer = styled.div`
    align-items: center;
    display: flex;
    flex-direction: ${props => props.direction || 'column-reverse'};
    gap: 20px;
    justify-content: center;
    margin: 40px 0px 0px 0px;

    @media ${device.tablet} {
        flex-direction: ${props => props.directionTablet || 'row'};
    }
`

const TextContainer = styled.div`
    align-items: center;
    display: flex;
    flex-direction: column;
    flex: 3;
    gap: 12px;
`

export function Member(props) {
    return (
        <>
            <MemberContainer direction={props.direction} directionTablet={props.directionTablet}>
                <TextContainer>
                    <Title title={props.title} size={props.size} />
                    <Text text={props.text} width="100%" />
                </TextContainer>
                <Image
                    src={props.image}
                    height={props.height}
                    width={props.width}
                />
            </MemberContainer>
        </>
    )
}

// DONE
