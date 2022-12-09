import styled from 'styled-components'

import { Container } from './Container'
import { useState } from 'react'
import { Text } from './Text'
import { Layout } from './Layout'

export function DropdownDash(props) {
    const [open, setOpen] = useState(false)

    return (
        <>
            <Layout>
                <Container gap="12px">
                    <div
                        className="menuTrigger"
                        onClick={() => {
                            setOpen(!open)
                        }}>
                        <Text text="Select your theme!" />
                    </div>
                    <div
                        className={`dropdownMenu ${
                            open ? 'active' : 'inactive'
                        }`}>
                        <ul className="listContainer">{props.children}</ul>
                    </div>
                </Container>
            </Layout>
            <style jsx>{`
                .dropdownMenu {
                    background-color: white;
                    border-radius: 20px;
                    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
                    padding: 10px 20px;
                    width: 100%;
                }

                .menuTrigger {
                    align-items: center;
                    background-color: white;
                    border-radius: 20px;
                    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
                    display: flex;
                    height: 40px;
                    justify-content: center;
                    width: 100%;
                }

                .active {
                    opacity: 1;
                    visibility: visible;
                }

                .inactive {
                    opacity: 0;
                    // position absolute so it doesn't take space when not visible
                    position: absolute;
                    visibility: hidden;
                }

                .listContainer {
                    align-items: center;
                    display: flex;
                    flex-direction: column;
                    gap: 12px;
                    width: 100%;
                }
            `}</style>
        </>
    )
}
