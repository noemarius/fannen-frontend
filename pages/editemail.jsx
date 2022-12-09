import axios from '/lib/axios'
import { AlignLeft } from '/components/AlignLeft'
import { Card } from '/components/Card'
import { Container } from '/components/Container'
import Label from '/components/Label'
import { Layout } from '/components/Layout'
import { useAuth } from '/hooks/auth'
import { Title } from '/components/Title'
import { SubmitButton } from '/components/SubmitButton'
import { useRouter } from 'next/router'

import { toast } from 'react-toastify'

import { useState } from 'react'

import styled from 'styled-components'

const StyledForm = styled.form.attrs({
    method: 'post',
})`
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
`

const StyledInput = styled.input`
    border-radius: 20px;
`

export default function EditEmail() {
    const { user } = useAuth()
    const router = useRouter()
    const [value, setValue] = useState('')

    console.log(value)

    const handleSubmit = async () => {
        event.preventDefault()

        // store the states in the form data
        const formData = {
            email: value,
        }
        console.log(formData)
        try {
            // make axios post request
            const response = await axios.put(
                `api/updateemail/${user.id}`,
                formData,
                {
                    'Content-Type': 'multipart/form-data',
                },
                toast.success('Successfully updated!', {
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
        router.push('/account')
    }

    return (
        <>
            <Layout>
                <Container margin="20px 0px 0px 0px">
                    <Title title={`Edit Email`} />
                    <Card margin="16px 0px">
                        <AlignLeft>
                            <Label htmlFor="Email">{`New Email`}</Label>
                        </AlignLeft>
                        <StyledForm onSubmit={handleSubmit}>
                            <StyledInput
                                className="block mt-1 w-full"
                                type="email"
                                value={value}
                                onChange={event => setValue(event.target.value)}
                                required
                                autoFocus
                            />
                            <SubmitButton text="Submit" />
                        </StyledForm>
                    </Card>
                </Container>
            </Layout>
        </>
    )
}
