import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import swal from "sweetalert";
import { locationOption, skillOption } from "./Form";

function Studentlist() {
  const navigate = useNavigate();
  const [studentList, setStudentList] = useState([]);
  const [loading, setloading] = useState(true);
  const [isEdit, setIsEdit] = useState(false);
  const [editStudent,setEditStudent]= useState({})

  const fetchStudentlist = () => {
    axios
      .get("https://65e6a3dfd7f0758a76e8ab61.mockapi.io/student")
      .then((res) => {
        setStudentList(res.data);
        setloading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchStudentlist();
  }, []);

  const deleteStudent = (studentId) => {
    console.log(studentId);
  };

  const onDelete = (studentId) => {
    swal({
      title: "Are you sure?",
      text: "Are you sure that you want to delete this file?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        axios
          .delete(
            `https://65e6a3dfd7f0758a76e8ab61.mockapi.io/student/${studentId}`
          )
          .then((res) => {
            swal("Sucessfully deleted!", {
              icon: "success",
            });
            fetchStudentlist();
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        swal("Your imaginary file is safe!");
      }
    });
  };

  const onEdit = (data) => {
    setIsEdit(!isEdit);
    setEditStudent(data);
  };

  const handlechange = (e, name) => {
    let value = e.target.value;
    setEditStudent({ ...editStudent, [name]: value });
  };

  const editUpdate=()=>{
    console.log(editStudent);
    axios.put(`https://65e6a3dfd7f0758a76e8ab61.mockapi.io/student/${editStudent.id}`,editStudent).then((res)=>{
      console.log(res);
      setIsEdit(!isEdit)
      fetchStudentlist()
    }).catch((err)=>{
      console.log(err);
    })
  }

  return (
    <div className="container mt-5">
      {/* Table */}
      <div className="d-flex justify-content-between align-items-center">
        <div>
          <h1>Student List</h1>
        </div>
        <div>
          <button
            className="btn btn-sm btn-outline-primary"
            onClick={() => navigate("/form")}
          >
            Add +
          </button>
        </div>
      </div>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">S.no</th>
            <th scope="col">First Name</th>
            <th scope="col">Last Name</th>
            <th scope="col">Email</th>
            <th scope="col">Password</th>
            <th scope="col">mobile</th>
            <th scope="col">location</th>
            <th scope="col">Skill</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        {loading ? (
          <div className="text-center w-100">
            <div class="spinner-border text-primary" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <tbody>
            {studentList.map((list, index) => {
              return (
                <tr>
                  <th scope="row">{index + 1}</th>
                  <td>{list.firstName}</td>
                  <td>{list.lastName}</td>
                  <td>{list.email}</td>
                  <td>{list.password}</td>
                  <td>{list.mobile}</td>
                  <td>{list.location}</td>
                  <td>{list.skill.join()}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-outline-primary rounded"
                      onClick={() => navigate(`/student/detail/${list.id}`)}
                    >
                      <i class="fa fa-eye" aria-hidden="true"></i>
                    </button>
                    <button
                      className="btn btn-sm btn-outline-warning rounded"
                      onClick={() => onEdit(list)}
                    >
                      <i class="fa fa-pencil" aria-hidden="true"></i>
                    </button>
                    <button
                      className="btn btn-sm btn-outline-danger rounded"
                      onClick={() => onDelete(list.id)}
                    >
                      <i class="fa fa-trash" aria-hidden="true"></i>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        )}
      </table>
      <Modal isOpen={isEdit} toggle={() => setIsEdit(!isEdit)} size="lg" centered>
        <ModalHeader toggle={() => setIsEdit(!isEdit)}>
          Edit Student
        </ModalHeader>
        <ModalBody>
          <div className="container w-75 m-auto">
            <div className="row">
              <div className="col-6">
                <div class="mb-3">
                  <label for="exampleInputEmail1" class="form-label">
                    First Name
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="exampleInputEmail1"
                    maxLength={15}
                    value={editStudent.firstName}
                    onChange={(e) => handlechange(e, "firstName")}
                  />
                </div>
              </div>
              <div className="col-6">
                <div class="mb-3">
                  <label for="exampleInputEmail1" class="form-label">
                    last Name
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="exampleInputEmail1"
                    value={editStudent.lastName}
                    onChange={(e) => handlechange(e, "lastName")}
                  />
                </div>
              </div>
              <div className="col-6">
                <div class="mb-3">
                  <label for="exampleInputEmail1" class="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    class="form-control"
                    id="exampleInputEmail1"
                    value={editStudent.email}
                    onChange={(e) => handlechange(e, "email")}
                  />
                </div>
              </div>
              <div className="col-6">
                <div class="mb-3">
                  <label for="exampleInputEmail1" class="form-label">
                    Mobile
                  </label>
                  <input
                    type="tel"
                    class="form-control"
                    id="exampleInputEmail1"
                    value={editStudent.mobile}
                    onChange={(e) => handlechange(e, "mobile")}
                  />
                </div>
              </div>
              <div className="col-6">
                <div class="mb-3">
                  <label for="exampleInputEmail1" class="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    class="form-control"
                    id="exampleInputEmail1"
                    value={editStudent.password}
                    onChange={(e) => handlechange(e, "password")}
                  />
                </div>
              </div>
              <div className="col-6">
                <div className="mb-3">
                  <label for="exampleInputEmail1" class="form-label">
                    Location
                  </label>
                  <Select
                  options={locationOption}
                  value={locationOption.filter((op)=>op.value===editStudent.location)}//{label;"Chennai",value:"Chennai"}
                  onChange={(e) => setEditStudent({ ...editStudent, location: e.value })}
                  />
                </div>
              </div>
              <div className="col-6">
                <div className="mb-3">
                  <label for="exampleInputEmail1" class="form-label">
                    Skills
                  </label>
                  <Select
                    isMulti
                    options={skillOption}
                    value={skillOption.filter((op)=>{
                      return editStudent?.skill?.some((pt)=>pt===op.value)
                    })}
                    onChange={(e) => setEditStudent({...editStudent,skill:e.map((op)=>op.value)})}//[html,css,js,react]
                  />
                </div>
              </div>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <div>
            <button>Cancel</button>
            <button onClick={()=>editUpdate()}>Update</button>
          </div>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default Studentlist;
