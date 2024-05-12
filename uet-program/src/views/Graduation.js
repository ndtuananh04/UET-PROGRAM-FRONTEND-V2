import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useParams } from 'react-router-dom';
import { Container, Row, Col, Card, ListGroup, ListGroupItem } from 'react-bootstrap';
import { request, setAuthHeader } from '../helpers/axios_helper';
// import 'bootstrap-icons/font/bootstrap-icons.css';
import { FaClock, FaGraduationCap, FaCheckCircle, FaRegCheckCircle, FaPlusCircle } from 'react-icons/fa';

export default function Graduation() {
    const [data, setData] = useState({});
    const [program, setProgram] = useState([]);

    useEffect(() => {
      request("GET", "info/program", {})
          .then(response => {
              console.log(response.data);
              setProgram(response.data);
          })
          .catch(error => {
              console.error("Error fetching program data:", error);
          });
  }, []);

  useEffect(() => {  
    if (program[0]) {
      request(
              "GET",
              `info/graduation/${program[0].programCode}-${program[0].period}`,
              {}
          )
              .then(response => {
                console.log(response.data);
                  setData(response.data);
              })
              .catch(error => {
                  console.error("Error fetching graduation data:", error);
              });
      }
  }, [program]);

    return (
        <div className="container pt-5">
          <br/>
          <h1 class= "text-center" >Graduation Status</h1>
          <Card style={{ backgroundColor: '#76a0e8', color: '#04151a' }}>

          <Card.Body>
            <Card.Text>
              <strong> Condition Duration:</strong> {data.conditionDuration}
            </Card.Text>
            <ListGroup >
              <ListGroupItem style={{ backgroundColor: '#9eadf0', color: '#04151a' }}>
                <strong>Number of Credits:</strong> {data.numberCredit}
              </ListGroupItem>
              <ListGroupItem style={{ backgroundColor: '#9eadf0', color: '#04151a' }}>
                <strong>Completed Mandatory Credits:</strong> {data.completedMandatory}
              </ListGroupItem>
              <ListGroupItem style={{ backgroundColor: '#9eadf0', color: '#04151a' }}>
                <strong>Completed Optional Credits:</strong> {data.completedOptional}
              </ListGroupItem>
              <ListGroupItem style={{ backgroundColor: '#9eadf0', color: '#04151a' }}>
                <strong>Completed Optional Reinforcement Credits:</strong> {data.completedOptionalReinforcement}
              </ListGroupItem>
              <ListGroupItem style={{ backgroundColor: '#9eadf0', color: '#04151a' }}>
                <strong>Completed Physical Credits:</strong> {data.completedPhysical}
              </ListGroupItem>
              <ListGroupItem style={{ backgroundColor: '#9eadf0', color: '#04151a' }}>
                <strong>Completed National Defense Credits:</strong> {data.completedNationalDefense}
              </ListGroupItem>
              <ListGroupItem style={{ backgroundColor: '#9eadf0', color: '#04151a' }}>
                <strong>Completed Additional Credits:</strong> {data.completedAdditional}
              </ListGroupItem>
              <ListGroupItem style={{ backgroundColor: '#9eadf0', color: '#04151a' }}>
                <strong>Completed Graduation Internship Credits:</strong> {data.completedGraduationInternship}
              </ListGroupItem>
            </ListGroup>
            <br></br>
            <Card.Text>
              <strong> Current GPA:</strong> {data.gpaCondition}
            </Card.Text>
            <Card.Text>
                <strong>Language Certificates:</strong> {data.enoughCert ? 'Completed' : 'None'}
            </Card.Text>
            <Card.Text>
              <strong>Graduation Status:</strong> {data.graduation ? <i class="bi-check-lg"></i> : <i class="bi-x-lg"></i>}
            </Card.Text>
          </Card.Body>
          </Card>
          <br></br>
        </div>
        
      );
}