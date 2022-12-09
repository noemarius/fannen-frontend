import * as React from 'react'
import axios from '/lib/axios'
import { useState, useEffect } from 'react'
import TreeView from '@mui/lab/TreeView'
import TreeItem from '@mui/lab/TreeItem'
/* import { Construction } from '@mui/icons-material' */
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import { useCallback } from 'react'

async function getCategoriesAndLocations(cityId) {
    let resp
    if (cityId == 0) {
        resp = await axios.get('api/locsandevents')
    } else {
        resp = await axios.get(`api/locsandevents/city/${cityId}`)
    }

    return resp
}

export default function Event(props) {
    const [categAndLoc, setCategAndLoc] = useState([])

    useEffect(() => {
        getCategoriesAndLocations(props.sharedCityIdState).then(result => {
            result = result.data
            setCategAndLoc(result)
        })
    }, [props.sharedCityIdState])

    const buildGeoLocCateg = useCallback((props, data, id) => {
        let newJson = data[id][1].map(e => {
            return { position: JSON.parse(e.geo), label: e.name }
        })
        props.setSharedMarkersState(newJson)
    }, [])

    const buildGeoLocCenter = useCallback((props, data) => {
        props.setSharedCenterState(JSON.parse(data))
    }, [])

    const buildIdDetail = useCallback((props, locationId, event_id, categ) => {
        props.setSharedDetailState({ event_id, type: props.treeType })
        props.setSharedCommentState({
            locationId,
            type: props.treeType,
            categ_id: categ[1][0].categorie_id,
            event_id: categ[1][0].event_id,
        })
        props.setSharedActiveState({ click: true })
    }, [])

    return (
        <>
            {/* {JSON.stringify(categAndLoc)} */}
            <TreeView
                className={`categoryContainer`}
                aria-label="Category and Location Tree"
                defaultCollapseIcon={<ExpandMoreIcon />}
                defaultExpandIcon={<ChevronRightIcon />}
                sx={{
                    minHeight: 240,
                    flexGrow: 1,
                    /* maxWidth: '30%', */
                    overflowY: 'auto',
                }}>
                <Tree
                    data={categAndLoc}
                    callbackCateG={buildGeoLocCateg}
                    callbackCenter={buildGeoLocCenter}
                    callbackDetail={buildIdDetail}
                    parentProps={props}
                />
            </TreeView>
        </>
    )
}

const Tree = ({
    callbackCateG,
    callbackCenter,
    callbackDetail,
    data,
    parentProps,
}) => {
    let dataObj = Object.entries(data)
    let counter = 0
    return (
        <>
            {data &&
                dataObj.map((categ, i) => {
                    return (
                        <React.Fragment key={i}>
                            <TreeItem
                                nodeId={`${(counter += 1)}`}
                                label={categ[0]}
                                key={counter}
                                onClick={() => {
                                    callbackCateG(parentProps, dataObj, i)
                                }}>
                                {categ[1].map((children, childId) => {
                                    return (
                                        <TreeItem
                                            nodeId={`${(counter += 1)}`}
                                            label={children.event_name}
                                            key={counter}
                                            onClick={() => {
                                                //display info about location, and comments
                                                callbackCateG(
                                                    parentProps,
                                                    dataObj,
                                                    i,
                                                )
                                                callbackCenter(
                                                    parentProps,
                                                    children.geo,
                                                )
                                                callbackDetail(
                                                    parentProps,
                                                    children.location_id,
                                                    children.event_id,
                                                    categ,
                                                )
                                            }}
                                        />
                                    )
                                })}
                            </TreeItem>
                        </React.Fragment>
                    )
                })}
        </>
    )
}
