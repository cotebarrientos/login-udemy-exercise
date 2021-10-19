import React, { useEffect } from 'react'
import { withRouter } from "react-router-dom";
import {auth} from '../firebase'
import Tasks from './Tasks';

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
            <h2 className="text-center">
                Welcome to your Admin panel
                <i className="fas fa-user text-warning ms-2"></i>
            </h2>
            <hr />
            {
                user && (
                    <Tasks user={user}/>
                )
            }
        </div>
    )
}

export default withRouter(Admin)
