import { useState, useEffect } from "react";
import { signup, isAuth } from "../../actions/auth";
import Router from "next/router";

const SignupComponent = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    loading: false,
    message: "",
    showForm: true
  });

  const { name, email, password, error, loading, message, showForm } = values;

  useEffect(()=>{
    if(isAuth()){
      Router.replace(`/`);
    }
  },[])

  const handleSubmit = async e => {
    e.preventDefault();
    setValues({ ...values, loading: true, error: false });
    const user = { name, email, password };
    const res = await   signup(user);
    if (res.error) {
      setValues({ ...values, error: res.error, loading: false });
    } else {
      setValues({
        ...values,
        name: "",
        email: "",
        password: "",
        error: "",
        loading: false,
        message: res.data.message,
        showForm: false
      });
    }
  };
  const handleChange = name => e => {
    setValues({ ...values, error: false, [name]: e.target.value });
  };
  const showLoading = () =>
    loading ? <div className="alert alert-info">Loading...</div> : "";
  const showError = () =>
    error ? <div className="alert alert-danger">{error}</div> : "";
  const showMessage = () =>
    message ? <div className="alert alert-info">{message}</div> : "";
  return (
    <React.Fragment>
      {showError()}
      {showLoading()}
      {showMessage()}
      {showForm && (
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              name="name"
              value={name}
              type="text"
              className="form-control"
              placeholder="Type your name"
              onChange={handleChange("name")}
            />
          </div>
          <div className="form-group">
            <input
              name="email"
              value={email}
              type="email"
              className="form-control"
              placeholder="Type your email"
              onChange={handleChange("email")}
            />
          </div>
          <div className="form-group">
            <input
              name="password"
              value={password}
              type="password"
              className="form-control"
              placeholder="Type your password"
              onChange={handleChange("password")}
            />
          </div>
          <div>
            <button className="btn btn-primary">Sign Up</button>
          </div>
        </form>
      )}
    </React.Fragment>
  );
};

export default SignupComponent;
