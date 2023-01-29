import React, { useReducer } from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { Button, Form, FormGroup, Modal, Table } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { Card, CardBody, Col, Input, Label, Row } from 'reactstrap'
import AppHeader from '../../Layout/AppHeader'
import AppSidebar from '../../Layout/AppSidebar'
import { addOperator, createVehicle, GetOperators, getVehicleById, updateOperator, updateVehicle } from '../../Services/FleetService'
import { formReducer } from '../../Utils/globalFunctions'
import { useLocation } from "react-router-dom";
import { toast } from 'react-toastify'

const Operator = () => {
  const id = useLocation().pathname.split('/')[2];
  console.log('createOperator', id)
  const [vehicleModal, setVehicleModal] = useState(false);
  const [formData, setformData] = useReducer(formReducer, {});
  const [data, setData] = useState([]);
  const [item, setItem] = useState({});
  const [editModal, setEditModal] = useState(false);
  const [createModal, setCreateModal] = useState(false);
  const [operatorModal, setOperatorModal] = useState(false);
  const [operatorEditModal, setOperatorEditModal] = useState(false);
  const user = useSelector(state => state.AuthReducer.user)

  const createOperator = () => {
    if (formData['msisdn'] && formData['role']) {
      let temp = {
        msisdn: formData['msisdn'],
        vehicleId: id,
        role: [
          formData['role']
        ],
        firstName: formData['firstName'],
        middleName: formData['middleName'],
        lastName: formData['lastName'],
        accountNumber: formData['accountNumber'],
        bankName: formData['bankName'],
        bankBranch: formData['bankBranch'],
        bankCode: formData['bankCode']
      }
      addOperator(temp)
        .then(res => {
          console.log('addOperator', res)
          if (res.success) {
            getOperators();
            setOperatorModal(false);
            toast.success('Operator added successfully!', {
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
  console.log(user?.userId)
  const UpdateOperator = () => {
    let temp = {
      vehicleId: id,
      role: item?.role,
      activate: formData['activate'] ? formData['activate'] == 'Active' ? true : false : item?.isActive,
      userId: item?.user?.userId
    }
    updateOperator(temp)
      .then(res => {
        console.log('updateOperator',res)
        if (res?.success) {
          setOperatorEditModal(false);
          getOperators();
        }
      })
      .catch(err => console.log(err))
  }


  const getOperators = () => {
    GetOperators(id)
      .then(res => {
        console.log('getOperators', res)
        if (res?.success) {
          setData(res?.data?.data);
        }
      })
      .catch(e => console.log(e))
  }

  useEffect(() => {
    getOperators();
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
                      <Button style={{ width: '200px', float: "right" }} onClick={() => setOperatorModal(true)} color='info'>Create New Operator</Button>
                    </div>
                    <Table className="mb-0" bordered>
                      <thead>
                        <tr >
                          <th>Plate Number</th>
                          <th>Status</th>
                          <th>Fleet Number</th>
                          <th>Role</th>
                          <th>User First Name</th>
                          <th>User Last Name</th>
                          <th>Phone Number</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {data?.length > 0 && data?.map(item => (
                          <tr >
                            <td onClick={() => { }}>{item?.plateNumber}</td>
                            <td onClick={() => { }}>{item?.isActive ? 'Active' : 'In active'}</td>
                            <td onClick={() => { }}>{item?.fleetNumber}</td>
                            <td onClick={() => { }}>{item?.role}</td>
                            <td onClick={() => { }}>{item?.user?.firstName}</td>
                            <td onClick={() => { }}>{item?.user?.lastName}</td>
                            <td onClick={() => { }}>{item?.user?.msisdn}</td>
                            <td><Button onClick={() => { setItem(item); setOperatorEditModal(true) }} color='info'>Edit</Button></td>
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

      <Modal show={operatorModal}>
        <Modal.Header>
          <Modal.Title>Add Operator</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form className='w-100'>
            <FormGroup>
              <Label>Msisdn</Label>
              <Input onChange={(e) => setformData(e)} type="text" name="msisdn" placeholder="Msisdn" />
            </FormGroup>
            <FormGroup>
              <Label >Role</Label>
              <Input onChange={(e) => setformData(e)} type="text" name="role" placeholder="Role" />
            </FormGroup>
            <FormGroup>
              <Label >FirstName</Label>
              <Input onChange={(e) => setformData(e)} type="text" name="firstName" placeholder="First Name" />
            </FormGroup>
            <FormGroup>
              <Label >LastName</Label>
              <Input onChange={(e) => setformData(e)} type="text" name="lastName" placeholder="Last Name" />
            </FormGroup>
            <FormGroup>
              <Label >Middle Name</Label>
              <Input onChange={(e) => setformData(e)} type="text" name="middleName" placeholder="Middle Name" />
            </FormGroup>
            <FormGroup>
              <Label >Account Number</Label>
              <Input onChange={(e) => setformData(e)} type="text" name="accountNumber" placeholder="Account Number" />
            </FormGroup>
            <FormGroup>
              <Label >Bank Name</Label>
              <Input onChange={(e) => setformData(e)} type="text" name="bankName" placeholder="Bank Name" />
            </FormGroup>
            <FormGroup>
              <Label >Bank Branch</Label>
              <Input onChange={(e) => setformData(e)} type="text" name="bankBranch" placeholder="Bank Branch" />
            </FormGroup>
            <FormGroup>
              <Label >Bank Code</Label>
              <Input onChange={(e) => setformData(e)} type="text" name="bankCode" placeholder="Bank Code" />
            </FormGroup>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={() => setOperatorModal(false)} variant="primary">Close</Button>
          <Button onClick={() => createOperator()} variant="primary">Create</Button>
        </Modal.Footer>
      </Modal >

      <Modal show={operatorEditModal}>
        <Modal.Header>
          <Modal.Title>Update Operator</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form className='w-100'>
            <FormGroup>
              <Label>Status</Label>
              <Form.Select name='activate' onChange={(e) => setformData(e)} size="lg">
                <option>Select Status</option>
                <option>Activate</option>
                <option>De Activate</option>
              </Form.Select>
            </FormGroup>            
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={() => setOperatorEditModal(false)} variant="primary">Close</Button>
          <Button onClick={() => UpdateOperator()} variant="primary">Update</Button>
        </Modal.Footer>
      </Modal >



    </>
  )
}

export default Operator