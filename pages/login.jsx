import { useState } from "react";
import axios from "axios";

const LoginPage = () => {

    const [credentials, setCredentials] = useState({
        email: '',
        password: ''
    })

    const handleChange = (e) => { 
        setCredentials({
            ...credentials,
            [e.target.name]:e.target.value
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(credentials)

        const response = await axios.post('/api/auth/login',credentials);
        console.log(response)
    }

  return (
    <div>
        <form onSubmit={handleSubmit}>
            <input type="email" placeholder="email" 
                name="email"
                onChange={handleChange}
            />    
            <input type="password" placeholder="password" 
                name="password"
                onChange={handleChange}
            />
            <button>Login</button>
        </form>
    </div>
  )
}

export default LoginPage