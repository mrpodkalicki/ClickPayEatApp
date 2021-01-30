import React, { useContext } from 'react';
import { useHistory } from "react-router-dom";
import { Redirect } from 'react-router-dom';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Formik, Form as FormikForm, Field as FormikField, ErrorMessage as FormikErrorMessage } from 'formik';
import * as Yup from "yup";
import styled, { css } from 'styled-components';
import { useSignInActions, useSignInState } from '../../../store/sigIn'




const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            height: '60vh',

            '&> p': {
                fontSize: '50px',
                alignSelf: 'felx-start',
                marginBottom: '8rem',

            },
            '& .btn': {
                display: 'inline-block',
                padding: '4px 10px 4px',
                margin: 0,
                fontSize: '13px',
                lineHeight: '18px',
                color: '#333333',
                textAlign: 'center',
                textShadow: '0 1px 1px rgba(255, 255, 255, 0.75)',
                verticalAlign: 'middle',
                backgroundColor: '#f5f5f5',
                backgroundImage: 'linear - gradient(top, #ffffff, #e6e6e6)',
                backgroundRepeat: 'repeat - x',
                filter: 'progid: dximagetransform.microsoft.gradient(startColorstr =#ffffff, endColorstr =#e6e6e6, GradientType = 0)',
                borderColor: '#e6e6e6 #e6e6e6 #e6e6e6',
                border: '1px solid #e6e6e6',
                borderRadius: '4px',
                boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 1px 2px rgba(0, 0, 0, 0.05)',
                cursor: 'pointer',
            },
            '& .btn:hover, .btn:active, .btn.active, .btn.disabled, .btn[disabled]': {
                backgroundColor: '#e6e6e6'
            },
            '& .btn-large': {
                padding: '9px 14px',
                fontSize: '15px',
                lineHeight: 'normal',
                borderRadius: '5px',
            },
            '& .btn:hover': {
                color: '#333333',
                textDecoration: 'none',
                backgroundColor: 'white',
                backgroundPosition: '0-15px',
                transition: 'backgroundPosition 0.1s linear',
            },
            '& .btn-primary, .btn-primary:hover': {
                textShadow: '0-1px 0 rgba(0, 0, 0, 0.25)',
                color: '#ffffff',
                backgroundColor: 'white',
            },
            '& .btn-primary.active': {
                color: 'rgba(255, 255, 255, 0.75)',
            },
            '& .btn-primary': {
                backgroundColor: '#4a77d4',
                backgroundImage: 'gradient(linear, 0 0, 0 100 %, from(#6eb6de), to(#4a77d4))',
                backgroundRepeat: 'repeat - x; filter: progid: dximagetransform.microsoft.gradient(startColorstr =#6eb6de, endColorstr =#4a77d4, GradientType = 0)',
                border: '1px solid #3762bc',
                textShadow: '1px 1px 1px rgba(0, 0, 0, 0.4)',
                boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 1px 2px rgba(0, 0, 0, 0.5)',
            },
            '& .btn-primary:hover, .btn-primary:active, .btn-primary.active, .btn-primary.disabled, .btn-primary[disabled]': {
                filter: 'none',
                backgroundColor: '#4a77d4',
            },
            '& .btn-block': {
                width: '100%',
                display: 'block',
            },
            '& .container': {
                display: 'flex',
                flexDirection: 'column',
                width: 220,
            },
            '& input': {
                width: '100',
                marginBottom: '10px',
                outline: 'none',
                padding: '10px',
                fontSize: '13px',
                color: '#000',
                border: '1px solid rgba(0, 0, 0, 0.3)',
                borderRadius: '4px',
                boxShadow: 'inset 0 - 5px 45px rgba(100, 100, 100, 0.2), 0 1px 1px rgba(255, 255, 255, 0.2)',
            },
            '& input: focus': {
                boxShadow: 'inset 0 - 5px 45px rgba(100, 100, 100, 0.4), 0 1px 1px rgba(255, 255, 255, 0.2)',
            },
        },
        errorMessageEmail: {
            color: 'red',
            textAlign: 'right',
            position: "absolute",
            right: '1rem',
            top: '14px'


        },
        errorMessagePassword: {
            color: 'red',
            textAlign: 'right',
            position: "absolute",
            right: '1rem',
            top: '4rem'
        },
        credentials: {
            color: 'red',
            position: 'absolute'
        }
    }),
);

export const Form = styled(FormikForm)`
    width: 30rem;
    height: 40rem;
    display:flex;
    flex-direction:column;
    position:relative;
`;

export const Field = styled(FormikField)`
    border: solid black 0.5px;
    border-radius: 5px;
    padding: 8px;
    margin: 4px
`;

export const ErrorMessage = styled(FormikErrorMessage)`
    color: red;
    border: solid black ;
`;

const SignInSchema = Yup.object().shape({
    email: Yup.string()
        .email('Invalid email')
        .required('Required'),
    password: Yup.string()
        .min(5, 'Too Short!')
        .max(70, 'Too Long!')
        .required('Required'),
});

const SignIn = () => {
    const history = useHistory();
    const classes = useStyles();

    const signInResponse = useSignInState();
    const { signIn, setSignInResponse } = useSignInActions();


    if (signInResponse.status === 'success') {
        return (
            <div>
                <Redirect to="/dashboard" />
            </div>
        )
    } if (signInResponse.status === 'loading') {
        return <p>logowanie</p>
    } else {
        return (
            <div className={classes.root}>
                <p>WELCOME CLIENT TO CLICK PAY EAT </p>
                <Formik
                    initialValues={{
                        email: '',
                        password: ''
                    }}
                    validationSchema={SignInSchema}
                    onSubmit={
                        values => {
                            signIn(values)
                        }
                    }
                >
                    {({ errors, touched, isSubmitting }) => (
                        <Form>
                            <Field name="email" type="email" label="E-mail" placeholder="email" />
                            <ErrorMessage name="email">{msg => <div className={classes.errorMessageEmail}>{msg}</div>}</ErrorMessage>
                            <Field name="password" type="password" label="password" placeholder="password" />
                            <ErrorMessage name="password">{msg => <div className={classes.errorMessagePassword}>{msg}</div>}</ErrorMessage>
                            <p className={classes.credentials}>{signInResponse.status === 'failure' ? 'wrong email or password' : ''}</p>
                            <Button className={'btn btn-primary btn-block btn-large'} variant="contained" color="primary" type="submit">Submit</Button>
                        </Form>
                    )}
                </Formik>
            </div>
        );
    }
}
export default SignIn;