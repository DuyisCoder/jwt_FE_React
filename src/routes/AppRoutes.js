import React from 'react'
import User from '../Components/ManagerUser/User';
import Login from '../Components/Login/Login'
import Register from '../Components/Register/Register';
import Home from '../Components/Home/Home'
import PrivateRoutes from './PrivateRoutes';
import { Route, Switch } from "react-router";



function NotFound() {
    return <h1>404 - Page Not Found</h1>;
}
function Project() {
    return <h1>Project</h1>;
}

export default function AppRoutes() {

    return (
        <>
            <Switch>

                <PrivateRoutes path="/users" component={User} />
                <PrivateRoutes path="/project" component={Project} />


                <Route path="/" exact><Home /></Route>
                <Route path="/login" exact><Login /></Route>
                <Route path="/register" exact><Register /></Route>
                <Route path="*" exact><NotFound /></Route>



                {/* <Route path='/login' element={<Login></Login>} />
                <Route path='/register' element={<Register></Register>} />
                <Route path="*" element={<NotFound />}></Route> */}
            </Switch>
        </>
    )
}
