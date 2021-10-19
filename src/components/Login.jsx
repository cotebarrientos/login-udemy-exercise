import React, { useCallback, useState } from 'react'
import { auth, db } from '../firebase'
import { withRouter } from 'react-router-dom'

const Login = (props) => {

    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')
    const [error, setError] = useState(null)
    const [isRegister, setIsRegister] = useState(true)

    const processData = e => {
        e.preventDefault()

        if(!email.trim()){
            // console.log("you must write your email")
            setError("You must write your email")
            return
        }

        if(!pass.trim()){
            // console.log("you must write a password")
            setError("You must write a password")
            return
        }
        
        if(pass.length < 6){
            // console.log('You must enter a password at least 6 characters long')
            setError('You must enter a password at least 6 characters long')
            return
        }
        
        console.log("It's everything ok")
        setError(null)

        if(isRegister){
            registration()
        } else {
            login()
        }
    
    }

    const login = useCallback(async() => {
        try {
            await auth.signInWithEmailAndPassword(email, pass)  
            setEmail('')
            setPass('')
            setError(null)
            props.history.push('/admin') 

        } catch(error){
            console.log(error)
            setError(error.message)
        }
    },[email, pass, props.history],
    )

    const registration = useCallback(async() => {

        try {
            const res = await auth.createUserWithEmailAndPassword(email, pass)
            console.log(res.user)
            await db.collection('users').doc(res.user.email).set({
                email: res.user.email,
                uid: res.user.uid
            })
            setEmail('')
            setPass('')
            setError(null)
            props.history.push('/admin') 

        } catch(error) {
            console.log(error)
            setError(error.message)
        }

    }, [email, pass, props.history])


    return (
        <div className="mt-4">
             <h2 className="text-center">
                 {
                     isRegister ? 'User Registration' : 'Login'
                 }
             </h2>
            <hr className="mb-5"/>
            <div className="row justify-content-center me-0">
                <div className="col-12 col-sm-8 col-md-6 col-xl-4">
                    <form className="ps-3 pe-2" onSubmit={processData}>
                        {
                            error && (
                            <div className="alert alert-danger">
                                {error}<i className="fas fa-exclamation-triangle ms-2"></i>
                            </div>
                            )
                        }
                        <input 
                            type="email" 
                            className="form-control mb-2"
                            placeholder="Write your Email"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                        />
                        <input 
                            type="password" 
                            className="form-control mb-2"
                            placeholder="Write your Password"
                            onChange={(e) => setPass(e.target.value)}
                            value={pass}
                        />
                        <small className="text-muted">Min. 6 characters</small>
                        <div className="d-grid gap-2">
                            <button 
                                className="btn btn-lg btn-dark mt-3"
                                type="submit"
                            >
                                {
                                    isRegister ? 'Register' : 'Login'
                                }
                                <i className={
                                    isRegister ? "fas fa-user-plus ms-2" : "fas fa-sign-in-alt ms-2"
                                    }></i>
                            </button>
                            <button 
                                className="btn btn-sm btn-my-custom-info text-light mb-5"
                                type="button"
                                onClick={() => setIsRegister(!isRegister)}
                            >
                                {
                                   isRegister ? 'Already registered?' : '¿Do not have an account yet?' 
                                }
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default withRouter(Login)
