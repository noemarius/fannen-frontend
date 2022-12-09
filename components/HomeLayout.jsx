import Head from 'next/head'
import styled from 'styled-components'
import { AppWrap } from '/styles/appStyles'
import { Header } from './Header'
import { Footer } from './Footer'
import { device } from './Device'
import { BlankHeader } from './BlankHeader'

const Content = styled.div`
    width: 100%;
    height: auto;
    flex: 1;

    @media ${device.tablet} {
        width: ${props => props.widthTablet || '80%'};
    }

    @media ${device.laptop} {
        width: ${props => props.width || '60%'};
    }
`
export function HomeLayout(props) {
    return (
        <>
            <Head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link
                    rel="preconnect"
                    href="https://fonts.gstatic.com"
                    crossOrigin="true"
                />
                <link
                    href="https://fonts.googleapis.com/css2?family=Roboto:ital@0;1&display=swap"
                    rel="stylesheet"
                />
                <title>{props.pageTitle}</title>
            </Head>
            <div className="background">
                <AppWrap>
                    <BlankHeader />
                    <Content
                        width={props.width}
                        widthTablet={props.widthTablet}>
                        {props.children}
                    </Content>
                    <Footer />
                </AppWrap>
            </div>
            <style jsx>{`
                .background {
                    background: url('lux.jpeg') no-repeat center
                        center fixed;
                    background-size: cover;
                }
            `}</style>
        </>
    )
}
