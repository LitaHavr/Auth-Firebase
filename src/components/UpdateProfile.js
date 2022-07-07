import React, {useRef, useState} from "react";
import {Container, Typography} from "@mui/material";
import {Button, Box} from '@mui/material';
import {Formik, Form, Field} from 'formik';
import {TextField} from 'formik-mui';
import * as yup from 'yup';
import {useAuth} from "../context/AuthContext"
import {Alert} from "@mui/material";
import {Link, useNavigate} from "react-router-dom";


const validationSchema = yup.object({
    email: yup
        .string('Enter your email')
        .email('Enter a valid email')
        .required('Email is required'),
    password: yup
        .string('Enter your pass')
        .min(8, 'Weak password , min 8 symbols'),
    passwordConfirm: yup.string()
        .oneOf([yup.ref('password'), null], 'Passwords must match')

});

const UpdateProfile = () => {

    const {currentUser, updateEmail, updatePassword} = useAuth()
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
                    }} onSubmit={ (values) => {
                    const promises = []
                    setLoading(true)
                    setError("")
                    if (values.email !== currentUser.email) {
                        promises.push(updateEmail(values.email))
                    }
                    if (values.password) {
                        promises.push(updatePassword(values.password))

                    }
                    Promise.all(promises).then(() => {
                        navigate("/", {replace: true})
                    }).catch(() => {
                        setError("Failed to update profile ")
                    }).finally(() => {
                        setLoading(false)
                    })
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
                            <Typography variant='h5'> Update Profile </Typography>
                            {error && <Alert severity="error">{error}</Alert>}
                            <Box margin={1}>
                                <Field
                                    component={TextField}
                                    name="email"
                                    type="email"
                                    label="Email"
                                    placeholder={currentUser.email}
                                />
                            </Box>
                            <Box margin={1}>
                                <Field
                                    component={TextField}
                                    type="password"
                                    label="Password"
                                    name="password"
                                    placeholder="Leave blank to keep the same"
                                />
                            </Box>
                            <Box margin={1}>
                                <Field
                                    component={TextField}
                                    type="password"
                                    label="password Confirmation"
                                    name="passwordConfirm"
                                    placeholder="Leave blank to keep the same"
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
                                    Update
                                </Button>
                            </Box>
                            <Typography>
                                <Link to='/'>Cancel</Link>
                            </Typography>
                        </Form>

                    )}
                </Formik>
            </Container>
        </>
    )
}

export default UpdateProfile