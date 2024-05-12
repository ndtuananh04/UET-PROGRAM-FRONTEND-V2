import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Form, FormControl, Button } from 'react-bootstrap';
import Select from 'react-select';
import { useParams } from 'react-router-dom';
import { request, setAuthHeader } from '../helpers/axios_helper';


export default function Subjects() {
  // const [searchTermId, setSearchTermId] = useState('');
  // const [searchTermProgram, setSearchTermProgram] = useState('');
  const [status, setStatus] = useState('');
  const [student, setStudent] = useState('');
  const [roleTypeList, setRoleTypeList] = useState([]);
  const [roleType, setRoleType] = useState('');
  const [subjectList, setSubjectList] = useState([]);
  const [program, setProgram] = useState([]);
  
  useEffect(() => {
    request(
      "GET",
      '/info/listrole',
      {}).then(
      (response) => {
        console.log(response.data)
        setRoleTypeList(response.data)
      }).catch(
      (error) => {
          if (error.response.status === 401) {
              // setAuthHeader(null);
          } else {
              this.setState({data: error.response.code})
          }
      }
    );
    request("GET", "/info/program", {})
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
        `/info/mark/${program[0].programCode}-${program[0].period}`,
        {}).then(
        (response) => {
          console.log(response.data)
          setSubjectList(response.data)
        }).catch(
        (error) => {
            if (error.response.status === 401) {
                // setAuthHeader(null);
            } else {
                this.setState({data: error.response.code})
            }
        }
      );
    }
  },[program])

  const handleSubmit = (event) => {
    event.preventDefault();
    // axios.get(`http://localhost:8080/myprogram/searchSubject/${id}/${id2}?status=${status}&roleType=${roleType}`)
    //         .then(response => {
    //         console.log(response.data)
    //         setSubjectList(response.data)
    //         })
    //         .catch(error => console.log(error));
    request(
        "GET",
        `/info/mark/${program[0].programCode}-${program[0].period}?status=${status}&roleType=${roleType}`,
        {}).then(
        (response) => {
          console.log(response.data)
          setSubjectList(response.data)
        }).catch(
        (error) => {
            if (error.response.status === 401) {
                // setAuthHeader(null);
            } else {
                this.setState({data: error.response.code})
            }
        }
      );
  };

  const groupedSubjects = {};
    subjectList.forEach(subject => {
      if (!groupedSubjects[subject.roleType]) {
        groupedSubjects[subject.roleType] = [];
      }
      groupedSubjects[subject.roleType].push(subject);
    });

  return (
    <div className="container pt-5">
    <br></br>
    <form onSubmit={handleSubmit}>
        <div className="form-group">
            <label>Status:</label>
            <Select 
                name="status"
                options={[{value: "finished", label: "finished"},{value: "unfinished", label: "unfinished"}]}
                placeholder='None Selected'
                onChange={e => setStatus(e.value)}
                className="form-control"
            >
            </Select><br></br>
        </div>
        <div className="form-group">
            <label>Role Type:</label>
            <Select 
                name="roleType"
                options={roleTypeList.map(t=>({value: t, label: t}))}
                placeholder='None Selected'
                onChange={e => setRoleType(e.value)}
                className="form-control"
            >
            </Select><br></br>
        </div>
      <br></br>
      <button type="submit" className='btn btn-primary'>Search</button>
      <br></br>
    </form>
      <table className="table table-hover">
        </table>
        <br></br>
            <h1 className="text-center">Program Subjects</h1>
            {Object.keys(groupedSubjects).map(roleType => (
            <div key={roleType}>
            <h2>{roleType}</h2>
            <table className="tabler">
              <thead>
                <tr className='table-primary trr'>
                  <th scope="col" className='thr' style={{ width: '600px' }}>SubjectName</th>
                  <th scope="col" className='thr' style={{ width: '150px' }}>Credit</th>
                  { 
                    subjectList[0].mark != null
                    ? <th scope="col" className='thr'>Mark</th> : <th scope="col" className='thr'>Prerequisite Subject</th>
                  }
                </tr>
              </thead >
              <tbody>
              {groupedSubjects[roleType].map((subject, idx) => (
                <tr key={idx}>
                  <td className='tdr'>{subject.subjectName}</td>
                  <td className='tdr'>{subject.credit}</td>
                  <td className='tdr'>
                    {
                      subject.mark!=null ? subject.mark : subject.prerequisiteSubjectId.join(", ")
                    }
                  
                  </td>
                </tr>
              ))}
              </tbody>
            </table>
            </div>
            ))}
    </div>
    
  )
}


