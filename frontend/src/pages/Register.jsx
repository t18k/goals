import { FaUser } from 'react-icons/fa'
import { toast } from 'react-toastify'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { register, reset } from '../features/auth/authSlice'
import Spinner from '../components/Spinner'

export function Register() {
    // formData
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: '',
    })

    const { name, email, password, password2 } = formData


    const onChange = (e) => {
        setFormData((previousState) => ({
            ...previousState,
            [e.target.name]: e.target.value,
        }))
    }

    const onSubmit = (e) => {
        e.preventDefault()
        console.log(name,email,password,password2)
        if (password !== password2) {
            toast.error("Passwords don't match")
        } else {
            const userData = {
                name,
                email,
                password,
            }
            dispatch(register(userData))
        }
    }

    // Redux...
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { user, isLoading, isError, isSuccess, message } = useSelector(
        (state) => state.auth
    )

    useEffect(() => {
        if (isError) {
            toast.error(message)
        }

        if (isSuccess) {
            navigate('/')
        }

        dispatch(reset())
    }, [user, isLoading, isError, isSuccess, message, navigate, dispatch])

    if (isLoading) {
        return <Spinner />
    }
    return (
        <>
            <section className="heading">
                <h1>
                    <FaUser /> Register
                </h1>
            </section>

            <section>
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            name="name"
                            value={name}
                            placeholder="Enter your name"
                            onChange={onChange}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            name="email"
                            value={email}
                            placeholder="Enter your email"
                            onChange={onChange}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            name="password"
                            value={password}
                            placeholder="Enter your password"
                            onChange={onChange}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            className="form-control"
                            id="password2"
                            name="password2"
                            value={password2}
                            placeholder="Confirm your password"
                            onChange={onChange}
                        />
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-block">
                            Submit
                        </button>
                    </div>
                </form>
            </section>
            <p className="heading heading-info">
                Create an account if you dont have one!
            </p>
        </>
    )
}
