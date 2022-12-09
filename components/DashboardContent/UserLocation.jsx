import axios from '/lib/axios'
import { useEffect, useState } from 'react'

async function getCities() {
    const resp = await axios.get('api/cities')
    return resp.data
}

export default function UserLocation(props) {
    const [cityList, setCityList] = useState([])
    const [categId, setCategId] = useState([])

    useEffect(() => {
        getCities().then(rslt => setCityList(Object.entries(rslt)))
    }, [])

    useEffect(() => {
        props.setSharedCityIdState(categId)
    }, [categId])

    return (
        <>
            <select
            className='userLoc'
                onChange={e => {
                    setCategId(e.target.value)
                }}>
                <option value={0}>Select a City</option>
                {cityList.map(city => {
                    return <option value={city[1].id}>{city[1].name}</option>
                })}
            </select>
            <style jsx>{`
                .userLoc {
                    cursor: pointer;
                }
                `}</style>
        </>
    )
}
