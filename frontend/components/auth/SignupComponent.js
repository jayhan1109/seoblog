import { useState } from "react";
import { signup } from "../../actions/auth";

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

  const handleSubmit = async e => {
    e.preventDefault();
    setValues({ ...values, loading: true, error: false });
    const user = { name, email, password };
    try {
      const res = await signup(user);
      
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
      
    } catch (err) {
      setValues({ ...values, error: err });
    }
  };
  const handleChange = name => e => {
    setValues({ ...values, error: false, [name]: e.target.value });
  };
  return (
    <React.Fragment>
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
    </React.Fragment>
  );
};

export default SignupComponent;
