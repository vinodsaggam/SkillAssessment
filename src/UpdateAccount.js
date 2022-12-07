import React, { useEffect, useState } from 'react'
import { Box, Button, CircularProgress, Divider, Grid, Stack, TextField, Typography } from '@mui/material'
import { Container } from '@mui/system'
import { useForm } from "react-hook-form"
import axios from "axios"
import { useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';


const UpdateAccount = () => {

    const [status, setStatus] = useState({
        loading: false,
        error: '',
        success: false
    })

    const [profile, setProfile] = useState(1)
    const [users, setUsers] = useState([])

    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('userInfo') !== null) {
            let data = localStorage.getItem('userInfo')

            setUsers(JSON.parse(data))

        } else {
            navigate('/')
        }
    }, [navigate])

    const handleSubmit = (e) => {

        e.preventDefault();
        setStatus((prev) => {
            return {
                ...prev,
                loading: true,
                error: ''
            }
        })
        try {

            let arr = [];

            Array.from(Array(profile)).map((item, index) => {
                let d = document.getElementById(`profile_${index}`)
                return arr.push(d.value)
            })

            users.profile = arr;


            localStorage.setItem("userInfo", JSON.stringify(users))

            setStatus((prev) => {
                return {
                    ...prev,
                    success: true,
                    loading: false,
                    error: ''
                }
            })
            setTimeout(() => {
                navigate('/')
            }, 1000)

            // If API provided

            //  axios.post('http://localhost:4001/login',data).then((res) => {

            //     setStatus((prev) => {
            //         return {
            //             ...prev,
            //             success: true,
            //             loading: false,
            //             error: ''
            //         }
            //     })

            //     localStorage.setItem("user", JSON.stringify(res.data))
            //     navigate('/')

            // }).catch((error) => {
            //     setStatus((prev) => {
            //         return {
            //             ...prev,
            //             error: error.response.data,
            //             success: false,
            //             loading: false
            //         }
            //     })
            //})
        } catch (error) {
            setStatus((prev) => {
                return {
                    ...prev,
                    error: error.message,
                    success: false,
                    loading: false
                }
            })
        }


    }

    const handleClick = () => {

        setProfile(profile + 1)
    }

    return (
        <header className='App-header'>
        <Container component="main" sx={{ width: '100%', maxWidth: 'fit-content', height: '100%' }}>

            <form onSubmit={(e) => handleSubmit(e)}>
            <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    margin: 'auto',
                    marginTop: '20px',
                    padding: '20px',
                    borderRadius: 5,
                    boxShadow: '5px 5px 10px 5px #ccc',
                    backgroundColor: "white",
                    ":hover": {
                        boxShadow: '10px 10px 20px #ccc'
                    }
                }}>

                    <Typography color={'secondary'} variant="h4" margin={2} sx={{ textDecoration: 'underline' }} >Update Account</Typography>

                    <Grid container spacing={4}>
                    <Grid item xs={12} sm={12}>
                        <TextField id='account_id' label="Account id" type="text" value={users.account_id || ''} onChange={(e) => setUsers(prev => { return { ...prev, account_id: e.target.value } })} variant='outlined' placeholder='Account id' margin='normal'></TextField>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField fullWidth id='first_name' label="First name" type="text" value={users.first_name || ''} onChange={(e) => setUsers(prev => { return { ...prev, first_name: e.target.value } })} variant='outlined' placeholder='First name' margin='normal'></TextField>

                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField fullWidth id='last_name' label="Last name" type="text" value={users.last_name || ''} onChange={(e) => setUsers(prev => { return { ...prev, last_name: e.target.value } })} variant='outlined' placeholder='Last name' margin='normal'></TextField>
                    </Grid>


                    <Grid item xs={12} sm={6}>
                        <TextField id='email_address' fullWidth label="Email address" value={users.email_address || ''} onChange={(e) => setUsers(prev => { return { ...prev, email_address: e.target.value } })} type="email" variant='outlined' placeholder='Email address' margin='normal'></TextField>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField fullWidth id='mobile_number' label="Mobile number" type="tel" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" value={users.mobile_number || ''} onChange={(e) => setUsers(prev => { return { ...prev, mobile_number: e.target.value } })}   variant='outlined' placeholder='Mobile Number' margin='normal'></TextField>
                    </Grid>

                    </Grid>
                    <Divider variant="middle" />
                    <Typography color={'secondary'} variant="h4" margin={2} >Add Profiles <Button onClick={handleClick} variant='contained' size='small' sx={{ borderRadius: 3 }} color='success'> <AddIcon /> </Button></Typography>

                    {
                        profile && Array.from(Array(profile)).map(((item, index) => {
                            return (
                                <Grid item xs={12} sm={12} key={index}>
                                    <TextField id={`profile_${index}`} label={`profile_${index}`}type="text" variant='outlined' margin='normal'></TextField>
                                </Grid>)
                        }))
                    }

                    {!status.loading && 
                    <>
                    <Stack spacing={2} direction="row" sx={{ alignItems: 'center', pt: 4, }}>
                <Button disabled={status.success} type="submit" variant='contained' sx={{  borderRadius: 3 }} color='warning'> Update </Button>
                <Button variant='contained' onClick={() => navigate('/')} sx={{ borderRadius: 3 }}  color='error'>Cancel</Button>
                </Stack>
                </>
                }
                    {status.loading && <CircularProgress sx={{ marginTop: 5 }} />}
                    {status.error !== '' &&
                        <Typography variant="h1" component="div" sx={{ textAlign: 'center', fontSize: '16px', p: 2, color: 'red' }}>{status.error}</Typography>}
                    {status.success &&
                        <Typography variant="h1" component="div" sx={{ textAlign: 'center', fontSize: '16px', p: 2, color: 'green' }}>updated successful, you will be navigated to home page...</Typography>}
                </Box>
            </form>
        </Container>
        </header>
    )
}

export default UpdateAccount;