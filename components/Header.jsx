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

const LinkText = styled.p`
    cursor: pointer;
`

export function Header() {
    const { user, logout } = useAuth()
    if (user) {
        return (
            <>
                <HeaderWrap>
                    <div className="hideTablet">
                        <Link href="/">
                            <Button>Home</Button>
                        </Link>
                    </div>
                    <div className="hideTablet">
                        <Link className="hideTablet" href="/dashboard">
                            <Button>Dashboard</Button>
                        </Link>
                    </div>
                    <div className="hideTablet">
                        <Link className="hideTablet" href="/about">
                            <Button>About</Button>
                        </Link>
                    </div>
                    <div className="hideTablet">
                        <Link className="hideTablet" href="/team">
                            <Button>Meet The Team</Button>
                        </Link>
                    </div>
                    <div className="hideTablet">
                        <Link className="hideTablet" href="/account">
                            <Button>Account</Button>
                        </Link>
                    </div>
                    <div className="hideTablet">
                        <Button onClick={logout}>Logout</Button>
                    </div>
                    <div className="hidePhone">
                        <Dropdown>
                            <DropdownItem link="/" text="Home"></DropdownItem>
                            <DropdownItem
                                link="/dashboard"
                                text="Dashboard"></DropdownItem>
                            <DropdownItem
                                link="/about"
                                text="About"></DropdownItem>
                            <DropdownItem
                                link="/team"
                                text="Meet the Team"></DropdownItem>
                            <DropdownItem
                                link="/account"
                                text="Account"></DropdownItem>
                            <Button onClick={logout}>logout</Button>
                        </Dropdown>
                    </div>
                </HeaderWrap>
            </>
        )
    } else {
        return (
            <>
                <HeaderWrap>
                    <div className="hideTablet">
                        <Link href="/">
                            <Button>Home</Button>
                        </Link>
                    </div>
                    <div className="hideTablet">
                        <Link href="/dashboard">
                            <Button>Dashboard</Button>
                        </Link>
                    </div>
                    <div className="hideTablet">
                        <Link href="/about">
                            <Button>About</Button>
                        </Link>
                    </div>
                    <div className="hideTablet">
                        <Link href="/team">
                            <Button>Meet The Team</Button>
                        </Link>
                    </div>
                    <div className="hideTablet">
                        <Link href="/login">
                            <Button>Login</Button>
                        </Link>
                    </div>
                    <div className="hideTablet">
                        <Link href="/register">
                            <Button>Register</Button>
                        </Link>
                    </div>
                    <div className="hidePhone">
                        <Dropdown>
                            <DropdownItem link="/" text="Home"></DropdownItem>
                            <DropdownItem
                                link="/dashboard"
                                text="Dashboard"></DropdownItem>
                            <DropdownItem
                                link="/about"
                                text="About"></DropdownItem>
                            <DropdownItem
                                link="/team"
                                text="Meet the Team"></DropdownItem>
                            <DropdownItem
                                link="/login"
                                text="Login"></DropdownItem>
                            <DropdownItem
                                link="/register"
                                text="Register"></DropdownItem>
                        </Dropdown>
                    </div>
                </HeaderWrap>
            </>
        )
    }
}
