import styled from 'styled-components'
import { useState, useEffect } from 'react'
import Category from './Category'
import Map from './Map'
import Detail from './Detail'
import Comment from './Comment'
import Event from './Event'
import PropTypes from 'prop-types'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import UserLocation from './UserLocation'
import Image from 'next/image'
import { Card } from '../Card'
import { Title } from '../Title'
import { SubmitButton } from '../SubmitButton'
import { useAuth } from '@/hooks/auth'
import axios from '@/lib/axios'
import { AlignLeft } from '../AlignLeft'
/* import Test from './test' */

// Styled components
const Container = styled.div`
    align-items: center;
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin: 12px 0px;
    width: 100%;
    .categoryContainer {
        box-shadow: #fff 0px 3px 8px;
        background-color: white;
        width: 100%;
        color: black;
        padding: 8px;
    }
    .detailContainer,
    .commentContainer {
        flex: 0 0 50%;
        box-shadow: #fff 0px 3px 8px;
        background-color: white;
        padding: 8px;
        overflow: scroll;
        word-wrap: break-word;
    }
    .infoContainer,
    .treeContainer {
        display: flex;
        flex-direction: row;
        min-height: 200px;
        width: 100%;
        justify-items: center;
    }
    .MuiTreeView-root {
        min-height: 0px;
    }

    .inactive {
        display: none;
        position: absolute;
    }

    .infoContainer {
        position: relative;
    }
    .addComment {
        position: absolute;
        right: 5px;
        bottom: 5px;
    }

    .display {
        position: absolute;
        top: 30%;
        left: 20%;
        right: 20%;
    }

    .dontDisplay {
        display: none;
    }

    .comment {
        text-align: top;
        resize: none;
        width: 100%;
        height: 200px;
    }

    .commentForm {
        align-items: center;
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: 100%;
    }

    .commentButton {
        background-color: blue;
        border-radius: 20px;
        height: 60px;
        width: 200px;
    }

    .treeContainer {
        width: 100%;
    }

    .infoContainer {
        justify-content: space-between;
    }
`
function TabPanel(props) {
    const { children, value, index, ...other } = props
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}>
            {value === index && (
                <Box sx={{ p: 0, mt: 2 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    )
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
}

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    }
}

