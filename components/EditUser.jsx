import Label from '@/components/Label'
import styled from 'styled-components'
import { AlignLeft } from './AlignLeft'
import { Card } from './Card'
import { Container } from './Container'
import { SubmitButton } from './SubmitButton'
import { Title } from './Title'
import { useState } from 'react'

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

export function EditUser(props) {
    const [value, setValue] = useState('')

    return (
        <>
            <Container margin="20px 0px 0px 0px">
                <Title title={`Edit ${props.id}`} />
                <Card margin="16px 0px">
                    <AlignLeft>
                        <Label htmlFor={props.id}>{`New ${props.id}`}</Label>
                    </AlignLeft>
                    <StyledForm>
                        <StyledInput
                            className="block mt-1 w-full"
                            id={props.id}
                            type={props.type}
                            value={value}
                            onChange={event => setValue(event.target.value)}
                            required
                            autoFocus
                        />
                        <SubmitButton text="Submit" />
                    </StyledForm>
                </Card>
            </Container>
        </>
    )
}

// DONE
