import React, { useContext, useState } from "react";
import userContext from "../Context/Context";
import { useDispatch, useSelector } from "react-redux";
import { decrement, increment } from "../redux/features/count";

function Hooks() {
  const countValue =useSelector((state)=>state.count.value)
  const dispatch= useDispatch()
  const value = useContext(userContext)
  const [count, setCount] = useState(0);
  const [show, setShow] = useState(false); //true
  const [name,setName]= useState('')
  return (
    <>
    <h1>{value}</h1>
      <div className="text-center">
        <button
          className="btn btn-sm btn-outline-danger m-4"
          onClick={() => setCount(count - 1)}
          disabled={count <= 0}
        >
          -
        </button>
        {count}
        <button
          className="btn btn-sm btn-outline-primary m-4"
          onClick={() => setCount(count + 1)}
          disabled={count >= 10}
        >
          +
        </button>
      </div>
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
      <div className="">
        <button
          className={
            show
              ? "btn btn-sm btn-outline-danger m-4"
              : "btn btn-sm btn-outline-primary m-4"
          }
          onClick={() => setShow(!show)}
        >
          {show ? "Hide" : "Show"}
        </button>
        {show ? (
          <p>
            Line 30:13: The href attribute requires a valid value to be
            accessible. Provide a valid, navigable address as the href value. If
            you cannot provide a valid href, but still need the element to
            resemble a link, use a button and change it with appropriate styles.
            Learn more:
            https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/HEAD/docs/rules/anchor-is-valid.md
            jsx-a11y/anchor-is-valid Line 35:13: The href attribute requires a
            valid value to be accessible. Provide a valid
          </p>
        ) : (
          ""
        )}
      </div>
      <div className="my-5">
        Name:{name}
            <div>
                <label>Name</label>
                <input placeholder="name" onChange={(event)=>setName(event.target.value)}/>
            </div>
      </div>
    </>
  );
}

export default Hooks;