export function DashboardContent() {
    const [sharedMarkersState, setSharedMarkersState] = useState({})
    const [sharedCenterState, setSharedCenterState] = useState({})
    const [sharedDetailState, setSharedDetailState] = useState({})
    const [sharedCommentState, setSharedCommentState] = useState({})
    const [sharedActiveState, setSharedActiveState] = useState(false)
    const [sharedCityIdState, setSharedCityIdState] = useState({})
    const [value, setValue] = useState(0)
    const [comment, setComment] = useState('')
    const [active, setActive] = useState(false)

    const { user } = useAuth()
    const userId = user?.id

    const handleChange = (event, newValue) => {
        setValue(newValue)
    }

    const handleSubmit = async e => {
        console.log(e)
        console.log(sharedCommentState)
        console.log(sharedCommentState.locationId)
        e.preventDefault()
        setActive(false)

        if (sharedCommentState.type == 'categories') {
            // store the states in the form data
            const commentData = {
                comment: comment,
                user_id: userId,
                location_id: sharedCommentState.locationId,
            }

            console.log(commentData)

            try {
                const response = await axios.post(
                    '/api/comments',
                    commentData,
                    {
                        'Content-Type': 'multipart/form-data',
                    },
                )
            } catch (error) {
                console.log(error)
            }
        } else {
            // store the states in the form data
            const commentData = {
                comment: comment,
                user_id: userId,
                event_id: sharedCommentState.event_id,
            }

            console.log(commentData)

            try {
                const response = await axios.post(
                    '/api/comments',
                    commentData,
                    {
                        'Content-Type': 'multipart/form-data',
                    },
                )
            } catch (error) {
                console.log(error)
            }
        }
    }

    //TODO: display a in a better way the tabs, if possible city selection to the right
    useEffect(() => console.log(sharedCityIdState), [sharedCityIdState])

    if (user) {
        return (
            <>
                <Card>
                    <Container>
                        <UserLocation
                            setSharedCityIdState={val => {
                                setSharedCityIdState(val)
                            }}
                        />
                        <div className={`treeContainer`}>
                            <Box sx={{ width: '100%' }}>
                                <Box
                                    sx={{
                                        borderBottom: 1,
                                        borderColor: 'divider',
                                    }}>
                                    <Tabs
                                        value={value}
                                        onChange={handleChange}
                                        variant="fullWidth"
                                        aria-label="basic tabs example">
                                        <Tab label="Themes" {...a11yProps(0)} />
                                        <Tab label="Events" {...a11yProps(1)} />
                                    </Tabs>
                                </Box>
                                <TabPanel value={value} index={0}>
                                    <Category
                                        setSharedMarkersState={val => {
                                            setSharedMarkersState(val)
                                        }}
                                        setSharedCenterState={val => {
                                            setSharedCenterState(val)
                                        }}
                                        setSharedDetailState={val => {
                                            setSharedDetailState(val)
                                        }}
                                        setSharedCommentState={val => {
                                            setSharedCommentState(val)
                                        }}
                                        setSharedActiveState={val => {
                                            setSharedActiveState(val)
                                        }}
                                        sharedCityIdState={sharedCityIdState}
                                        treeType={'categories'}
                                    />
                                </TabPanel>
                                <TabPanel value={value} index={1}>
                                    <Event
                                        setSharedMarkersState={val => {
                                            setSharedMarkersState(val)
                                        }}
                                        setSharedCenterState={val => {
                                            setSharedCenterState(val)
                                        }}
                                        setSharedDetailState={val => {
                                            setSharedDetailState(val)
                                        }}
                                        setSharedCommentState={val => {
                                            setSharedCommentState(val)
                                        }}
                                        setSharedActiveState={val => {
                                            setSharedActiveState(val)
                                        }}
                                        sharedCityIdState={sharedCityIdState}
                                        treeType={'events'}
                                    />
                                </TabPanel>
                            </Box>
                        </div>
                        <Map
                            sharedMarkersState={sharedMarkersState}
                            sharedCenterState={sharedCenterState}
                            sharedCityIdState={sharedCityIdState}
                        />
                        <div
                            className={`infoContainer ${
                                sharedActiveState ? 'active' : 'inactive'
                            }`}>
                            <Detail sharedDetailState={sharedDetailState} />
                            <Comment sharedCommentState={sharedCommentState} />
                            <button
                                className="addComment"
                                onClick={() => setActive(!active)}>
                                <Image
                                    src={'/plus.svg'}
                                    height={32}
                                    width={32}
                                />
                                <div>Add a comment</div>
                            </button>
                        </div>

                        {/* done till here */}
                        <div
                            className={`${active ? 'display' : 'dontDisplay'}`}>
                            <Card>
                                <AlignLeft>
                                    <div className="cont">
                                        <p
                                            onClick={e => {
                                                setActive(false)
                                            }}>
                                            Close
                                        </p>
                                    </div>
                                </AlignLeft>
                                <Title title="Add a comment" />
                                <form
                                    onSubmit={handleSubmit}
                                    className="commentForm">
                                    <textarea
                                        className="comment"
                                        type="text"
                                        name="comment"
                                        value={comment}
                                        onChange={e => {
                                            setComment(event.target.value)
                                        }}
                                    />
                                    <SubmitButton value="Add Comment" />
                                </form>
                            </Card>
                        </div>
                    </Container>
                </Card>
                <style jsx>{`
                    .cont {
                        align-items: center;
                        background-color: #39b7ff;
                        border-radius: 20px;
                        display: flex;
                        height: 40px;
                        justify-content: center;

                        width: 100px;
                        cursor: pointer;
                    }
                `}</style>
            </>
        )
    } else {
        return (
            <>
                <Card>
                    <Container>
                        <UserLocation
                            setSharedCityIdState={val => {
                                setSharedCityIdState(val)
                            }}
                        />
                        <div className={`treeContainer`}>
                            <Box sx={{ width: '100%' }}>
                                <Box
                                    sx={{
                                        borderBottom: 1,
                                        borderColor: 'divider',
                                    }}>
                                    <Tabs
                                        value={value}
                                        onChange={handleChange}
                                        variant="fullWidth"
                                        aria-label="basic tabs example">
                                        <Tab label="Themes" {...a11yProps(0)} />
                                        <Tab label="Events" {...a11yProps(1)} />
                                    </Tabs>
                                </Box>
                                <TabPanel value={value} index={0}>
                                    <Category
                                        setSharedMarkersState={val => {
                                            setSharedMarkersState(val)
                                        }}
                                        setSharedCenterState={val => {
                                            setSharedCenterState(val)
                                        }}
                                        setSharedDetailState={val => {
                                            setSharedDetailState(val)
                                        }}
                                        setSharedCommentState={val => {
                                            setSharedCommentState(val)
                                        }}
                                        setSharedActiveState={val => {
                                            setSharedActiveState(val)
                                        }}
                                        sharedCityIdState={sharedCityIdState}
                                        treeType={'categories'}
                                    />
                                </TabPanel>
                                <TabPanel value={value} index={1}>
                                    <Event
                                        setSharedMarkersState={val => {
                                            setSharedMarkersState(val)
                                        }}
                                        setSharedCenterState={val => {
                                            setSharedCenterState(val)
                                        }}
                                        setSharedDetailState={val => {
                                            setSharedDetailState(val)
                                        }}
                                        setSharedCommentState={val => {
                                            setSharedCommentState(val)
                                        }}
                                        setSharedActiveState={val => {
                                            setSharedActiveState(val)
                                        }}
                                        sharedCityIdState={sharedCityIdState}
                                        treeType={'events'}
                                    />
                                </TabPanel>
                            </Box>
                        </div>
                        <Map
                            sharedMarkersState={sharedMarkersState}
                            sharedCenterState={sharedCenterState}
                            sharedCityIdState={sharedCityIdState}
                        />
                        <div
                            className={`infoContainer ${
                                sharedActiveState ? 'active' : 'inactive'
                            }`}>
                            <Detail sharedDetailState={sharedDetailState} />
                            <Comment sharedCommentState={sharedCommentState} />
                        </div>
                    </Container>
                </Card>
            </>
        )
    }
}
