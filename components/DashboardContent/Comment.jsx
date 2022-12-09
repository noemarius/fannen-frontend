import axios from '/lib/axios'
import { useEffect } from 'react'
import { useState } from 'react'
import { Container } from '../Container'
import { Text } from '../Text'
import { Title } from '../Title'
import Detail from './Detail'

async function getLocationComment(props) {
    let resp
    if (props.type == 'categories') {
        resp = await axios.get(`api/comments/${props.id}`)
    } else if (props.type == 'events') {
        resp = await axios.get(`api/eventslocsandcomments/${props.id}`)
    }
    return typeof resp !== 'undefined' ? resp.data : false
}

export default function Comment(props) {
    const [type, setType] = useState('')
    const [id, setId] = useState({})
    const [comment, setComment] = useState({})

    useEffect(() => {
        setId(props.sharedCommentState.locationId)
        setType(props.sharedCommentState.type)
    }, [props.sharedCommentState, props.type])

    useEffect(() => {
        getLocationComment({ id, type }).then(rslt => setComment(rslt))
    }, [id, type])

    return (
        <>
            <div className="overflow">
                <Title title="Comments:" />
                <Container gap="20px" align="left" margin="20px 0px 0px 0px">
                    {/* TODO: Add card component */}
                    {Object.entries(comment).map(e => {
                        return (
                            <div className="flex">
                                <Text text={`${e[1].name} says:`} />
                                <Text text={`- ${e[1].comment}`} />
                            </div>
                        )
                    })}
                </Container>
            </div>
            <style jsx>{`
                .overflow {
                    height: 250px;
                    overflow: scroll;
                    width: 100%;
                    padding: 20px 0px 0px 0px;
                }
                .flex {
                    display: flex;
                    flex-direction: column;
                    gap: 4px;
                }
            `}</style>
        </>
    )
}
