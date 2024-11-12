import axios from 'axios';
import { apiBaseUrl } from '../utils/constants';
import toast from "react-hot-toast";

const callAPI = async (method, url, data, headers={}) => {
  try {
    const options = {
      method,
      url: `${apiBaseUrl}${url}`,
      headers: {
        ...headers,
      },
    };

    if (method === 'POST' || method === 'PUT' || method === 'PATCH') {
      options.data = data;
    }
   

    const response = await axios(options);
    //console.log("response data from axios call",response.data)
    if(response?.data?.message){
      toast.success(response?.data?.message)
    }
    
    return response?.data;
    
    
  } catch (error) {
     toast.error(error.message);
    throw error;
    
  }
};