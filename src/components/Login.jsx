import React from 'react'

const Login = () => {
    return (
        <div className="mt-4">
             <h2 className="text-center">User registration</h2>
            <hr className="mb-5"/>
            <div className="row justify-content-center me-0">
                <div className="col-12 col-sm-8 col-md-6 col-xl-4">
                    <form className="ps-3 pe-2">
                        <input 
                            type="email" 
                            className="form-control mb-2"
                            placeholder="Write your Email"
                        />
                        <input 
                            type="password" 
                            className="form-control mb-2 mb-3"
                            placeholder="Write your Password"
                        />
                        <div className="d-grid gap-2">
                            <button 
                                className="btn btn-lg btn-dark"
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
