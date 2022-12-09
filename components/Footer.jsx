import Link from 'next/link'
import styled from 'styled-components'
import { Container } from './Container'
import { Text } from './Text'

const StyledText = styled.p`
    color: white;
    font-size: 12px;
    margin: 1.5px 0px;
`

const Line = styled.div`
    background-color: white;
    height: 1px;
    width: 90%;
`

export function Footer() {
    return (
        <>
            <Container color="#39B7FF">
                <Container gap="4px" margin="8px">
                    <Link href="/about">
                        <StyledText>About</StyledText>
                    </Link>
                    <Link href="/team">
                        <StyledText>Meet The Team</StyledText>
                    </Link>
                    <Link href="/terms">
                        <StyledText>Terms and Conditions</StyledText>
                    </Link>
                </Container>
                <Line />
                <Text
                    color="white"
                    size="12px"
                    margin="12px 0px"
                    text="                        © Copyright 2022 - Developed by Fannen. All right
                        reserved."
                />
            </Container>
        </>
    )
}
