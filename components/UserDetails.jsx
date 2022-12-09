import Image from 'next/image'

import { Card } from './Card'
import { Title } from './Title'
import { Text } from './Text'
import { LinkButton } from './LinkButton'
import { useAuth } from '/hooks/auth'

export function UserDetails(props) {
    const { user } = useAuth()

    return (
        <>
            <Card margin={props.margin}>
                <Image src={props.image} height={80} width={80} />
                <Title title={user?.name} size={props.userSize}></Title>
                <Text text={user?.email} size={props.emailSize}></Text>
                <LinkButton
                    link={props.link}
                    text={props.text}
                    size={props.size}
                />
            </Card>
        </>
    )
}

// DONE
