import "react-toastify/dist/ReactToastify.css";

import Form from "./components/Form/Form";
import { Fragment } from "react";
import { ToastContainer } from "react-toastify";
import Users from "./components/Users/Users";

function App() {
  return (
    <Fragment>
      <Form />
      <Users />
      <ToastContainer />
    </Fragment>
  );
}

export default App;
