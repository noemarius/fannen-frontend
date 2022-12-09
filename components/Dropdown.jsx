import { useState } from 'react'
import Image from 'next/image'

export function Dropdown(props) {
    const [open, setOpen] = useState(false)

    return (
        <>
            <div
                onClick={() => {
                    setOpen(!open)
                }}
                className="menuTrigger">
                <Image src="/more.png" height={40} width={40}></Image>
            </div>
            <div className={`dropdownMenu ${open ? 'active' : 'inactive'}`}>
                <ul className="listContainer">{props.children}</ul>
            </div>
            <style jsx>{`
                .menuTrigger {
                    border-radius: 50%;
                    height: 40px;
                    width: 40px;
                    cursor: pointer;
                }

                .dropdownMenu {
                    position: absolute;
                    top: 60px;
                    right: 0px;
                    left: 0px;
                    background-color: white;
                    padding: 10px 20px;
                    width: 100%;
                    z-index: 100;
                }

                .active {
                    opacity: 1;
                    visibility: visible;
                    transform: translateY(20px);
                    transition: 0.5s ease;
                }

                .inactive {
                    opacity: 0;
                    visibility: hidden;
                    transform: translateY(-20px);
                    transition: 0.5s ease;
                }

                .listContainer {
                    align-items: center;
                    display: flex;
                    flex-direction: column;
                    gap: 12px;
                }
            `}</style>
        </>
    )
}
