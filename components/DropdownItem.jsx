import Link from 'next/link'
import styled from 'styled-components'
import { Container } from './Container'

const DropdownItemWrap = styled.div`
    width: 100%;

    li {
        align-items: center;
        border-radius: 20px;
        color: black;
        display: flex;
        font-size: 24px;
        justify-content: center;
        line-height: 24px;
        width: 100%;
    }
    li:hover {
        background-color: rgb(211, 211, 211);
    }
`

export function DropdownItem(props) {
    return (
        <>
            <DropdownItemWrap>
                <Link href={props.link}>
                    <li>{props.text}</li>
                </Link>
            </DropdownItemWrap>
        </>
    )
}

// DONE