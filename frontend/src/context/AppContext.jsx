import { createContext, useEffect, useState } from "react";

import axios from 'axios'
import { toast } from "react-toastify";

// create app context
export const AppContext = createContext()

// context provider function
const AppContextProvider = (props) => {


    const currency = '৳';

    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const [doctors,setDoctors] = useState([])

    // variable  in Object  (access any components)
    const value = {
        doctors,
        currency
    }

    const getDoctorsData = async () =>{

        try {

            const {data} = await axios.get(backendUrl + '/api/doctor/list')

            if (data.success) {
                setDoctors(data.doctors)
            }
            else{
                toast.error(data.message)
            }
             
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }

    }

    useEffect(()=>{
        getDoctorsData()
    },[])

    return(
        <AppContext.Provider value={value}>
           {props.children} 
        </AppContext.Provider>
    )

}

export default AppContextProvider