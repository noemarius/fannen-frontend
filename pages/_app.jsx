import { GlobalStyle } from '../styles/globals'
import { Reset } from '../styles/reset'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'

function MyApp({ Component, pageProps }) {
    return (
        <>
            <Reset />
            <GlobalStyle />
            <Component {...pageProps} />
            <ToastContainer />
        </>
    )
}

export default MyApp
