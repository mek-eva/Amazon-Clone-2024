import axios from "axios";

const axiosInstance = axios.create({

  //local instance of firebase functions
  // baseURL: "http://127.0.0.1:5001/clone-3d490/us-central1/api",

  

  //deployed version of amazon server on render.com
 baseURL: "https://amazon-api-deploy-i6n2.onrender.com"

});

export {axiosInstance};