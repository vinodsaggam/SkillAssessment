import React, { useState } from 'react'
import { Box, Button, CircularProgress, Grid, Stack, TextField, Typography } from '@mui/material'
import { Container } from '@mui/system'
import { useForm } from "react-hook-form"
import axios from "axios"
import { useNavigate } from 'react-router-dom'

const CreateAccount = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();




    const [status, setStatus] = useState({
        loading: false,
        error: '',
        success: false,
        updateUser: null
    })

    const navigate = useNavigate();
    

    const onSubmit = async (data) => {

        setStatus((prev) => {
            return {
                ...prev,
                loading: true,
                error: ''
            }
        })

        // Saving it to local Storage
        try {
            localStorage.setItem('userInfo', JSON.stringify(data))
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
                    },1000)
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
        // If API provided

        // await axios.post('http://localhost:4001/register',data).then((res) => {
        //     setStatus((prev) => {
        //         return {
        //             ...prev,
        //             success: true,
        //             loading: false,
        //             error: ''
        //         }
        //     })

        //     setTimeout(() => {
        //         navigate('/login')
        //     },5000)

        // }).catch((error) => {
        //     setStatus((prev) => {
        //         return {
        //             ...prev,
        //             error: error.response.data,
        //             success: false,
        //             loading: false
        //         }
        //     })
        // })
        
    }

    return (
        <header className='App-header'>
        <Container component="main" sx={{ width: '100%', maxWidth: 'fit-content', height: '100%' }}>

            <form onSubmit={handleSubmit(onSubmit)}>
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
            
                    <Typography color={'secondary'} variant="h4" margin={2} sx={{ textDecoration: 'underline' }} >Create Account</Typography>
                    <Grid container spacing={4}>

                        <Grid item xs={12} sm={12}>
                            <TextField id='account_id' label="Account id" {...register("account_id", { required: "Account id is required" })}
                                aria-invalid={errors.account_id ? "true" : "false"} type="text" variant='outlined' placeholder='Account Id' margin='normal'></TextField>
                            {errors.account_id?.type === 'required' &&
                                <Typography variant="p" component="div" sx={{ textAlign: 'center', fontSize: '14px', pb: 2, color: 'red' }}>{errors.account_id.message}</Typography>}
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField fullWidth label="First name" id='first_name' {...register("first_name", { required: "First name is required" })}
                                aria-invalid={errors.first_name ? "true" : "false"} type="text" variant='outlined' placeholder='First name' margin='normal'></TextField>
                            {errors.first_name?.type === 'required' &&
                                <Typography variant="p" component="div" sx={{ textAlign: 'left', fontSize: '14px', pb: 2, color: 'red' }}>{errors.first_name.message}</Typography>}
                        </Grid>



                        <Grid item xs={12} sm={6}>
                            <TextField fullWidth id='last_name' label="Last name" {...register("last_name", { required: "Last name is required" })} type="text" variant='outlined' placeholder='Last name' margin='normal'></TextField>
                            {errors.last_name?.type === 'required' &&
                                <Typography variant="p" component="div" sx={{ textAlign: 'left', fontSize: '14px', pb: 2, color: 'red' }}>{errors.last_name.message}</Typography>}
                        </Grid>


                        <Grid item xs={12} sm={6}>
                            <TextField id='email_address' fullWidth label="Email Address" type="email" {...register("email_address", { required: "Email is required" })} variant='outlined' placeholder='Email address' margin='normal'></TextField>
                            {errors.email_address?.type === 'required' &&
                                <Typography variant="p" component="div" sx={{ textAlign: 'left', fontSize: '14px', pb: 2, color: 'red' }}>{errors.email_address.message}</Typography>}
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField fullWidth id='mobile_number' label="Mobile number" type="number" {...register("mobile_number", { required: "Invalid mobile number", maxLength: 10, minLength: 10 })} variant='outlined' placeholder='Mobile Number' margin='normal'></TextField>
                            {(errors.mobile_number?.type === 'required' || errors.mobile_number?.type === 'min') &&
                                <Typography variant="p" component="div" sx={{ textAlign: 'left', fontSize: '14px', pb: 2, color: 'red' }}>{errors.mobile_number.message}</Typography>}
                            {(errors.mobile_number?.type === 'maxLength' || errors.mobile_number?.type === 'minLength') &&
                                <Typography variant="p" component="div" sx={{ textAlign: 'left', fontSize: '14px', pb: 2, color: 'red' }}>Invalid mobile number</Typography>}
                        </Grid>


                    </Grid>
                    {!status.loading && <>
                        <Stack spacing={2} direction="row" sx={{ alignItems: 'center', pt: 4, }}>
                    <Button disabled={status.success} type='submit' variant='contained' sx={{  borderRadius: 3 }} color='warning'> Submit </Button>
                    <Button variant='contained' onClick={() => navigate('/')} sx={{ borderRadius: 3 }}  color='error'>Cancel</Button>
                    </Stack>
                    </>
                     }
                    {status.loading && <CircularProgress sx={{ marginTop: 5 }}  />}
                    {status.error !== '' &&
                 <Typography variant="h1" component="div" sx={{ textAlign: 'center', fontSize: '16px', p: 2, color: 'red' }}>{status.error}</Typography>}
                 {status.success &&
                 <Typography variant="h1" component="div" sx={{ textAlign: 'center', fontSize: '16px', p: 2, color: 'green' }}>Your registered successful, you will be navigated to home page...</Typography>}

                </Box>
            </form>
        </Container>
        </header>
    )
}

export default CreateAccount