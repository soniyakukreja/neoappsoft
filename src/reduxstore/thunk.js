import axios from "axios"
import { toast } from 'react-toastify';    
import 'react-toastify/dist/ReactToastify.css';  
const api_base  = process.env.REACT_APP_BASE_URL

//const INIT_USER = "INIT_USER";
export const ForgotPassThunk = (data) => {
    return (dispatch) => {
        axios({
            url: api_base+"recoverpassword",
            method: "post",
            data: data
        }).then((response) => {
            if (response.data.message) {
                dispatch({
                    type: "FORGOT_SUCCESS",
                    payload: response.data.message
                });
                alert(response.data.message)
            }
            if (response.data.errorMessage) {
                alert(response.data.errorMessage)
            }
        }, (error) => {
            //   setErrorMessage("Error from Login api "+error) 
            //   setSuccessMessage("") 
        })
    };
};

export const signupThunk = (data) => {
    return (dispatch,getState) => {
        let apiurl = api_base+"register"
        toast.configure()
        axios({
            url: apiurl,
            method: "post",
            data: data
        }).then((response) => {
            const str1= "User Already Exists"
            if(str1.localeCompare(response.data.message)===0){
                toast.error(response.data.message)
            }else{
                document.getElementById("signupform").reset()
                toast.success(`You have signed in successfully.
                Please check your email address to verify your accounts`)
            }
        }, (error) => {
            toast.error("Signup Failed due to some internal error")
            console.log(error)
        })
    }
}

// export function abc() {
//     return (dispatch, getState) => {
//         //Kuch check krne ke baad
//         var state = getState()
//         dispatch({
//             type: "HELLO"

//         })
//     }
// }