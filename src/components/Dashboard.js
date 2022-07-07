import React, {useState} from "react";
import {Alert, Box, Button, Paper, Typography} from "@mui/material";
import {Link, useNavigate} from "react-router-dom";
import {useAuth} from "../context/AuthContext";


const Dashboard = () => {

    const [error, setError] = useState('')
    const {currentUser, logout} = useAuth()
    const navigate = useNavigate()
    const handleLogout = async () => {
        setError('')
        try {
            await logout()
            navigate("/login", {replace: true})
        } catch {
            setError('Failed to Log Out')
        }
    }

    return (
        <>
            <Paper>
                <Box>
                    <Typography>Profile</Typography>
                    {error && <Alert severity="error">{error}</Alert>}
                    <Typography>Email:</Typography>
                    <Typography>{currentUser.email}</Typography>
                    <Link to='/update-profile'>Update Profile</Link>
                </Box>
                <Button variant="outlined" onClick={handleLogout}>
                    Log Out
                </Button>
            </Paper>
        </>
    )
}
export default Dashboard