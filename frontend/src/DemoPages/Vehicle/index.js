import React, { useReducer } from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { Button, Form, FormGroup, Modal, Table } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { Card, CardBody, Col, Input, Label, Row } from 'reactstrap'
import AppHeader from '../../Layout/AppHeader'
import AppSidebar from '../../Layout/AppSidebar'
import { addOperator, createVehicle, getVehicleById, updateOperator, updateVehicle } from '../../Services/FleetService'
import { formReducer } from '../../Utils/globalFunctions'
import { useLocation } from "react-router-dom";
import { toast } from 'react-toastify'


const Vehicle = () => {
    const id = useLocation().pathname.split('/')[2];
    console.log('Vehicle', id)
    const [vehicleModal, setVehicleModal] = useState(false);
    const [formData, setformData] = useReducer(formReducer, {});
    const [data, setData] = useState([]);
    const [item, setItem] = useState({});
    const [editModal, setEditModal] = useState(false);
    const [createModal, setCreateModal] = useState(false);
    const [operatorModal, setOperatorModal] = useState(false);
    const [operatorEditModal, setOperatorEditModal] = useState(false);
    const user = useSelector(state => state.AuthReducer.user)

    console.log(item)
    const CreateVehicle = () => {
        if (formData['plateNumber'] && formData['fleetNumber'] && formData['seatingCapacity']) {
            let temp = {
                plateNumber: formData['plateNumber'],
                fleetNumber: formData['fleetNumber'],
                saccoId: id,
                seatingCapacity: formData['seatingCapacity']
            }
            console.log(temp)
            createVehicle(temp)
                .then(res => {
                    console.log(res)
                    if (res.success) {
                        getVehicles();
                        setCreateModal(false);
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
        } else {
            toast.error('Invalid Ceredentails!', {
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

    const UpdateVehicle = () => {
        let temp = {
            plateNumber: formData['plateNumber'] ? formData['plateNumber'] : item?.plateNumber,
            fleetNumber: formData['fleetNumber'] ? formData['fleetNumber'] : item?.fleetNumber,
            saccoId: item?.saccoId,
            seatingCapacity: formData['seatingCapacity'] ? formData['seatingCapacity'] : item?.seatingCapacity,
            vehicleId: item?.vehicleId
        }
        updateVehicle(temp)
            .then(res => {
                console.log('updateVehicle', res)
                if (res.success) {
                    getVehicles();
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
    const getVehicles = () => {
        getVehicleById(id)
            .then(res => {
                console.log(res)
                if (res.success) {
                    setData(res.data.data);
                }
            })
            .catch(err => console.log(err))
    }


    useEffect(() => {
        getVehicles()
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

                                    <CardBody>
                                        <div className="w-100 mb-5">
                                            <Button style={{ width: '200px', float: "right" }} onClick={() => setCreateModal(true)} color='info'>Create New Vehicle</Button>
                                        </div>
                                        <Table className="mb-0" bordered>
                                            <thead>
                                                <tr >
                                                    <th>Plate Number</th>
                                                    <th>Status</th>
                                                    <th>Primary Terminus</th>
                                                    <th>Secondary Terminus</th>
                                                    <th>Route</th>
                                                    <th>Sacco Name</th>
                                                    <th>Seating Capacity</th>
                                                    <th></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {data?.length > 0 && data?.map(item => (
                                                    <tr >
                                                        <td onClick={() => { window.location.href = `/#/operator/${item?.vehicleId}` }}>{item?.plateNumber}</td>
                                                        <td onClick={() => { window.location.href = `/#/operator/${item?.vehicleId}` }}>{item?.isActive ? 'Active' : 'In active'}</td>
                                                        <td onClick={() => { window.location.href = `/#/operator/${item?.vehicleId}` }}>{item?.primaryTerminus}</td>
                                                        <td onClick={() => { window.location.href = `/#/operator/${item?.vehicleId}` }}>{item?.secondaryTerminus}</td>
                                                        <td onClick={() => { window.location.href = `/#/operator/${item?.vehicleId}` }}>{item?.route}</td>
                                                        <td onClick={() => { window.location.href = `/#/operator/${item?.vehicleId}` }}>{item?.saccoName}</td>
                                                        <td onClick={() => { window.location.href = `/#/operator/${item?.vehicleId}` }}>{item?.seatingCapacity}</td>
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



            <Modal show={editModal}>
                <Modal.Header>
                    <Modal.Title>Edit Vehicle</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form className='w-100'>
                        <FormGroup>
                            <Label>Plate Number</Label>
                            <Input defaultValue={item?.plateNumber} onChange={(e) => setformData(e)} type="text" name="plateNumber" placeholder="Plate Number" />
                        </FormGroup>
                        <FormGroup>
                            <Label >Fleet Number</Label>
                            <Input defaultValue={item?.fleetNumber} onChange={(e) => setformData(e)} type="text" name="fleetNumber" placeholder="Fleet Number" />
                        </FormGroup>
                        <FormGroup>
                            <Label >Seating Capacity</Label>
                            <Input defaultValue={item?.seatingCapacity} onChange={(e) => setformData(e)} type="text" name="seatingCapacity" placeholder="seatingCapacity" />
                        </FormGroup>
                    </Form>
                </Modal.Body>

                <Modal.Footer>
                    <Button onClick={() => setEditModal(false)} variant="primary">Close</Button>
                    <Button onClick={() => UpdateVehicle()} variant="primary">Update</Button>
                </Modal.Footer>
            </Modal >

            <Modal show={createModal}>
                <Modal.Header>
                    <Modal.Title>Create New Vehicle</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form className='w-100'>
                        <FormGroup>
                            <Label>Plate Number</Label>
                            <Input onChange={(e) => setformData(e)} type="text" name="plateNumber" placeholder="Plate Number" />
                        </FormGroup>
                        <FormGroup>
                            <Label >Fleet Number</Label>
                            <Input onChange={(e) => setformData(e)} type="text" name="fleetNumber" placeholder="Fleet Number" />
                        </FormGroup>
                        <FormGroup>
                            <Label >Seating Capacity</Label>
                            <Input onChange={(e) => setformData(e)} type="text" name="seatingCapacity" placeholder="seatingCapacity" />
                        </FormGroup>
                    </Form>
                </Modal.Body>

                <Modal.Footer>
                    <Button onClick={() => setCreateModal(false)} variant="primary">Close</Button>
                    <Button onClick={() => CreateVehicle()} variant="primary">Create</Button>
                </Modal.Footer>
            </Modal >
        </>
    )
}

export default Vehicle