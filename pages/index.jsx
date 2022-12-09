import Image from 'next/image'
import { Layout } from '/components/Layout'
import { SearchBar } from '/components/SearchBar'
import { Logo } from '/components/Logo'
import { Container } from '/components/Container'
import { LinkButton } from '/components/LinkButton'
import { HomeLayout } from '/components/HomeLayout'

export default function Home() {
    return (
        <>
            <HomeLayout pageTitle="Home">
                <Container>
                    <Logo height="500" width="500" />  
                    <Container direction="column" gap="20px" directionTablet="row">
                    <LinkButton link="/dashboard" text="Dashboard" size="32px"/>
                    <LinkButton link="/login" text="Login" size="32px"/>
                    <LinkButton link="/register" text="Register" size="32px"/>
                    </Container>
                </Container>
            </HomeLayout>
            <style jsx>{`
                body {
                    background-image: url("/fannen.png");
                }
                `}</style>
        </>
    )
}

// DONE
