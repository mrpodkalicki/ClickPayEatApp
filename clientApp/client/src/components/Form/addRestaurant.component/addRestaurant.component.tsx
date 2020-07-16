import React, {useContext} from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Button  from '@material-ui/core/Button';
import { Formik, Form as FormikForm, Field as FormikField, ErrorMessage as FormikErrorMessage } from 'formik';
import * as Yup from "yup";
import styled, { css } from 'styled-components';
import {useSignInActions, useSignInState} from "../../../store/sigIn";
import {useRestaurantActions} from "../../../store/restaurant";

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



const addRestaurantSchema = Yup.object().shape({
    cuisine: Yup.string()
        .min(5, 'Too Short!')
        .max(70, 'Too Long!')
        .required('Required'),
    name: Yup.string()
        .min(5, 'Too Short!')
        .max(70, 'Too Long!')
        .required('Required'),
    address: Yup.string()
        .min(5, 'Too Short!')
        .max(70, 'Too Long!')
        .required('Required'),
    category: Yup.string()
        .min(5, 'Too Short!')
        .max(70, 'Too Long!')
        .required('Required'),
});


const AddRestaurantComponent = (props: any) => {
    const classes = useStyles();
    const  addRestaurantResponse = useSignInState();
    const {getRestaurants } = useRestaurantActions();

    // if(addRestaurantResponse.status === 'success'){
    //     return (
    //         <div>
    //            Add restaurantt
    //         </div>
    //     )
    // }
    if (addRestaurantResponse.status === 'loading'){
        return <p>loading</p>
    }else {
        return (
            <div className={classes.root}>
                <Formik
                    initialValues={{
                        cuisine: '',
                        name: '',
                        address: '',
                        category: ''
                    }}
                    validationSchema={addRestaurantSchema}
                    onSubmit={
                        (values, ) => {
                        }
                    }
                >
                    {({errors, touched, isSubmitting}) => (
                        <Form>
                            <Field name="cuisine" type="text" label="cuisine" placeholder="cuisine"/>
                            <ErrorMessage name="cuisine"/>
                            <Field name="name" type="text" label="name" placeholder="name"/>
                            <ErrorMessage name="name"/>
                            <Field name="address" type="text" label="address" placeholder="address"/>
                            <ErrorMessage name="address"/>
                            <Field name="category" type="text" label="category" placeholder="category"/>
                            <ErrorMessage name="category"/>
                            <Button className={'btn'} variant="contained" color="primary" type="submit">Submit</Button>
                        </Form>
                    )}
                </Formik>
            </div>
        );
    }
}
export default AddRestaurantComponent;