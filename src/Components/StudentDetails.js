import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function StudentDetails() {
  const params = useParams();
  const [studentDetails, setStudentDetails] = useState({});

  const fetchStudentdetails = () => {
    axios
      .get(`https://65e6a3dfd7f0758a76e8ab61.mockapi.io/student/${params.id}`)
      .then((res) => {
        setStudentDetails(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchStudentdetails();
  }, []);
  return (
    <div>
      <div class="card" style={{width: "18rem;"}}>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">{studentDetails.firstName} {studentDetails.lastName}</li>
          <li class="list-group-item">{studentDetails.email}</li>
          <li class="list-group-item">{studentDetails.mobile}</li>
          <li class="list-group-item">{studentDetails.location}</li>
          <li class="list-group-item">{studentDetails?.skill?.join()}</li>
        </ul>
      </div>
    </div>
  );
}

export default StudentDetails;
