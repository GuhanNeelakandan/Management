import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Select from "react-select";

export const locationOption = [
  { label: "Chennai", value: "Chennai" },
  { label: "Kerala", value: "Kerala" },
  { label: "Andhara", value: "Andhara" },
  { label: "Karanataka", value: "Karanataka" },
];

export const skillOption = [
  {label:"HTML",value:"HTML"},
  {label:"CSS",value:"CSS"},
  {label:"Javascript",value:"Javascript"},
  {label:"React",value:"React"},
  {label:"Bootstrap",value:"Bootstrap"},

]

function Form() {
  const navigate = useNavigate()
  const [student, setStudent] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    password: "",
    location: "",
    skill:[]
  });

  const [studentList, setStudentList] = useState([]);

  const handlechange = (e, name) => {
    let value = e.target.value;
    setStudent({ ...student, [name]: value });
  };

  const handleSubmit = () => {
    if (student.firstName === "") {
      return toast.error("First Name Required");
    }
    if (student.firstName.length < 3) {
      return toast.error("min 3 words required");
    }
    if (student.lastName === "") {
      return toast.error("last Name Required");
    }
    if (student.email === "") {
      return toast.error("Email Required");
    }
    if (student.mobile === "") {
      return toast.error("Mobile Required");
    }
    if (student.password === "") {
      return toast.error("password Required");
    }

    axios.post("https://65e6a3dfd7f0758a76e8ab61.mockapi.io/student",student).then((res)=>{
      toast.success("Student Created")
     navigate('/student')
    }).catch((err)=>{
      console.log(err);
    })
    setStudentList([...studentList, student]);
    setStudent({
      firstName: "",
      lastName: "",
      email: "",
      mobile: "",
      password: "",
      location: "",
      skill:[]
    });
  };

  const deleteStudent = (index) => {
    studentList.splice(index, 1);
    setStudentList([...studentList]);
  };
//Self invovking  --- IIFE 
  useEffect(()=>{
    console.log("Iam useEffect");
  },[studentList])

  return (
    <div className="container w-75 m-auto">
      <h1>Create Data</h1>
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
              value={student.firstName}
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
              value={student.lastName}
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
              value={student.email}
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
              value={student.mobile}
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
              value={student.password}
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
              value={locationOption.filter((op)=>op.value===student.location)}//{label;"Chennai",value:"Chennai"}
              onChange={(e) => setStudent({ ...student, location: e.value })}
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
                return student.skill.some((pt)=>pt===op.value)
              })}
              onChange={(e) => setStudent({...student,skill:e.map((op)=>op.value)})}//[html,css,js,react]
            />
          </div>
        </div>
      </div>
      <div>
        <button
          className="btn btn-sm btn-outline-success"
          onClick={() => handleSubmit()}
        >
          Submit
        </button>
      </div>
      <div className="mt-5">
        {/* Table */}
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
                      className="btn btn-sm btn-outline-danger rounded"
                      onClick={() => deleteStudent(index)}
                    >
                      x
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Form;
