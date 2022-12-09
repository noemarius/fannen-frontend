import { toast } from 'react-toastify'

export default function Test() {
    const onClick = () =>
    toast('Successfully updated', { hideProgressBar: true, autoClose: 2000, type: 'success' ,position:'bottom-right' })

    return <button onClick={onClick}> Click Me</button>
}
