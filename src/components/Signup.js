import React, {useRef, useState} from "react";
import {Container, Typography} from "@mui/material";
import {Button, Box} from '@mui/material';
import {Formik, Form, Field} from 'formik';
import {TextField} from 'formik-mui';
import * as yup from 'yup';
import {useAuth} from "../context/AuthContext"
import {Alert} from "@mui/material";
import {Link, useNavigate } from "react-router-dom";


const validationSchema = yup.object({
    email: yup
        .string('Enter your email')
        .email('Enter a valid email')
        .required('Email is required'),
    password: yup
        .string('Enter your pass')
        .min(8, 'Weak password , min 8 symbols')
        .required('pass is required'),
    passwordConfirm: yup.string()
        .oneOf([yup.ref('password'), null], 'Passwords must match')

});

const Signup = () => {

    const {signup} = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()




    return (
        <>
            <Container>
                <Formik
                    initialValues={{
                        email: '',
                        password: '',
                        passwordConfirm: ''
                    }} onSubmit={async (values) => {
                    try {
                        setError('')
                        setLoading(true)
                        await signup(values.email, values.password)
                        navigate("/",{replace:true})
                    } catch {
                        setError(" Failed to create an account")
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
                            <Typography variant='h5'> Sign Up </Typography>
                            {error && <Alert severity="error">{error}</Alert>}
                            <Box margin={1}>
                                <Field
                                    component={TextField}
                                    name="email"
                                    type="email"
                                    label="Email"
                                />
                            </Box>
                            <Box margin={1}>
                                <Field
                                    component={TextField}
                                    type="password"
                                    label="Password"
                                    name="password"
                                />
                            </Box>
                            <Box margin={1}>
                                <Field
                                    component={TextField}
                                    type="password"
                                    label="password Confirmation"
                                    name="passwordConfirm"
                                />
                            </Box>

                            <Box margin={1}>
                                <Button
                                    sx={{margin: 1}}
                                    variant="contained"
                                    color="primary"
                                    disabled={loading}
                                    onClick={submitForm }
                                >
                                    Sign Up
                                </Button>
                            </Box>

                            <Typography>
                                Already have an account ? <Link to='/login'>Log In</Link>
                            </Typography>
                        </Form>

                    )}
                </Formik>
            </Container>
        </>
    )
}

export default Signup