import React, { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'


const Dashboard = () => {
    const router = useRouter();

    const [user, setUser] = useState({
        email: '',
        username: ''
    })

    const getProfile = async () => {
        const res = await axios.get('/api/profile')
        console.log(res)
        setUser(res.data)
    }

    const logout = async () => { 
        try {
            await axios.post('/api/auth/logout')
            router.push('/login')
        } catch (error) {
            console.log(error)
            router.push('/login')
        }
     
    }

  return (
    <div>
        <h1>Dashboard</h1>
        <pre>
            {JSON.stringify(user,null,2)}
        </pre>
        <button onClick={() => getProfile()}>
            Get Profile
        </button>

        <button onClick={logout}>Logout</button>
    </div>
  )
}

export default Dashboard