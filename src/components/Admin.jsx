import React, { useEffect } from 'react'
import { withRouter } from "react-router-dom";
import {auth} from '../firebase'

const Admin = (props) => {

    const [user, setUser] = React.useState(null)

    useEffect(() => {
        if(auth.currentUser){
            console.log('exist')
            setUser(auth.currentUser)
        }else{
            console.log('no exist')
            props.history.push('/login')
        }
    }, [props.history])

    return (
        <div className="mt-4">
            <h2 className="text-center">Admin</h2>
            <hr />
            {
                user && (
                    <h4>Welcome <span className="text-success">{user.email}</span></h4>
                )
            }
        </div>
    )
}

export default withRouter(Admin)
