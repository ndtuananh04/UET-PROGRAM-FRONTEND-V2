import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useParams } from 'react-router-dom';
import { Container, Row, Col, Card, ListGroup, ListGroupItem } from 'react-bootstrap';
import { request, setAuthHeader } from '../helpers/axios_helper';
import { PaginationControl } from 'react-bootstrap-pagination-control';
import { FaUser, FaBirthdayCake, FaVenusMars, FaHome, FaPhone, FaSchool } from 'react-icons/fa';

export default function Info() {
  const [studentInfo, setStudentInfo] = useState([]);

    useEffect(() => {
      request(
        "GET",
          `info/student`,
        {}).then(
        (response) => {
          console.log(response.data)
          setStudentInfo(response.data)
        }).catch(
        (error) => {
            if (error.response.status === 401) {
                setAuthHeader(null);
            } else {
                this.setState({data: error.response.code})
            }
        }
    );
    },[])
    

    return (
      <div className="container pt-5">
        <br /> <br />
        <h1 class= "text-center" >Student Information</h1>
    <Row className="justify-content-md-center">
      <Col md="8">
        <Card style={{ backgroundColor: '#314ea6', color: '#04151a' }}>

          <Card.Body>
            <ListGroup variant="flush">
              <ListGroup.Item><FaUser /> <strong>Student ID:</strong> {studentInfo.studentId}</ListGroup.Item>
              <ListGroup.Item><FaUser /> <strong>Name:</strong> {studentInfo.name}</ListGroup.Item>
              <ListGroup.Item><FaBirthdayCake /> <strong>Date of Birth:</strong> {studentInfo.dateOfBirth}</ListGroup.Item>
              <ListGroup.Item><FaVenusMars /> <strong>Gender:</strong> {studentInfo.gender}</ListGroup.Item>
              <ListGroup.Item><FaHome /> <strong>Address:</strong> {studentInfo.address}</ListGroup.Item>
              <ListGroup.Item><FaPhone /> <strong>Phone:</strong> {studentInfo.phone}</ListGroup.Item>
              <ListGroup.Item><FaSchool /> <strong>Class:</strong> {studentInfo.classFullName}</ListGroup.Item>
            </ListGroup>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  </div>
        
    )
}
