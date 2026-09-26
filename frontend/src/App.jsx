import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/home";
import Navbar from "./components/navbar/navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";
import Login from "./pages/login/login";
import Layout from "./layout/layout";

const App = () => {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
        </Route>
        <Route path="/login" element={<Login />} />

      </Routes>


      <ToastContainer />

    </>
  )
}
export default App;