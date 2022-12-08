import React, { useEffect, useState } from 'react'
import { Button, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { useNavigate } from "react-router-dom"


const Home = () => {


    const navigate = useNavigate();


    const userLogin = localStorage.getItem('userInfo')
    let Data = userLogin ? JSON.parse(userLogin) : '';
    const [userData, setUserData] = useState(Data)


    const handleDelete = () => {
        localStorage.clear();
        setUserData('')
        alert("User Account Deleted Successfully")
    }

    useEffect(() => {


    }, [userData])


    return (
        <header className='App-header'>

            <Typography variant='h2' component='div' >
                Welcome
            </Typography>

            <Typography variant='h4' component='div'>
                {userData.first_name} {userData.last_name}
            </Typography>
            <Stack spacing={2} direction="row" sx={{ alignItems: 'center', pt: 2, width: '100%', justifyContent: 'center' }}>
                {userData === '' && <Button onClick={() => navigate('/create')} variant='contained' sx={{ borderRadius: 3 }} color='success'> Create Account </Button>}
                {userData !== '' && <Button onClick={() => navigate('/update')} variant='contained' sx={{ borderRadius: 3 }} color='warning'> Update Account </Button>}
                {userData !== '' && <Button onClick={() => navigate('/view')} variant='contained' sx={{ borderRadius: 3 }} color='warning'> View Account </Button>}
                {userData !== '' && <Button onClick={handleDelete} variant='contained' sx={{ borderRadius: 3 }} color='warning'> Delete Account </Button>}
            </Stack>

        </header>
    )
}

export default Home