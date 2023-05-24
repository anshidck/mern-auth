import { useEffect, useState } from "react"
import { FaSignInAlt } from "react-icons/fa"
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { reset, login } from "../features/auth/authSlice"
import { toast } from "react-toastify"
import Spinner from "../component/Spinner"

function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })

    const { email, password } = formData;

    const navigate = useNavigate()
    const dispacth = useDispatch()

    const {user, isError, isSuccess, isLoading, message } = useSelector((state) => state.auth);

    useEffect(() => {

        if (isError) {
            toast.error(message)
        }

        if ( isSuccess || user ) {
            navigate('/')
        }

        dispacth(reset())

    },[user, isError, isSuccess, message, navigate, dispacth])

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    const onSubmit = (e) => {
        e.preventDefault()

        const userData = {
            email,
            password
        }
        dispacth(login(userData))
    }

    if (isLoading) {
        return <Spinner/>
    }
  return (
    <>
    <section className="headeing">
        <h1>
            <FaSignInAlt/> Login
        </h1>
        <p>Login and start setting goals</p>
    </section>
    <section className="form">
        <form onSubmit={onSubmit}>
            <div className="form-group">
                <input type="text" className="form-control" placeholder=" enter your email" id="email" name="email" value={email} onChange={onChange}/>
            </div>
            <div className="form-group">
                <input type="password" className="form-control" placeholder="enter your password " id="password" name="password" value={password} onChange={onChange}/>
            </div>
            <div className="form-group">
                <button type="submit" className="btn btn-block">Submit</button>
            </div>
        </form>
    </section>
    </>
  )
}

export default Login