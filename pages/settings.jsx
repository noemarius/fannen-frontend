import { AlignLeft } from '/components/AlignLeft'
import { Card } from '/components/Card'
import { Container } from '/components/Container'
import { ContentButton } from '/components/ContentButton'
import { Layout } from '/components/Layout'
import { Text } from '/components/Text'
import { Title } from '/components/Title'

export default function Settings() {
    return (
        <>
            <Layout pageTitle="Settings">
                <Container margin="16px 0px">
                    <AlignLeft>
                        <Title title="Settings" />
                        <Text
                            text="Account Information"
                            margin="8px 0px 0px 0px"
                        />
                    </AlignLeft>
                    <Card>
                        <AlignLeft>
                            <Text
                                text="Login and Security"
                                size="12px"
                                color="gray"
                            />
                        </AlignLeft>
                        <ContentButton
                            link="/editusername"
                            image="/id-card.png"
                            text="Username"
                        />
                        <ContentButton
                            link="/editemail"
                            image="/email.png"
                            text="Email"
                        />
                        <ContentButton
                            link="/editpassword"
                            image="/padlock.png"
                            text="Password"
                        />
                        <AlignLeft>
                            <Text
                                text="Data and Permissions"
                                size="12px"
                                color="gray"
                            />
                        </AlignLeft>
                        <ContentButton
                            link=""
                            image="/location.png"
                            text="Location"
                        />
                    </Card>
                </Container>
            </Layout>
        </>
    )
}

// DONE
