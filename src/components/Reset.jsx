import React, { useState, useCallback } from 'react'
import { auth } from '../firebase'
import { withRouter } from 'react-router-dom'

const Reset = (props) => {

    const [email, setEmail] = useState('')
    const [error, setError] = useState(null)

    const processData = e => {
        e.preventDefault()

        if(!email.trim()){
            setError("You must write your email")
            return
        }
        
        setError(null)
        requestPassword()
    
    }

    const requestPassword = useCallback(async() => {

        try {

            await auth.sendPasswordResetEmail(email)
            props.history.push('/login')

        } catch(error) {
            setError(error.message)
        }

    },[email, props.history])

    return (
        <div className="mt-4">
             <h2 className="text-center">
                Reset Password
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
                        
                        <div className="d-grid gap-2">
                            <button 
                                className="btn btn-lg btn-dark mt-3"
                                type="submit"
                            >
                                Request password reset
                                <i className="fas fa-check-double ms-2"></i>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default withRouter(Reset)
