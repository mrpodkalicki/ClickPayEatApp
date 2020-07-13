import React, {useContext} from 'react';
import { useHistory } from "react-router-dom";
import { Redirect } from 'react-router-dom';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Button  from '@material-ui/core/Button';
import { Formik, Form as FormikForm, Field as FormikField, ErrorMessage as FormikErrorMessage } from 'formik';
import * as Yup from "yup";
import styled, { css } from 'styled-components';
import {useSignInActions, useSignInState } from '../../store/sigIn'




const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            '& .btn': {
                width: 100,
                alignSelf: 'flex-end',
                margin: '10px 0 0 0'
            },
            '& .container': {
                display: 'flex',
                flexDirection: 'column',
                width: 220,
            }
        },
    }),
);

export const Form = styled(FormikForm)`
    width: 40%;
    display:flex;
    flex-direction:column;
`;

export const Field = styled(FormikField)`
    border: solid black 0.5px;
    border-radius: 5px;
    padding: 8px;
    margin: 4px
`;

export  const ErrorMessage = styled(FormikErrorMessage)`
    color: red;
    border: solid black ;
`;



const initialValues = {
    email: '',
    password: '',
};

interface LoginPerson {
    email: string,
    password: string
}

const signInSchema = Yup.object().shape({
    email: Yup.string()
        .email('Błędny e-mail')
        .required('Email jest wymagany'),
    password: Yup.string()
        .required('Hasło jest wymagane'),
});


const SignupSchema = Yup.object().shape({
    email: Yup.string()
        .email('Invalid email')
        .required('Required'),
    password: Yup.string()
        .min(5, 'Too Short!')
        .max(70, 'Too Long!')
        .required('Required'),
});

const Login = () => {
    const history = useHistory();
    const classes = useStyles();

    const  signInResponse = useSignInState();
    const {signIn,setSignInResponse } = useSignInActions();


    if(signInResponse.status === 'success'){
        return (
            <div>
                <Redirect to="/dashboard" />
            </div>
        )
    }if (signInResponse.status === 'loading'){
        return <p>logowanie</p>
    }else {
        return (
            <div className={classes.root}>
                <p>WELCOME TO CLIC PAY EAT </p>
                <Formik
                    initialValues={{
                        email: '',
                        password: ''
                    }}
                    validationSchema={SignupSchema}
                    onSubmit={
                        values => {
                            signIn(values)
                        }
                    }
                >
                    {({errors, touched, isSubmitting}) => (
                        <Form>
                            <Field name="email" type="email" label="E-mail" placeholder="email"/>
                            <ErrorMessage name="email"/>
                            <Field name="password" type="password" label="password" placeholder="password"/>
                            <ErrorMessage name="password"/>
                            <p >{signInResponse.status === 'failure' ? 'wrong email or password' : ''}</p>
                            <Button className={'btn'} variant="contained" color="primary" type="submit">Submit</Button>
                        </Form>
                    )}
                </Formik>
            </div>
        );
    }
}
export default Login;