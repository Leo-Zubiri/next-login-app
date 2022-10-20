import React, { useState } from 'react'
import axios from 'axios'

const Dashboard = () => {

    const [user, setUser] = useState({
        email: '',
        username: ''
    })

    const getProfile = async () => {
        const res = await axios.get('/api/profile')
        console.log(res)
        setUser(res.data)
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
    </div>
  )
}

export default Dashboard