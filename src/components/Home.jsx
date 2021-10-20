import React from 'react'

const Home = () => {
    return (
        <div className="container mt-4">
            <h1 className="text-center">
                Welcome to 
                <span className="text-success ms-2">C</span>
                <span className="text-primary">R</span>
                <span className="text-warning">U</span>
                <span className="text-danger">D </span>
                Simple App
                <i className="fas fa-clipboard-list text-secondary ms-2"></i>
            </h1>
            <hr />
            <img 
            src="https://images.unsplash.com/photo-1542435503-956c469947f6?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1074&q=80"
            alt="CRUD Simple App"
            className="img-fluid d-block mx-auto mt-5" />
        </div>
    )
}

export default Home
