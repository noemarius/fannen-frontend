import axios from '/lib/axios'
import Label from '/components/Label'
import styled from 'styled-components'

import { AlignLeft } from '/components/AlignLeft'
import { Card } from '/components/Card'
import { Container } from '/components/Container'
import { Layout } from '/components/Layout'
import { Title } from '/components/Title'
import { SubmitButton } from '/components/SubmitButton'
import { useAuth } from '/hooks/auth'
import { useState } from 'react'
import { useEffect } from 'react'

import { useRouter } from 'next/router'

import { toast } from 'react-toastify'

// Styled Components
const StyledForm = styled.form.attrs({
    method: 'post',
})`
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;

    select {
        border-radius: 20px;
        text-align: center;
    }
`

const StyledInput = styled.input`
    border-radius: 20px;
    text-align: center;
`

const Textarea = styled.textarea`
    border-radius: 20px;
    height: 100px;
`

// Query
async function getCategories() {
    const resp = await axios.get('api/categories')
    return resp.data
}

async function getLocations() {
    const resp = await axios.get('api/locations')
    return resp.data
}

async function postEvent() {
    const resp = await axios.post('api/events')
}

export default function CreateEvent() {
    const { user } = useAuth({ middleware: 'auth' })
    const router = useRouter()

    const [name, setName] = useState('')
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [startTime, setStartTime] = useState('')
    const [endTime, setEndTime] = useState('')
    const [description, setDescription] = useState('')
    const [contact, setContact] = useState('')
    const [price, setPrice] = useState('')
    const [category, setCategory] = useState(1)
    const [location, setLocation] = useState(1)

    const [categoryList, setCategoryList] = useState({})
    const [locationList, setLocationList] = useState({})

    const handleSubmit = async () => {
        event.preventDefault()

        // store the states in the form data
        const loginFormData = {
            name: name,
            start_date: startDate,
            end_date: endDate,
            event_start: startTime,
            event_end: endTime,
            description: description,
            contact: contact,
            price: price,
            categorie_id: category,
            location_id: location,
            user_id: user.id,
        }
        console.log(loginFormData)

        try {
            // make axios post request
            const response = await axios.post(
                '/api/events',
                loginFormData,
                {
                    'Content-Type': 'multipart/form-data',
                },
                toast.success('Successfully added Event!', {
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
            toast.error('Error inserting!', {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
        }
        router.push('/account')
    }

    useEffect(() => {
        getCategories().then(rslt => setCategoryList(rslt))
    }, [])
    useEffect(() => {
        getLocations().then(rslt => setLocationList(rslt))
    }, [])

    // console.log(name)
    // console.log(startDate)
    // console.log(endDate)
    // console.log(startTime)
    // console.log(endTime)
    // console.log(description)
    // console.log(price)
    // console.log(contact)
    // console.log(contact)
    // console.log(category)
    // console.log(category_id)
    // console.log(location)
    // console.log(location_id)

    return (
        <>
            <Layout pageTitle="Add an Event" width="25%">
                <Container margin="10px 0px">
                    <Title title="Create a new Event" />
                    <Card>
                        <StyledForm onSubmit={handleSubmit}>
                            <AlignLeft>
                                <Label htmlFor="name">Name</Label>
                            </AlignLeft>
                            <StyledInput
                                className="block w-full"
                                id="name"
                                type="text"
                                value={name}
                                onChange={event => setName(event.target.value)}
                                required
                                autoFocus
                            />
                            <AlignLeft>
                                <Label htmlFor="startDate">Start Date</Label>
                            </AlignLeft>
                            <StyledInput
                                className="block w-full"
                                id="startDate"
                                type="date"
                                value={startDate}
                                onChange={event =>
                                    setStartDate(event.target.value)
                                }
                                required
                                autoFocus
                            />
                            <AlignLeft>
                                <Label htmlFor="endDate">End Date</Label>
                            </AlignLeft>
                            <StyledInput
                                className="block w-full"
                                id="endDate"
                                type="date"
                                value={endDate}
                                onChange={event =>
                                    setEndDate(event.target.value)
                                }
                                required
                                autoFocus
                            />
                            <AlignLeft>
                                <Label htmlFor="startTime">Start Time</Label>
                            </AlignLeft>
                            <StyledInput
                                className="block w-full"
                                id="startTime"
                                type="time"
                                value={startTime}
                                onChange={event =>
                                    setStartTime(event.target.value)
                                }
                                required
                                autoFocus
                            />
                            <AlignLeft>
                                <Label htmlFor="endTime">End Time</Label>
                            </AlignLeft>
                            <StyledInput
                                className="block w-full"
                                id="startTime"
                                type="time"
                                value={endTime}
                                onChange={event =>
                                    setEndTime(event.target.value)
                                }
                                required
                                autoFocus
                            />
                            <AlignLeft>
                                <Label htmlFor="description">Description</Label>
                            </AlignLeft>
                            <Textarea
                                className="block w-full"
                                id="description"
                                type="textarea"
                                value={description}
                                onChange={event =>
                                    setDescription(event.target.value)
                                }
                                required
                                autoFocus
                            />
                            <AlignLeft>
                                <Label htmlFor="price">Price in €</Label>
                            </AlignLeft>
                            <StyledInput
                                className="block w-full"
                                id="price"
                                type="number"
                                value={price}
                                onChange={event => setPrice(event.target.value)}
                                required
                                autoFocus
                            />
                            <AlignLeft>
                                <Label htmlFor="Contact">Contact</Label>
                            </AlignLeft>
                            <StyledInput
                                className="block w-full "
                                id="contact"
                                type="text"
                                value={contact}
                                onChange={event =>
                                    setContact(event.target.value)
                                }
                                required
                                autoFocus
                            />
                            <AlignLeft>
                                <Label htmlFor="Category">Category</Label>
                            </AlignLeft>
                            <select
                                className="block w-full"
                                name="category"
                                onChange={event =>
                                    setCategory(event.target.value)
                                }>
                                {Object.entries(categoryList).map(e => {
                                    return (
                                        <option value={e[1].id}>
                                            {e[1].name}
                                        </option>
                                    )
                                })}
                            </select>
                            <AlignLeft>
                                <Label htmlFor="Location">Location</Label>
                            </AlignLeft>
                            <select
                                className="block w-full"
                                name="category"
                                onChange={event =>
                                    setLocation(event.target.value)
                                }>
                                {Object.entries(locationList).map(e => {
                                    return (
                                        <option value={e[1].id}>
                                            {e[1].name}
                                        </option>
                                    )
                                })}
                            </select>
                            <SubmitButton value="Create Event" />
                        </StyledForm>
                    </Card>
                </Container>
            </Layout>
        </>
    )
}
