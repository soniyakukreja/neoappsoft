import { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Spinner from "../UI/Spinner";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login(props) {
  const [loading, setLoading] = useState(false);

  var [formErrors, setformErrors] = useState({});
  var [errorMessage, setErrorMessage] = useState();
  var [successMessage, setSuccessMessage] = useState();

  var [user, setUser] = useState({});

  let getEmail = (event) => {
    setUser({
      ...user,
      email: event.target.value,
    });
  };
  let getPassword = (event) => {
    setUser({
      ...user,
      password: event.target.value,
    });
  };

  var validate = function (elm) {
    var errors = {};
    const reg =
      /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;

    if (!elm.email.value) {
      errors.email = "Email is Required";
    } else if (!reg.test(elm.email.value)) {
      errors.email = "Please enter valid email ";
    }

    if (!elm.password.value) {
      errors.password = "Password is Required";
    }

    var errorkeys = Object.keys(errors);
    if (errorkeys.length > 0) return errors;
    else return false;
  };

  let login = (e) => {
    e.preventDefault();
    var form = document.getElementById("login");
    var errors = validate(form.elements);

    if (errors) {
      setformErrors(errors);
    } else {
      setformErrors({});
      setLoading(true);
      if (user.email && user.password) {
        props.dispatch({
          type: "LOGIN",
          payload: user,
        });
        setLoading(false);
      } else {
        setErrorMessage("Validation Failed");
        setSuccessMessage("");
      }
    }
  };

  useEffect(() => {
    if (props?.token) {
      toast.configure();
      toast.success("You have successfully logged in!");
      props.history.push("/");
    }
  }, [props.token]);

  // useEffect(() => {
  //   setErrorMessage("")
  //   console.log('error in props changed',props.error)
  // }, [props.error])

  return loading ? (
    <Spinner />
  ) : (
    <div
      style={{ width: "50%", margin: "auto" }}
      className="col-md-6 container mt-3 mb-3"
    >
      <h2> Login Here ! </h2>
      <form id="login">
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            id="email"
            className="form-control"
            onChange={getEmail}
          ></input>
          {formErrors?.email && (
            <div className="form-error">
              {" "}
              <div>{formErrors.email}</div>
            </div>
          )}
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            id="password"
            className="form-control"
            onChange={getPassword}
          ></input>
          {formErrors?.password && (
            <div className="form-error">
              {" "}
              <div>{formErrors.password}</div>
            </div>
          )}
        </div>
        {/* {props?.error &&
            <div style={{ color: "red" }} className="text-center">
              Invalid credentials
                </div>
          } */}
        {errorMessage ? <div>{errorMessage}</div> : ""}
        {successMessage ? (
          <div style={{ color: "green" }} className="text-center">
            {successMessage}
          </div>
        ) : (
          ""
        )}
        <button
          className="btn text-light form-control text-center my-2"
          style={{ backgroundColor: "#043d76" }}
          onClick={login}
        >
          Login
        </button>
      </form>
      <div className="row">
        <div className="col-6">
          <Link to="/signup" style={{ float: "left" }}>
            New User? Click Here
          </Link>
        </div>
        <div className="col-6">
          <Link to="/forgotpass" style={{ float: "right" }}>
            Forgot password
          </Link>
        </div>
      </div>
    </div>
  );
}

Login = withRouter(Login);

export default connect((state, props) => {
  return {
    error: state?.islogginerror,
    token: state?.user?.token,
    isLogin: state?.isloggedin,
    loading: state?.loading,
  };
})(Login);
