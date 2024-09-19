import { useState} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login(){
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      const response = await axios.post("http://127.0.0.1:5000/login", {
        username: username, 
        password: password
      });
      if (response.status === 200) {
        localStorage.setItem("authToken", response.data.token);
        navigate("/user");
      }
    }
    // eslint-disable-next-line no-unused-vars
    catch(err){
      if (username === "" || password === "") {
        setError("Please fill in both fields");
        return;
      }
      setError(err.response.data.message);
    }
  }
  return (
    <div className=" container d-flex justify-content-center align-items-center " style={{ height: "100vh"}}>
      <div className="card p-4" style={{width: "400px"}}>
        <h3 className="text-center mb-4">Login</h3>
        <form onSubmit={handleSubmit}>
          {error && <div className="alert alert-danger">{error}</div>}
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input 
              type="text" 
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)} 
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input 
              type="password" 
              className="form-control" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button 
          className="btn text-light bg-primary bg-gradient btn-block mt-4">Submit</button>
        </form>
      </div>

    </div>
  );
}