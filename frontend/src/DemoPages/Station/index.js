import React, { useEffect, useReducer, useState } from 'react'
import { addOfficial, createStation, editStation, getSaccoById, getStationList, toggleStationStatus } from '../../Services/SaccoService'
import { useLocation } from "react-router-dom";
import AppHeader from '../../Layout/AppHeader';
import AppSidebar from '../../Layout/AppSidebar';
import { Button, Card, Col, Dropdown, DropdownButton, Form, FormGroup, Modal, Row, Table } from 'react-bootstrap';
import { CardBody, Input, Label } from 'reactstrap';
import { formReducer } from '../../Utils/globalFunctions';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

const Station = () => {
    const id = useLocation().pathname.split('/')[2];
    const [item, setItem] = useState({});
    const [list, setList] = useState([]);

    const [editModal, setEditModal] = useState(false);
    const [createModal, setCreateModal] = useState(false);
    const [formData, setformData] = useReducer(formReducer, {});
    const user = useSelector(state => state.AuthReducer.user);

    const handleSubmit = () => {
        console.log(formData)

        if (formData['isActive']) {
            let temp = {
                activate: formData['isActive'],
                id: item?.saccoStationId
            }
            toggleStationStatus(temp)
                .then(res => console.log(res))
                .catch(err => console.log(err))
        }
        let temp = {
            saccoStationId: item?.saccoStationId,
            saccoId: item?.saccoId,
            name: formData['name'] ? formData['name'] : item?.name,
            phoneNumber: formData['phoneNumber'] ? formData['phoneNumber'] : item?.phoneNumber
        }
        editStation(temp)
            .then(res => {
                if (res.success) {
                    setEditModal(false);
                    toast.success('Updated Successfully', {
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

    const CreateNewStation = () => {
        console.log(formData)
        if (formData['name'] && formData['phoneNumber']) {
            let temp = {
                saccoId: id,
                stations: [
                    {
                        name: formData['name'],
                        phoneNumber: formData['phoneNumber']
                    }]

            }
            createStation(temp)
                .then(res => {
                    console.log(res)
                    if (res.success) {
                        getStations();
                        setCreateModal(false);
                        toast.success('Updated Successfully', {
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
                        toast.error('Invalid Ceredentials ,Please Try Again', {
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

   
    const getStations = () => {
        getStationList(id)
            .then(res => {
                console.log(res)
                setList(res.data.data)
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        getStations();
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
                                        <Button style={{ width: '200px', float: "right" }} onClick={() => { setCreateModal(true) }} color='info'>Create New Sacco Station</Button>
                                    </div>
                                        <Table className="mb-0" bordered>
                                            <thead>
                                                <tr >
                                                    <th>Name</th>
                                                    <th>Status</th>
                                                    <th>Contact Number</th>
                                                    <th></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {list?.map(item => (
                                                    <tr>
                                                        <td onClick={() => { window.location.href = `/#/official/${item?.saccoId}/${item?.saccoStationId}` }}>{item?.name}</td>
                                                        <td onClick={() => { window.location.href = `/#/official/${item?.saccoId}/${item?.saccoStationId}` }}>{item?.isActive ? 'Active' : 'In active'}</td>
                                                        <td onClick={() => { window.location.href = `/#/official/${item?.saccoId}/${item?.saccoStationId}` }}>{item?.phoneNumber}</td>
                                                        <td><Button onClick={() => { setItem(item); setEditModal(true) }} color='info'>Edit</Button></td>
                                                        {/* <td></td> */}

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
                    <Modal.Title>Edit Sacco Station</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form className='w-100'>
                        <FormGroup>
                            <Label>Name</Label>
                            <Input defaultValue={item?.name} onChange={(e) => setformData(e)} type="text" name="name" placeholder="Name" />
                        </FormGroup>
                        <FormGroup>
                            <Label>Phone Number</Label>
                            <Input defaultValue={item?.phoneNumber} onChange={(e) => setformData(e)} type="text" name="phoneNumber" placeholder="Phone Number" />
                        </FormGroup>
                        <FormGroup>
                            <Label>Status</Label>
                            <Form.Select name='isActive' onChange={(e) => setformData(e)} size="lg">
                                <option>Select Status</option>
                                <option>Activate</option>
                                <option>De Activate</option>
                            </Form.Select>
                        </FormGroup>
                    </Form>
                </Modal.Body>

                <Modal.Footer>
                    <Button onClick={() => setEditModal(false)} variant="primary">Close</Button>
                    <Button onClick={handleSubmit} variant="primary">Save Changes</Button>
                </Modal.Footer>
            </Modal>

            <Modal className='w-100' show={createModal} onHide={() => setCreateModal(false)}>
                <Modal.Header>
                    <Modal.Title>Create Sacco Station</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form className='w-100'>
                        <FormGroup>
                            <Label>Name</Label>
                            <Input onChange={(e) => setformData(e)} type="text" name="name" placeholder="Name" />
                        </FormGroup>
                        <FormGroup>
                            <Label>Phone Number</Label>
                            <Input onChange={(e) => setformData(e)} type="text" name="phoneNumber" placeholder="Phone Number" />
                        </FormGroup>
                    </Form>
                </Modal.Body>

                <Modal.Footer>
                    <Button onClick={() => setCreateModal(false)} variant="primary">Close</Button>
                    <Button onClick={() => CreateNewStation()} variant="primary">Save</Button>
                </Modal.Footer>
            </Modal>



        </>
    )
}

export default Station