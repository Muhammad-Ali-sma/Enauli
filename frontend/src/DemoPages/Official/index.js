import React, { useEffect, useReducer, useState } from 'react'
import { addOfficial, createStation, editStation, getOfficialList, getSaccoById, getStationList, toggleStationStatus, UpdateOfficial, UpdateOfficialStatus } from '../../Services/SaccoService'
import { useLocation } from "react-router-dom";
import AppHeader from '../../Layout/AppHeader';
import AppSidebar from '../../Layout/AppSidebar';
import { Button, Card, Col, Dropdown, DropdownButton, Form, FormGroup, Modal, Row, Table } from 'react-bootstrap';
import { CardBody, Input, Label } from 'reactstrap';
import { formReducer } from '../../Utils/globalFunctions';
import { toast } from 'react-toastify';
const Official = () => {
    const id = useLocation().pathname.split('/');
    const [list, setList] = useState([]);
    const [item, setItem] = useState({})
    const [editModal, setEditModal] = useState(false);
    const [officialModal, setOfficialModal] = useState(false);
    const [formData, setformData] = useReducer(formReducer, {});
    console.log('formData', id)

    const handleSubmit = () => {
        if (formData['designation']) {
            let temp = {
                saccoStationId: item?.saccoStationId,
                designation: formData['designation'],
                saccoOfficialId: item?.saccoOfficialId
            }
            UpdateOfficial(temp)
                .then(res => {
                    console.log(res)
                    if (res?.success) {
                        getOfficials();
                        setEditModal(false);
                    } else {
                        toast.error('Error Occured ,Please Try Again', {
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
        }
        if (formData['activate']) {
            let temp = {
                designation: formData['designation'],
                saccoOfficialId: item?.saccoOfficialId
            }
            UpdateOfficialStatus(temp)
            .then(res => {
                console.log(res)
                if (res?.success) {
                    getOfficials();
                    setEditModal(false);
                } else {
                    toast.error('Error Occured ,Please Try Again', {
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
        }
    }

    const CreateOfficial = () => {
        if (formData['designation']) {
            let temp = {
                saccoId: list?.saccoId,
                msisdn: list.user?.msisdn,
                designation: formData['designation'],
                saccoStationId: list?.saccoStationId
            }
            addOfficial(temp)
                .then(res => console.log(res))
                .catch(err => console.log(err))
        } else {
            toast.error('Please Enter Designation', {
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

    const getOfficials = () => {
        getOfficialList(id[2], id[3])
            .then(res => {
                console.log(res)
                setList(res.data.data)
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        getOfficials();
    }, [])

    return (
        <>
            <AppHeader />
            <div className="app-main">
                <AppSidebar />
                <div className="app-main__outer">
                    <div className="app-main__inner">
                        <Row>
                            <Col lg="12">
                                <Card className="main-card mb-3">
                                    <CardBody >
                                    <div className="w-100 mb-5">
                                        <Button style={{ width: '200px', float: "right" }} onClick={() => { setOfficialModal(true) }} color='info'>Create Official</Button>
                                    </div>
                                        <Table className="mb-0" bordered>
                                            <thead>
                                                <tr >
                                                    <th>Designation</th>
                                                    <th>Status</th>
                                                    <th>Sacco</th>
                                                    <th>Sacco Station</th>
                                                    <th>User FirstName</th>
                                                    <th>User LastName</th>
                                                    <th></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {list?.length > 0 &&
                                                    list?.map(item => (
                                                        <tr>
                                                            <td onClick={() => { window.location.href = `/#/official/${item?.saccoId}/${item?.saccoStationId}` }}>{item?.designation}</td>
                                                            <td onClick={() => { window.location.href = `/#/official/${item?.saccoId}/${item?.saccoStationId}` }}>{item?.isActive ? 'Active' : 'In active'}</td>
                                                            <td onClick={() => { window.location.href = `/#/official/${item?.saccoId}/${item?.saccoStationId}` }}>{item?.sacco?.name}</td>
                                                            <td onClick={() => { window.location.href = `/#/official/${item?.saccoId}/${item?.saccoStationId}` }}>{item?.saccoStation?.name}</td>
                                                            <td onClick={() => { window.location.href = `/#/official/${item?.saccoId}/${item?.saccoStationId}` }}>{item?.user?.firstName}</td>
                                                            <td onClick={() => { window.location.href = `/#/official/${item?.saccoId}/${item?.saccoStationId}` }}>{item?.user?.lastName}</td>
                                                            <td><Button onClick={() => { setItem(item); setEditModal(true) }} color='info'>Edit</Button></td>

                                                        </tr>
                                                    ))}
                                            </tbody>
                                        </Table>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                    </div>
                </div>
            </div>


            <Modal className='w-100' show={editModal} onHide={() => setEditModal(false)}>
                <Modal.Header>
                    <Modal.Title>Update Official</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form className='w-100'>
                        <FormGroup>
                            <Label>Status</Label>
                            <Form.Select name='activate' onChange={(e) => setformData(e)} size="lg">
                                <option>Select Status</option>
                                <option>Activate</option>
                                <option>Deactivate</option>
                            </Form.Select>
                        </FormGroup>
                        <FormGroup>
                            <Label>Designation</Label>
                            <Form.Select name='designation' onChange={(e) => setformData(e)} size="lg">
                                <option>Select Designation</option>
                                <option>Official</option>
                                <option>Agent</option>
                                <option>Clerk</option>
                                <option>Fuel</option>
                                <option>Station Manager</option>
                                <option>Parcel Agent</option>
                            </Form.Select>
                        </FormGroup>
                    </Form>
                </Modal.Body>

                <Modal.Footer>
                    <Button onClick={() => setEditModal(false)} variant="primary">Close</Button>
                    <Button onClick={() => handleSubmit()} variant="primary">Save</Button>
                </Modal.Footer>
            </Modal>

            <Modal className='w-100' show={officialModal} onHide={() => setOfficialModal(false)}>
                <Modal.Header>
                    <Modal.Title>Create Official</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form className='w-100'>
                        <FormGroup>
                            <Label>Designation</Label>
                            <Form.Select name='designation' onChange={(e) => setformData(e)} size="lg">
                                <option>Select Designation</option>
                                <option>Official</option>
                                <option>Agent</option>
                                <option>Clerk</option>
                                <option>Fuel</option>
                                <option>Station Manager</option>
                                <option>Parcel Agent</option>
                            </Form.Select>
                        </FormGroup>
                    </Form>
                </Modal.Body>

                <Modal.Footer>
                    <Button onClick={() => setOfficialModal(false)} variant="primary">Close</Button>
                    <Button onClick={() => CreateOfficial()} variant="primary">Save</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default Official