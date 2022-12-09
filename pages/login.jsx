import AuthSessionStatus from '/components/AuthSessionStatus'
import Button from '/components/Button'
import Input from '/components/Input'
import InputError from '/vendor/laravel/breeze/stubs/inertia-react/resources/js/Components/InputError'
import Label from '/components/Label'
import Link from 'next/link'
import { AlignLeft } from '/components/AlignLeft'
import { Card } from '/components/Card'
import { Container } from '/components/Container'
import { Layout } from '/components/Layout'
import { Logo } from '/components/Logo'
import { toast } from 'react-toastify'
import { useAuth } from '/hooks/auth'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

export default function Login() {
    const router = useRouter()

    const { login } = useAuth({
        middleware: 'guest',
        redirectIfAuthenticated: '/dashboard',
    })

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [shouldRemember, setShouldRemember] = useState(false)
    const [errors, setErrors] = useState([])
    const [status, setStatus] = useState(null)

    useEffect(() => {
        if (router.query.reset?.length > 0 && errors.length === 0) {
            setStatus(atob(router.query.reset))
        } else {
            setStatus(null)
        }
    })

    const submitForm = async event => {
        event.preventDefault()

        login({
            email,
            password,
            remember: shouldRemember,
            setErrors,
            setStatus,
        })
        toast.success('Successfully logged in!', {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        })
    }
    return (
        <>
            <Layout pageTitle="Login">
                <Container>
                    <Logo height="250" width="250" />
                    <Card gap="8px">
                        {/* Session Status */}
                        <AuthSessionStatus className="mb-4" status={status} />
                        <form className="w-full" onSubmit={submitForm}>
                            {/* Email */}
                            <AlignLeft>
                                <Label htmlFor="email">Email</Label>
                            </AlignLeft>
                            <Input
                                id="email"
                                type="email"
                                value={email}
                                className="block w-full"
                                onChange={event => setEmail(event.target.value)}
                                required
                                autoFocus
                            />
                            <InputError
                                messages={errors.email}
                                className="mt-2"
                            />

                            {/* Password */}
                            <AlignLeft>
                                <Label htmlFor="password" className="mt-4">
                                    Password
                                </Label>
                            </AlignLeft>
                            <Input
                                id="password"
                                type="password"
                                value={password}
                                className="block w-full"
                                onChange={event =>
                                    setPassword(event.target.value)
                                }
                                required
                                autoFocus
                            />
                            <InputError
                                messages={errors.password}
                                className="mt-2"
                            />

                            {/* Remember Me */}
                            <div className="block mt-4">
                                <label
                                    htmlFor="remember_me"
                                    className="inline-flex items-center">
                                    <input
                                        id="remember_me"
                                        type="checkbox"
                                        name="remember"
                                        className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                        onChange={event =>
                                            setShouldRemember(
                                                event.target.checked,
                                            )
                                        }
                                    />

                                    <span className="ml-2 text-sm text-gray-600">
                                        Remember me
                                    </span>
                                </label>
                            </div>

                            <div className="flex items-center justify-end mt-4">
                                <Link href="/forgot-password">
                                    <a className="underline text-sm text-gray-600 hover:text-gray-900">
                                        Forgot your password?
                                    </a>
                                </Link>

                                <Button className="ml-3">Login</Button>
                            </div>
                        </form>
                    </Card>
                </Container>
            </Layout>
        </>
    )
}
