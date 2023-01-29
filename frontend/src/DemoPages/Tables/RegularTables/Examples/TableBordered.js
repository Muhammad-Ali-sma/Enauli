import React, { useReducer } from 'react';
import { useState } from 'react';
import { Modal, ToastContainer } from 'react-bootstrap';
import { Button, Card, CardBody, CardTitle, Col, Form, FormGroup, Input, Label, Table } from 'reactstrap';
import { UpdateSacco } from '../../../../Services/SaccoService';
import { formReducer } from '../../../../Utils/globalFunctions';

const TableList = ({ data }) => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setformData] = useReducer(formReducer, {});

  return (
    <>
     
    </>
  );
}

export default TableList;