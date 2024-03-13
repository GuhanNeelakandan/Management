import logo from "./logo.svg";
import "./App.css";
import Home from "./Components/Home";
import Dashboard from "./Components/Dashboard";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Pricing from "./Components/Pricing";
import Navbar from "./Components/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Contact from "./Components/Contact";
import Profile from "./Components/Profile";
import Hooks from "./Components/Hooks";
import Form from "./Components/Form";
import Studentlist from "./Components/Studentlist";
import { Toaster } from "react-hot-toast";
import StudentDetails from "./Components/StudentDetails";
import { UserProvider } from "./Context/Context";

const toastOptions = {
  className: '',
    duration: 5000,
    style: {
      background: '#363636',
      color: '#fff',
    },

    // Default options for specific types
    success: {
      duration: 3000,
      theme: {
        primary: 'green',
        secondary: 'black',
      },
    },
}
function App() {
  const data = { name: "Fita", place: "OMR" };
  //props --property -- we can transfer the data from parent to child component
  return (
    <>
      <BrowserRouter>
      <UserProvider value={"Fita"}>
      <Navbar />
        <Routes>
          <Route path="/" element={<Home  parentData={data}/>}/>
          <Route path="/dashboard" element={<Dashboard />}>
            <Route path="profile" element={<Profile/>}/>
          </Route>
          <Route path="/pricing" element={<Pricing />}/>
          <Route path="/contact" element={<Contact/>}/>
          <Route path="/hook" element={<Hooks/>}/>
          <Route path="/form" element={<Form/>}/>
          <Route path="/student" element={<Studentlist/>}/>
          <Route path="/student/detail/:id" element={<StudentDetails/>}/>
        </Routes>
        </UserProvider>
        <Toaster position="bottom-center" toastOptions={toastOptions}/>
      </BrowserRouter>
    </>
  );
}

export default App;
