import axios from "axios";
import { API } from "../config";

export const signup = async user => {
  const config = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  };  

  const body = JSON.stringify(user);
  try {
    const res = await axios.post(`${API}/signup`, body, config);    
    console.log(res);
    return res;
  } catch (err) {
    console.error(err);
  }
};
