import { Typography } from '@mui/material';
import { Container, Stack } from '@mui/system';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import "./App.css"

const ViewAccount = () => {


    const navigate = useNavigate();
    const [users, setUsers] = useState([])



    useEffect(() => {

        if (localStorage.getItem('userInfo') !== null) {
            let data = localStorage.getItem('userInfo')

            setUsers(JSON.parse(data))
        } else {
            navigate('/')
        }


        // If API provided

        // let response = async () => {
        //     await axios.get('http://localhost:4001/users', {
        //         headers: {
        //             'x-access-token': userData.token
        //         }
        //     })
        //         .then((res) => {
        //             setUsers(res.data)
        //         })
        //         .catch((error) => {
        //             console.log(error)
        //         })
        // }

        // response();

    }, [navigate])


    console.log(users)

    return (
        <header className='App-header'>
        <Container component="main" sx={{ width: '100%', height: '100%' }}>
            <Stack spacing={'40%'} direction="row" sx={{ alignItems: 'baseline', pt: 2, margin: '15px' }}>
                <Link to='/'style={{color: 'black'}}>Back</Link>
                <Typography variant='h4' component='div' sx={{ margin: '5px', textDecoration: 'underline', color:"black" }}>User Details</Typography>
            </Stack>
            <section style={{ display: 'grid' }}>
                <table>
                    <tbody>
                        <tr>
                            <th>Account Id</th>
                            <th>First name</th>
                            <th>Last name</th>
                            <th>Email</th>
                            <th>Mobile number</th>
                            <th>Profile</th>
                        </tr>
                        {
                            <tr>
                                <td>{users.account_id}</td>
                                <td>{users.first_name}</td>
                                <td>{users.last_name}</td>
                                <td>{users.email_address}</td>
                                <td>{users.mobile_number}</td>
                                <td>
                                    {users?.profile && users.profile.map((item,index) => {
                                        return <li key={index}>{item}</li>
                                    })}
                                </td>
                            </tr>
                        }
                    </tbody>
                </table>
            </section>
        </Container>
        </header>
    )
}

export default ViewAccount