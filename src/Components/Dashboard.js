import React, { useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import userContext from "../Context/Context";
import Catimage from "../image/Image.jpg"
import { useDispatch, useSelector } from "react-redux";
import { decrement, increment } from "../redux/features/count";

function Dashboard() {
  const countValue = useSelector((state)=>state.count.value)
  const dispatch = useDispatch()
  const value = useContext(userContext)
  const data = [
    {
      name:"Primary Card",
      color:"primary"
    },
    {
      name:"Secondary Card",
      color:"success"
    },
    {
      name:"Warning Card",
      color:'warning'
    },
    {
      name:"Danger Card",
      color:'danger'
    },
    
  ]
  // `${}` -template literals
  return (
    <>
      <div className="container">
        <h1>{value}<img src={Catimage} width={"100px"} height={"100px"}/></h1>
        <div className="row">
          {
            data.map((list)=>{
              return <div className="col-3">
              <div class={`card bg-${list.color}`}>
                <div class="card-header">{list.name}</div>
                <div class="card-body">
                  <a>View Details</a>
                </div>
              </div>
            </div>
            })
          }
        </div>
        <div>
          <Link to={'profile'}>
          <button className="btn btn-sm btn-outline-primary my-5">Profile</button>
          </Link>
          
        </div>
        <Outlet/>
        <div className="text-center">
        <button
          className="btn btn-sm btn-outline-danger m-4"
          onClick={()=>dispatch(decrement())}
        >
          -
        </button>
        {countValue}
        <button
          className="btn btn-sm btn-outline-primary m-4"
        onClick={()=>dispatch(increment())}
        >
          +
        </button>
      </div>
      </div>
    </>
  );
}

export default Dashboard;
