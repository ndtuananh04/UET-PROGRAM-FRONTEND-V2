import './App.css';
import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { CDBSidebarFooter, CDBBox, CDBFooterLink, CDBBtn, CDBIcon, CDBContainer } from 'cdbreact';
import { getAccountName } from './components/AppContent';
import { getAuthToken, setAuthHeader } from './helpers/axios_helper';
import Buttons from './components/Buttons';
import Nav from '../node_modules/react-bootstrap/Nav';
import Navbar from '../node_modules/react-bootstrap/Navbar';
import NavDropdown from '../node_modules/react-bootstrap/NavDropdown';
import Image from '../node_modules/react-bootstrap/Image';
import HomePage from './views/Home';
import InfoPage from './views/Info';
import SubjectPage from './views/Subject';
import Faculty from './views/Faculty';
import Program from './views/Program';
import Classroom from './views/Classroom';
import Attendance from './views/Attendance';
import Mark from './views/Marks';
import Search from './views/Search';
import SearchSubjects from './views/SearchSubjects';
import Graduation from './views/Graduation';
import Header from './components/Header';
import AppContentWrapper from './components/AppContentWrapper';



// import SubjectList from './SubjectList';
// import StudentService from './service/Service'
// App.js


function App() {
  let account = window.localStorage.getItem('account_name');
  const navigate = useNavigate();
  const logout = () => {
    setAuthHeader(null);
    navigate('/');
    window.location.reload();
};

  return (
    <div>
    <Navbar fixed="top" expand="lg" className="bg-body-tertiary bgnv" bg="dark" data-bs-theme="dark">
      <Container>
      <div className="logo-and-title">
        <Image src="UET.png" className="App-logo" alt="logo" rounded width="35" />
        <Link to="/" className="navbar-brand mb-0 h1">UET PROGRAM</Link>
    </div>
        {/* {
          (getAuthToken() !== null && getAuthToken() !== "null") 
        
        } */}
        
        { getAuthToken() !== null && getAuthToken() !== "null" ?
  <>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />


      <NavDropdown title={account} id="basic-nav-dropdown" className="btn btn-secondary">
        <NavDropdown.Item as={Link} to="/info">Information</NavDropdown.Item>
        <NavDropdown.Item as={Link} to="/graduation">Graduation</NavDropdown.Item>
        <NavDropdown.Item as={Link} to="/subjects">Subjects</NavDropdown.Item>
        <NavDropdown.Divider />
        <div className="d-flex justify-content-center">
    <Button variant="dark" size="sm" onClick={logout}>Log out</Button>
  </div>
      </NavDropdown>

  </>
  : 

    <Nav className="d-flex ms-auto">
      <Link to="/login" className="nav-link btn btn-primary">Sign in</Link>
    </Nav>
}
        
      </Container>
    </Navbar>
    <Container fluid style={{ backgroundColor: '#6ea0cc' }} className="d-flex flex-column min-vh-100 bg">
    <Row className="flex-grow-1" style={{ marginLeft: '80px', marginRight: '80px' }}>
    <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/info" element={<InfoPage />} />
        <Route path="/subjects" element={<SubjectPage />} />
        <Route path="/faculties" element={<Faculty />} />
        <Route path="/programs" element={<Program />} />
        <Route path="/classrooms" element={<Classroom/>} />
        <Route path="/attendances" element={<Attendance/>} />
        <Route path="/marksubjects" element={<Mark/>} />
        <Route path="/searchid" element={<Search />} />
        <Route path="/searchSubject/:id/:id2" element={<SearchSubjects/>} />
        <Route path="/graduation" element={<Graduation/>} />
        <Route path="/login" element={<AppContentWrapper />} />
        <Route path="/register" element={<AppContentWrapper />} />
      </Routes>
      </Row>
      <CDBSidebarFooter style={{ backgroundColor: '#253b80' }} className="shadow">
      <CDBBox
        display="flex"
        justifyContent="between"
        alignItems="center"
        className="mx-auto py-4 flex-wrap"
        style={{ width: '80%' }}
      >
        <CDBBox display="flex" alignItems="center">
          <a href="/" className="d-flex align-items-center p-0 text-dark">
            <img
              alt="logo"
              src="db.png"
              width="40px"
            />
            <span className="ms-4 h5 mb-0 font-weight-bold">UET Program</span>
          </a>
          <small className="ms-2">&copy; Group 11, 2024. Committed to Nurturing Academic Success and Lifelong Learning</small>
        </CDBBox>
        <CDBBox display="flex">
        <a href="https://www.facebook.com/UET.VNUH" target="_blank" rel="noopener noreferrer">
          <CDBBtn flat color="dark" className="p-2">
            <CDBIcon fab icon="facebook-f" />
          </CDBBtn>
        </a>
        <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
          <CDBBtn flat color="dark" className="mx-3 p-2">
            <CDBIcon fab icon="twitter" />
          </CDBBtn>
        </a>
        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
          <CDBBtn flat color="dark" className="p-2">
            <CDBIcon fab icon="instagram" />
          </CDBBtn>
        </a>
        </CDBBox>
      </CDBBox>
    </CDBSidebarFooter>
    </Container>
    </div>
    
  );


}

export default App;
