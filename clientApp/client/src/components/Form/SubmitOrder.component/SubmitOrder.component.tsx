import React, {useEffect, useState} from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Button  from '@material-ui/core/Button';
import { Formik, Form as FormikForm, Field as FormikField, ErrorMessage as FormikErrorMessage } from 'formik';
import * as Yup from "yup";
import styled, { css } from 'styled-components';
import {useOrderState, usePostOrder} from "../../../store/order";

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
    width: 40vw;
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



const submitOrderSchema = Yup.object().shape({
    name: Yup.string()
        .min(2, 'Too Short!')
        .max(70, 'Too Long!')
        .required('Required'),
    surname: Yup.string()
        .min(2, 'Too Short!')
        .max(70, 'Too Long!')
        .required('Required'),
    phoneNumber: Yup.number()
        .min(6, 'Too Short!')
        .positive('age must be greater than zero')
        .required('Required')
        .typeError('phoneNumber must be a number'),
    deliveryAddress: Yup.string()
        .min(5, 'Too Short!')
        .max(70, 'Too Long!')
        .required('Required'),
});


const SubmitOrder = (props: any) => {
    const classes = useStyles();
    const {postOrderRequest} = usePostOrder();
    const  orderState = useOrderState();
    
    if (orderState.status === 'loading'){
        return <p>loading</p>
    }else {
        return (
            <div className={classes.root}>
                <Formik
                    initialValues={{
                        name: '',
                        surname: '',
                        phoneNumber: '',
                        deliveryAddress: ''
                    }}
                    validationSchema={submitOrderSchema}
                    onSubmit={
                        (values, ) => {
                            const readyOrder = {...props.order}
                            readyOrder.deliveryAddress = values.deliveryAddress;
                            readyOrder.phoneNumber = values.phoneNumber;
                            readyOrder.clientName = values.name;
                            readyOrder.clientSurname = values.surname;
                            const email: any = JSON.parse(localStorage.getItem('client') as string);
                           
                            readyOrder.clientEmail = email.email;
                            props.submitOrder(readyOrder);
                           

                        }
                    }
                >
                    {({errors, touched, isSubmitting}) => (
                        <Form>
                            <Field name="name" type="text" label="name" placeholder="name"/>
                            <ErrorMessage name="name"/>
                            <Field name="surname" type="text" label="surname" placeholder="surname"/>
                            <ErrorMessage name="surname"/>
                            <Field name="phoneNumber" type="text" label="phoneNumber" placeholder="phoneNumber"/>
                            <ErrorMessage name="phoneNumber"/>
                            <Field name="deliveryAddress" type="text" label="deliveryAddress" placeholder="deliveryAddress"/>
                            <ErrorMessage name="deliveryAddress"/>
                            <Button className={'btn'} variant="contained" color="primary" type="submit">Submit</Button>
                        </Form>
                    )}
                </Formik>
            </div>
        );
    }
    return <div></div>
}
export default SubmitOrder;
