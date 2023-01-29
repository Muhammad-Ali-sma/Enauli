import { Route, Redirect } from "react-router-dom";
import React, { Suspense, lazy, Fragment } from 'react';

import {
    ToastContainer,
} from 'react-toastify';
import { useSelector } from "react-redux";
import { Spinner } from "reactstrap";
import Station from "../../DemoPages/Station";
import Official from "../../DemoPages/Official";
import List from "../../DemoPages/Sacco/List";
import Login from "../../DemoPages/Login";
import ForgetPass from "../../DemoPages/ForgetPass";
import ChangePass from "../../DemoPages/ChangePass";
import Vehicle from "../../DemoPages/Vehicle";
import Operator from "../../DemoPages/Operators";






const AppMain = () => {
    const isAuthenticated = useSelector(state => state.AuthReducer.login);
    console.log('isAuthenticated', isAuthenticated)
    return (
        <Fragment>
            {isAuthenticated === "Login"
                ?
                <>                


                    <Route path="/changePass" component={ChangePass} />
                    <Route path="/operator/:id" component={Operator} />
                    <Route path="/list" component={List} />
                    <Route path="/official/:id/:saccoId" component={Official} />
                    <Route path="/stations/:id" component={Station} />
                    <Route path="/vehicle/:id" component={Vehicle} />

                    <Route exact path="/" render={() => <Redirect to="/list" />} />
                    <Route exact path="/login" render={() => <Redirect to="/list" />} />
                    <ToastContainer />
                </>
                :
                <>
                    <Route exact path="/" render={() => <Redirect to="/login" />} />

                    <Route path="/login" component={Login} />

                    <Route path="/forgetPass" component={ForgetPass} />

                </>
            }

        </Fragment>
    )
};

export default AppMain;