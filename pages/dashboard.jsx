import styled from 'styled-components'
import axios from '/lib/axios'
import Box from '@mui/material/Box'
import Category from '/components/DashboardContent/Category'
import Comment from '/components/DashboardContent/Comment'
import Detail from '/components/DashboardContent/Detail'
import Event from '/components/DashboardContent/Event'
import Image from 'next/image'
import Map from '/components/DashboardContent/Map'
import PropTypes from 'prop-types'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Typography from '@mui/material/Typography'
import UserLocation from '/components/DashboardContent/UserLocation'
import { AlignLeft } from '/components/AlignLeft'
import { Card } from '/components/Card'
import { Container } from '/components/Container'
import { Layout } from '/components/Layout'
import { SubmitButton } from '/components/SubmitButton'
import { Title } from '/components/Title'
import { toast } from 'react-toastify'
import { useState, useEffect } from 'react'
import { useAuth } from '/hooks/auth'

// Styled Components
const LeftContainer = styled.div`
    flex: 1 20%;
    display: flex;
    flex-direction: column;
    gap: 20px;
    height: 100%;
`

const RightContainer = styled.div`
    flex: 4 80%;
`

const TreeContainer = styled.div`
    display: flex;
    flex-direction: row;
    min-height: 200px;
    width: 100%;
    justify-items: center;
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

export default function Dashboard() {
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
    console.log(userId)

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
                    toast.success('Successfully added a comment! Validation is pending...', {
                        position: 'top-right',
                        autoClose: 7000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    }),
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
                    toast.success('Successfully added a comment!', {
                        position: 'top-right',
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    }),
                )
            } catch (error) {
                console.log(error)
            }
        }
    }

    //TODO: display a in a better way the tabs, if possible city selection to the right
    useEffect(() => console.log(sharedCityIdState), [sharedCityIdState])

    return (
        <>
            <Layout width="90%" widthTablet="90%">
                <Card>
                    <Container
                        align="stretch"
                        directionTablet="row"
                        justify="space-between"
                        gap="20px">
                        <LeftContainer>
                            <UserLocation
                                setSharedCityIdState={val => {
                                    setSharedCityIdState(val)
                                }}
                            />
                            <TreeContainer>
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
                                            <Tab
                                                label="Themes"
                                                {...a11yProps(0)}
                                            />
                                            <Tab
                                                label="Events"
                                                {...a11yProps(1)}
                                            />
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
                                            sharedCityIdState={
                                                sharedCityIdState
                                            }
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
                                            sharedCityIdState={
                                                sharedCityIdState
                                            }
                                            treeType={'events'}
                                        />
                                    </TabPanel>
                                </Box>
                            </TreeContainer>
                        </LeftContainer>
                        <RightContainer>
                            <Map
                                sharedMarkersState={sharedMarkersState}
                                sharedCenterState={sharedCenterState}
                                sharedCityIdState={sharedCityIdState}
                            />
                        </RightContainer>
                    </Container>
                </Card>
                <div
                    className={`infoContainer ${
                        sharedActiveState ? 'active' : 'inactive'
                    }`}>
                    <Card>
                        <div className="info">
                            <Container directionTablet="row">
                                <Detail sharedDetailState={sharedDetailState} />
                                <Comment
                                    sharedCommentState={sharedCommentState}
                                />
                                {user ? (
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
                                ) : (
                                    <></>
                                )}
                            </Container>
                        </div>
                    </Card>
                </div>
                <div className={`${active ? 'display' : 'dontDisplay'}`}>
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
                        <form onSubmit={handleSubmit} className="commentForm">
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
            </Layout>
            <style jsx>{`
                .inactive {
                    display: none;
                    position: absolute;
                }
                .addComment {
                    position: absolute;
                    right: 5px;
                    bottom: 5px;
                }
                .info {
                    width: 100%;
                    position: relative;
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
}
