import Link from 'next/link'
import styled from 'styled-components'
import { Text } from './Text'

const StyledButton = styled.div`
    align-items: center;
    background-color: #39b7ff;
    border-radius: 20px;
    border: 1px solid black;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    height: auto;
    justify-content: center;
    padding: 8px;
    margin-top: 8px;
    width: auto;

    :hover {
        transform: scale(1.05);
    }
`

export function LinkButton(props) {
    return (
        <>
            <Link href={props.link}>
                <StyledButton>
                    <Text size={props.size} text={props.text} />
                </StyledButton>
            </Link>
        </>
    )
}

// DONE
