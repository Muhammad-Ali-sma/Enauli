import React from 'react'
import { Col, Card, CardBody, CardTitle, Button, Form, FormGroup, Label, Input, NavLink } from 'reactstrap';
import { formReducer } from '../../Utils/globalFunctions';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { login } from '../../Services/UserService';
import { useReducer } from 'react';
import { AddUser, UserLogin } from '../../Actions/AuthAction';
import { useDispatch } from 'react-redux';

const Login = () => {
    const [formData, setformData] = useReducer(formReducer, {});
    const dispatch = useDispatch();

    const handleLogin = async () => {
        if (formData['emailOrPhoneNumberOrId'] && formData['pin']) {
            await login(formData)
                .then(res => {
                    console.log('login', res);
                    if (res?.success) {
                        localStorage.setItem('Token', res?.data?.accessToken);
                        dispatch(AddUser(res?.data?.user));
                        dispatch(UserLogin('Login'));
                        localStorage.setItem('User', JSON.stringify(res?.data?.user));
                        localStorage.setItem('Login', true);
                    } else {
                        toast.error('Invalid Cerendentials', {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                        });
                    }
                })
                .catch(err => console.log(err))
        } else {
            toast.error('Please Enter Cerendentials', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    }

    return (
        <div>
            <Card className="main-card mb-3 h-100">
                <CardBody className='d-flex flex-column justify-content-center'>
                    <CardTitle className='text-center fz-5'>Sign In</CardTitle>
                    <Form className='d-flex flex-column align-items-center'>
                        <Col md={4}>
                            <FormGroup>
                                <Label for="exampleEmail11">Email</Label>
                                <Input onChange={(e) => setformData(e)} type="email" name="emailOrPhoneNumberOrId" id="exampleEmail11" placeholder="Email" />
                            </FormGroup>
                        </Col>
                        <Col md={4}>
                            <FormGroup>
                                <Label for="examplePassword11">Pin</Label>
                                <Input onChange={(e) => setformData(e)} type="number" name="pin" id="examplePassword11" placeholder="Pin" />
                            </FormGroup>
                        </Col>
                        <Col md={4}>
                            <NavLink href='/#/forgetPass'>Reset Pin</NavLink>
                        </Col>
                        <Button onClick={handleLogin} color="primary" className="mt-2">Sign in</Button>
                    </Form>

                </CardBody>
                <ToastContainer />
            </Card>
        </div>
    )
}

export default Login;