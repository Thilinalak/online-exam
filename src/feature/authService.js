import axios from "axios";
import { toast } from "react-toastify";

//  Login user
const login = async (userData) => {
   await axios
    .post("http://localhost:5000/login", userData)
    .then((response) => {
      if (response.data.message) {
        console.log("ERRWEREEERR  Message");
        return response.data.message
      } else {
        localStorage.setItem('user', JSON.stringify(response.data))
        console.log("Found User");
        return response.data;
        // const userType = respose.data[0].user_type
        // if(userType === 'student'){
        // }else{
        // }
      }
    });
};

const authService = {
  login,
};

export default authService;
