import React, {useState} from 'react'

const Login = () => {

    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')
    const [error, setError] = useState(null)

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
        
        if(pass.length < 6) {
            // console.log('You must enter a password at least 6 characters long')
            setError('You must enter a password at least 6 characters long')
            return
        }
        setError(null)
        console.log("It's everything ok")
    
    }


    return (
        <div className="mt-4">
             <h2 className="text-center">User registration</h2>
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
                                Login
                                <i className="fas fa-sign-in-alt ms-2"></i>
                            </button>
                            <button 
                                className="btn btn-sm btn-my-custom-info text-light mb-5"
                                type="button"
                            >
                                ¿Do not have an account yet?
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login
