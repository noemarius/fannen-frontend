import styled from 'styled-components'
import { Text } from './Text'

const Submit = styled.input.attrs(props => ({
    type: 'submit',
    value: props.value || 'Update',
}))`
    align-items: center;
    background-color: #39b7ff;
    border-radius: 20px;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    height: 32px;
    justify-content: center;
    margin-top: 8px;
    padding: 8px;
    width: 120px;

    :hover {
        transform: scale(1.05);
    }
`

export function SubmitButton(props) {
    return (
        <>
            <Submit value={props.value} onClick={props.click} />
        </>
    )
}

// DONE
