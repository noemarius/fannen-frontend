import axios from '/lib/axios'
import { useEffect } from 'react'
import { useState } from 'react'
import { Container } from '../Container'
import { Text } from '../Text'
import { Title } from '../Title'

async function getLocationDetail(id) {
    let resp
    console.log(id)
    if (id.type == 'categories') {
        resp = await axios.get(`api/locations/${id.locationId}`)
    } else if (id.type == 'events') {
        resp = await axios.get(`api/events/details/${id.event_id}`)
    }
    return typeof resp !== 'undefined' ? resp.data : false
}

export default function Detail(props) {
    const [detail, setDetail] = useState({})
    const [content, setContent] = useState([])
    useEffect(() => {
        getLocationDetail(props.sharedDetailState).then(rslt => {
            setDetail(rslt)
        })
    }, [props.sharedDetailState])

    useEffect(() => {
        setContent(displayDetails(props.sharedDetailState, detail))
    }, [detail])

    const displayDetails = (id, detail) => {
        if (id.type == 'categories') {
            return (
                <>
                    <Text text={`Name: ${detail.name}`} />
                    <Text text={`Address: ${detail.address}`} />
                    <Text text={`Contact: ${detail.contact}`} />
                    <a href={detail.link} target="_blank">
                        <Text text={`Link: ${detail.link}`} />
                    </a>
                </>
            )
        } else if (id.type == 'events') {
            return (
                <>
                    <Text text={`Event Name: ${detail[0].event_name}`} />
                    <Text text={`Organizer: ${detail[0].user_name}`} />
                    <Text text={`Category: ${detail[0].categ_name}`} />
                    <Text text={`Descritption: ${detail[0].description}`} />
                    <Text text={`Address: ${detail[0].address}`} />
                    <Text text={`Contact: ${detail[0].contact}`} />
                    <Text text={`Start Date: ${detail[0].start_date}`} />
                    <Text text={`End Date: ${detail[0].end_date}`} />
                    <Text text={`Start Time: ${detail[0].event_start}`} />
                    <Text text={`End Time: ${detail[0].event_end}`} />
                    <Text
                        text={`Price: ${
                            detail[0].price != null ? detail[0].price : 'NA'
                        }`}
                    />
                </>
            )
        }
    }
    return (
        <>
            <div className="details">
                <Container gap="20px" align="left">
                    <Title title="Details:" />
                    {content}
                </Container>
            </div>
            <style jsx>{`
                .details {
                    height: 250px;
                    overflow: scroll;
                    width: 100%;
                    padding: 20px 0px 0px 0px;
                }
            `}</style>
        </>
    )
}
