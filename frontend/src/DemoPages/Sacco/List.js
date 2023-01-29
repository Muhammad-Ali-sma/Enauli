import React, { useReducer } from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { Button, Form, FormGroup, Modal, Table } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { Card, CardBody, Col, Input, Label, Row } from 'reactstrap'
import AppHeader from '../../Layout/AppHeader'
import AppSidebar from '../../Layout/AppSidebar'
import { createCharge, createSacco, getOfficialList, getSaccoList, UpdateSacco, updateSaccoStatus } from '../../Services/SaccoService'
import { formReducer } from '../../Utils/globalFunctions'

const List = () => {
    const [createModal, setCreateModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [chargeModal, setChargeModal] = useState(false);

    const [formData, setformData] = useReducer(formReducer, {});
    const [data, setData] = useState([]);
    const user = useSelector(state => state.AuthReducer.user);
    const [item, setItem] = useState({});

    const editSacco = () => {

        if (formData['activate']) {
            let temp = {
                id: item?.saccoId,
                activate: formData['activate'] == 'Activate' ? true : false
            }
            updateSaccoStatus(temp)
                .then(res => console.log('updateSaccoStatus', res))
                .catch(err => console.log(err))
        }
        let temp = {
            saccoId: item?.saccoId,
            pin: item?.pin,
            senderId: item?.senderId,
            name: formData['name'] ? formData['name'] : item?.name,
            address: formData['address'] ? formData['address'] : item?.address,
            contactPerson: formData['contactPerson'] ? formData['contactPerson'] : item?.contactPerson,
            contactNumber: formData['contactNumber'] ? formData['contactNumber'] : item?.contactNumber,
            postalAddress: formData['postalAddress'] ? formData['postalAddress'] : item?.postalAddress,
            tagline: item?.tagline
        }
        UpdateSacco(temp)
            .then(res => {
                console.log(res)
                if (res?.success) {
                    getList();
                    setEditModal(false);
                    setItem({});
                }
            })
            .catch(err => console.log(err))
    }

    const getList = () => {
        getSaccoList(10, 21)
            .then(res => {
                console.log('getSaccoList', res)
                if (res?.success) {
                    setData(res?.data);
                }
            })
            .catch(err => console.log(err))
    }
    console.log(user)
    const createNewSacco = () => {

        if (formData['code'] && formData['pin']) {

            if (formData['pin']?.length > 4) {
                toast.error('Pin must be of 4 numbers only!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            } else if (formData['code']?.length > 2) {
                toast.error('Code must be of 2 letters only!', {
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
                let temp = {
                    senderId: user?.idNumber,
                    ...formData
                }
                createSacco(temp)
                    .then(res => {
                        console.log(res)
                        if (res?.success) {
                            getList();
                            setCreateModal(false);
                            toast.success('Sacco Created Successfully', {
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
                            toast.error('Invalid ceredentials, please try again!', {
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
        } else {
            toast.error('Invalid Ceredentials!', {
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

    const handleCharge = () => {
        let temp = {
            saccoId: item?.saccoId,
            amount: formData['amount'],
            charge: "PlatformCharge",
            isPercentage: true,
            frequency: "PerTrip"
        }
        createCharge(temp)
            .then(res => {
                console.log(res)
                if (res?.success) {
                    setChargeModal(false);
                }
            })
            .catch(err => console.log(err))
    }


    useEffect(() => {
        getList();
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
                                            <Button style={{ width: '200px', float: "right" }} onClick={() => setCreateModal(true)} color='info'>Create New Sacco</Button>
                                        </div>
                                        <Table className="mb-0" bordered>
                                            <thead>
                                                <tr >
                                                    <th>Name</th>
                                                    <th>Status</th>
                                                    <th>Contact Person</th>
                                                    <th>Contact Number</th>
                                                    <th>Address</th>
                                                    <th>Postal Address</th>
                                                    <th></th>
                                                    <th></th>

                                                </tr>
                                            </thead>
                                            <tbody>
                                                {data?.map(item => (
                                                    <tr >
                                                        <td onClick={() => { window.location.href = `/#/stations/${item?.saccoId}` }}>{item?.name}</td>
                                                        <td onClick={() => { window.location.href = `/#/stations/${item?.saccoId}` }}>{item?.isActive ? 'Active' : 'In active'}</td>
                                                        <td onClick={() => { window.location.href = `/#/stations/${item?.saccoId}` }}>{item?.contactPerson}</td>
                                                        <td onClick={() => { window.location.href = `/#/stations/${item?.saccoId}` }}>{item?.contactNumber}</td>
                                                        <td onClick={() => { window.location.href = `/#/stations/${item?.saccoId}` }}>{item?.address}</td>
                                                        <td onClick={() => { window.location.href = `/#/stations/${item?.saccoId}` }}>{item?.postalAddress}</td>
                                                        <td><Button onClick={() => { setItem(item); setEditModal(true) }} color='info'>Edit</Button></td>
                                                        <td><Button onClick={() => { setItem(item); setChargeModal(true) }} color='info'>Charge</Button></td>
                                                        <td><Button onClick={() => { window.location.href = `/#/vehicle/${item?.saccoId}` }} color='info'>Vehicle</Button></td>
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



            <Modal show={createModal}>
                <Modal.Header>
                    <Modal.Title>Create New Sacco</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form className='w-100'>
                        <FormGroup>
                            <Label>Name</Label>
                            <Input onChange={(e) => setformData(e)} type="text" name="name" placeholder="Name" />
                        </FormGroup>
                        <FormGroup>
                            <Label >Address</Label>
                            <Input onChange={(e) => setformData(e)} type="text" name="address" placeholder="Address" />
                        </FormGroup>
                        <FormGroup>
                            <Label >Contact Person</Label>
                            <Input onChange={(e) => setformData(e)} type="text" name="contactPerson" placeholder="ContactPerson" />
                        </FormGroup>
                        <FormGroup>
                            <Label >Pin</Label>
                            <Input onChange={(e) => {
                                setformData(e)
                            }} type="text" name="pin" placeholder="Pin" />
                        </FormGroup>
                        <FormGroup>
                            <Label >Contact Number</Label>
                            <Input onChange={(e) => setformData(e)} type="text" name="contactNumber" placeholder="Contact Number" />
                        </FormGroup>
                        <FormGroup>
                            <Label >Postal Address</Label>
                            <Input onChange={(e) => setformData(e)} type="text" name="postalAddress" placeholder="Postal Address" />
                        </FormGroup>
                        <FormGroup>
                            <Label >Tag Line</Label>
                            <Input onChange={(e) => setformData(e)} type="text" name="tagline" placeholder="Tag Line" />
                        </FormGroup>
                        <FormGroup>
                            <Label >Code</Label>
                            <Input onChange={(e) => setformData(e)} type="text" name="code" placeholder="Code" />
                        </FormGroup>
                        <FormGroup>
                            <Label >Region</Label>
                            <Input onChange={(e) => setformData(e)} type="text" name="region" placeholder="Region" />
                        </FormGroup>
                        <FormGroup>
                            <Label >Primary Terminus</Label>
                            <Input onChange={(e) => setformData(e)} type="text" name="primaryTerminus" placeholder="Primary Terminus" />
                        </FormGroup>
                        <FormGroup>
                            <Label >Secondary Terminus</Label>
                            <Input onChange={(e) => setformData(e)} type="text" name="secondaryTerminus" placeholder="Secondary Terminus" />
                        </FormGroup>
                        <FormGroup>
                            <Label >Maximum Fare</Label>
                            <Input onChange={(e) => setformData(e)} type="number" name="maximumFare" placeholder="Maximum Fare" />
                        </FormGroup>

                        <FormGroup>
                            <Label >Platform Fee</Label>
                            <Input onChange={(e) => setformData(e)} type="number" name="platformFee" placeholder="Platform Fee" />
                        </FormGroup>
                    </Form>
                </Modal.Body>

                <Modal.Footer>
                    <Button onClick={() => setCreateModal(false)} variant="primary">Close</Button>
                    <Button onClick={createNewSacco} variant="primary">Create</Button>
                </Modal.Footer>
            </Modal >

            <Modal className='w-100' show={editModal} onHide={() => setEditModal(false)}>
                <Modal.Header>
                    <Modal.Title>Edit Sacco</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form className='w-100'>
                        <FormGroup>
                            <Label>Name</Label>
                            <Input onChange={(e) => setformData(e)} defaultValue={item?.name} type="text" name="name" placeholder="Name" />
                        </FormGroup>
                        <FormGroup>
                            <Label >Address</Label>
                            <Input onChange={(e) => setformData(e)} defaultValue={item?.address} type="text" name="address" placeholder="Address" />
                        </FormGroup>
                        <FormGroup>
                            <Label >Contact Person</Label>
                            <Input onChange={(e) => setformData(e)} defaultValue={item?.contactPerson} type="text" name="contactPerson" placeholder="ContactPerson" />
                        </FormGroup>
                        <FormGroup>
                            <Label >Contact Number</Label>
                            <Input onChange={(e) => setformData(e)} defaultValue={item?.contactNumber} type="text" name="contactNumber" placeholder="Contact Number" />
                        </FormGroup>
                        <FormGroup>
                            <Label >Postal Address</Label>
                            <Input onChange={(e) => setformData(e)} defaultValue={item?.postaladdress} type="text" name="postalAddress" placeholder="Postal Address" />
                        </FormGroup>
                        <FormGroup>
                            <Label>Status</Label>
                            <Form.Select name='activate' onChange={(e) => setformData(e)} size="lg">
                                <option>Select Status</option>
                                <option>Activate</option>
                                <option>Deactivate</option>
                            </Form.Select>
                        </FormGroup>
                    </Form>
                </Modal.Body>

                <Modal.Footer>
                    <Button onClick={() => setEditModal(false)} variant="primary">Close</Button>
                    <Button onClick={editSacco} variant="primary">Save Changes</Button>
                </Modal.Footer>
            </Modal>

            <Modal className='w-100' show={chargeModal} onHide={() => setChargeModal(false)}>
                <Modal.Header>
                    <Modal.Title>Create Charge</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form className='w-100'>
                        <FormGroup>
                            <Label>Amount</Label>
                            <Input onChange={(e) => setformData(e)} type="number" name="amount" placeholder="Amount" />
                        </FormGroup>
                    </Form>
                </Modal.Body>

                <Modal.Footer>
                    <Button onClick={() => setChargeModal(false)} variant="primary">Close</Button>
                    <Button onClick={handleCharge} variant="primary">Submit</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default List