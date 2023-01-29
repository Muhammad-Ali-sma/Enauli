import React from 'react'
import { Col, Card, CardBody, CardTitle, Button, Form, FormGroup, Label, Input, NavLink } from 'reactstrap';
import { formReducer } from '../../Utils/globalFunctions';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { changePin } from '../../Services/UserService';
import { useReducer } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AppSidebar from '../../Layout/AppSidebar';
import AppHeader from '../../Layout/AppHeader';
import { UserLogin } from '../../Actions/AuthAction';


const ChangePass = () => {

    const [formData, setformData] = useReducer(formReducer, {});
    const dispatch = useDispatch();
    const user = useSelector(state => state.AuthReducer.user);

    console.log(user)
    const handleSubmit = () => {
        if (formData['oldPin'] && formData['newPin']) {
            let newData = {
                userId: user?.userId,
                ...formData
            }
            changePin(newData)
                .then(res => {
                    console.log('changePin', res)
                    if (res?.success) {
                        toast.success('Pin changed successfully', {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                        });
                        localStorage.clear();
                        dispatch(UserLogin('Logout'))
                        window.location.href = 'login';
                    } else {
                        toast.error('Old Pin is not correct!', {
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
            toast.error('Please Enter Cerendentials!', {
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
        <>
            <AppHeader />
            <div className="app-main">
                <AppSidebar />
                <div className="app-main__outer">
                    <div className="app-main__inner">
                            <Card className="main-card mb-3 h-100">
                                <CardBody className='d-flex flex-column justify-content-center'>
                                    <CardTitle className='text-center fz-5'>Change Pin</CardTitle>
                                    <Form className='d-flex flex-column align-items-center'>
                                        <Col md={4}>
                                            <FormGroup>
                                                <Label >Old Pin</Label>
                                                <Input onChange={(e) => setformData(e)} type="number" name="oldPin" i placeholder="Old Pin" />
                                            </FormGroup>
                                        </Col>
                                        <Col md={4}>
                                            <FormGroup>
                                                <Label >New Pin</Label>
                                                <Input onChange={(e) => setformData(e)} type="number" name="newPin" i placeholder="New Pin" />
                                            </FormGroup>
                                        </Col>
                                        <Button onClick={handleSubmit} color="primary" className="mt-2">Submit</Button>
                                    </Form>

                                </CardBody>
                                <ToastContainer />
                            </Card>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ChangePass;