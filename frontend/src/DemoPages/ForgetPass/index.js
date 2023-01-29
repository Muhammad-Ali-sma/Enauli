import React from 'react'
import { Col, Card, CardBody, CardTitle, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { formReducer } from '../../Utils/globalFunctions';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { resetPassword, getOtp, resetPin } from '../../Services/UserService';
import { useReducer } from 'react';
import { useDispatch } from 'react-redux';


const ForgetPass = () => {

    const [formData, setformData] = useReducer(formReducer, {});
    // 334642883845947392
    // 1996
    const handleSubmit = () => {
        if (formData['userId'] && formData['yearOfBirth']) {
            resetPin(formData)
                .then(res => {
                    console.log('resetPin', res)
                    if (res?.success) {
                        toast.success('Pin Changed Successfully, Please Login.', {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                        });
                    } else {
                        toast.error('Incorrect DOB or User Id!', {
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
        <div>
            <Card className="main-card mb-3 h-100">
                <CardBody className='d-flex flex-column justify-content-center'>
                    <CardTitle className='text-center fz-5'>Reset Password</CardTitle>
                    <Form className='d-flex flex-column align-items-center'>
                        <Col md={4}>
                            <FormGroup>
                                <Label>User Id</Label>
                                <Input onChange={(e) => setformData(e)} type="number" name="userId" placeholder="User Id" />
                            </FormGroup>
                        </Col>
                        <Col md={4}>
                            <FormGroup>
                                <Label >Year Of Birth</Label>
                                <Input onChange={(e) => setformData(e)} type="number" name="yearOfBirth" placeholder="Year Of Birth" />
                            </FormGroup>
                        </Col>
                        <Button onClick={handleSubmit} color="primary" className="mt-2">Submit</Button>
                    </Form>

                </CardBody>
                <ToastContainer />
            </Card>
        </div>
    )
}

export default ForgetPass;