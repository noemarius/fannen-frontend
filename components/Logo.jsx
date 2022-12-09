import Image from 'next/image'

export function Logo(props) {
    return <Image src="/fannen.png" height={props.height} width={props.width} />
}

// DONE