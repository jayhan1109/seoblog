import { useState } from "react";
import { signin, authenticate } from "../../actions/auth";
import Router from "next/router";

const SigninComponent = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    loading: false,
    message: "",
    showForm: true
  });

  const { email, password, error, loading, message, showForm } = values;

  const handleSubmit = async e => {
    e.preventDefault();
    setValues({ ...values, loading: true, error: false });
    const user = { email, password };
    const res = await signin(user);
    if (res.error) {
      setValues({ ...values, error: res.error, loading: false });
    } else {
      // save user token to cookie
      // save user info to localstorage
      // authenticate user
      authenticate(res.data,()=>{
        Router.push(`/`);
      })
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
            <button className="btn btn-primary">Sign In</button>
          </div>
        </form>
      )}
    </React.Fragment>
  );
};

export default SigninComponent;
