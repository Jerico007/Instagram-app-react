import React,{useState,useContext} from 'react';
import userContext from '../Context/userContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginPage = () => {
    const [data,setData] = useState({email:"",password:""});

    const {setToken} = useContext(userContext);
    const navigate = useNavigate();
    function handelInput(e)
    {
        setData({...data,[e.target.name]:e.target.value})
    }
    
    //Function to handelSubmit
   async function handelSubmit(e)
    {
        e.preventDefault();

          try {
            const response= await axios.post("https://instagram-express-app.vercel.app/api/auth/login",{"email":data.email,"password":data.password});
            setToken(response.data.data.token);
            alert(response.data.message);
            localStorage.setItem("token" , response.data.data.token);
            setData({...data,email:"",password:""});
            navigate("/dashboard");
        } catch (error) {
            alert(error.response.data.message);
        }
    
    }

    return (
        <div className='LogInPage'>
            <form onSubmit={handelSubmit}  className='Form'>
                <input onInput={handelInput} value={data.email} type='email' name='email' placeholder='axy@gmail.com' required></input>
                <input onInput={handelInput} value={data.password} type='password' pattern='[0-9]{3}' name='password' placeholder='Enter password [0-9] of exact length 3' required ></input>
                <button type='submit'>Log In</button>
            </form>
            <button onClick={()=>{navigate("/")}}>SignUp</button>
        </div>
    );
}

export default LoginPage;
