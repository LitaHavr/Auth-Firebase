import React, {useRef, useState} from "react";
import {Container, Typography} from "@mui/material";
import {Button, Box} from '@mui/material';
import {Formik, Form, Field} from 'formik';
import {TextField} from 'formik-mui';
import * as yup from 'yup';
import {useAuth} from "../context/AuthContext"
import {Alert} from "@mui/material";
import {Link,useNavigate } from "react-router-dom";

const validationSchema = yup.object({
    email: yup
        .string('Enter your email')
        .email('Enter a valid email')
        .required('Email is required'),
});

const ForgotPassword = () => {

    const {resetPassword} = useAuth()
    const [error, setError] = useState('')
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate =  useNavigate()


    return (
        <>
            <Container>
                <Formik
                    initialValues={{
                        email: ''
                    }} onSubmit={async (values) => {
                    try {
                        setMessage('')
                        setError('')
                        setLoading(true)
                        // await login(values.email, values.password)
                        await resetPassword(values.email)
                        setMessage('Check your inbox for further instructions ')
                    } catch {
                        setError(" Failed to reset password ")
                    }
                    setLoading(false)
                }} validationSchema={validationSchema}>
                    {({
                          touched,
                          errors,
                          isSubmitting,
                          submitForm,
                          values,
                          setFieldTouched,
                          ...props
                      }) => (

                        <Form>
                            <Typography variant='h5'> Reset Password </Typography>
                            {error && <Alert severity="error">{error}</Alert>}
                            {message && <Alert severity="success">{message}</Alert>}
                            <Box margin={1}>
                                <Field
                                    component={TextField}
                                    name="email"
                                    type="email"
                                    label="Email"
                                />
                            </Box>
                            <Box margin={1}>
                                <Button
                                    sx={{margin: 1}}
                                    variant="contained"
                                    color="primary"
                                    disabled={loading}
                                    onClick={submitForm}
                                >
                                    Reset Password
                                </Button>
                            </Box>
                            <Typography>
                                Need an account ? <Link to='/login'> Log In</Link>
                            </Typography>
                        </Form>

                    )}
                </Formik>

            </Container>
        </>
    )
}

export default ForgotPassword