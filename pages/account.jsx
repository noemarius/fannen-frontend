import { Layout } from '/components/Layout'
import { UserDetails } from '/components/UserDetails'
import { AlignLeft } from '/components/AlignLeft'
import { Card } from '/components/Card'
import { ContentButton } from '/components/ContentButton'
import { Text } from '/components/Text'
import { useAuth } from '/hooks/auth'

export default function Account() {
    const { login } = useAuth({
        middleware: 'auth',
        redirectIfAuthenticated: '/login',
    })
    return (
        <>
            <Layout pageTitle="Account" width="50%">
                <UserDetails
                    image="/user.png"
                    link="/settings"
                    text="Edit Profile"
                    margin="20px 0px 12px 0px"
                />
                <AlignLeft>
                    <Text text="Content" />
                </AlignLeft>
                <Card margin="12px 0px">
                    <ContentButton
                        link="/test"
                        image="/heart.png"
                        text="Favorites"
                    />
                    <ContentButton
                        link="/create-event"
                        image="/event.png"
                        text="Add an Event"
                    />
                </Card>
                <AlignLeft>
                    <Text text="Preferences"></Text>
                </AlignLeft>
                <Card margin="12px 0px">
                    <ContentButton
                        link="/test"
                        image="/language.png"
                        text="Language"
                    />
                    <ContentButton
                        link="/test"
                        image="/night-mode.png"
                        text="Dark Mode"
                    />
                </Card>
            </Layout>
        </>
    )
}

// DONE