import styled from 'styled-components'
import Button from './Button'
import { Dropdown } from './Dropdown'
import { DropdownItem } from './DropdownItem'
import { useAuth } from '/hooks/auth'
import Link from 'next/link'
import { device } from './Device'

const HeaderWrap = styled.div`
    align-items: center;
    background-color: #39b7ff;
    display: flex;
    gap: 40px;
    justify-content: center;
    min-height: 80px;
    width: 100%;

    .hideTablet {
        display: none;
    }

    @media ${device.mobile} {
        .hidePhone {
            display: all;
        }

        .hideTablet {
            display: none;
        }
    }

    @media ${device.laptop} {
        .hidePhone {
            display: none;
        }

        .hideTablet {
            display: initial;
        }
    }
`

export function BlankHeader() {
    return (
        <>
            <HeaderWrap></HeaderWrap>
        </>
    )
}
