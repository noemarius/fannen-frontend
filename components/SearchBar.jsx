import Image from 'next/image'
import styled from 'styled-components'

const Search = styled.div`
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-top: 12px;
`

const Input = styled.input.attrs({
    type: 'text',
    placeholder: 'Search for a theme',
})`
    border-radius: 20px 0px 0px 20px;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
`

const Submit = styled.input.attrs({
    type: 'submit',
    value: 'Search',
})`
    background-color: white;
    border: 1px solid black;
    border-radius: 0px 20px 20px 0px;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    height: 42px;
    width: 80px;
`

export function SearchBar() {
    return (
        <>
            <Search>
                <form method="post">
                    <Input />
                    <Submit />
                </form>
            </Search>
        </>
    )
}

// DONE