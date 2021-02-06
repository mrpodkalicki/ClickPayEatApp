import React, { useContext } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Formik, Form as FormikForm, Field as FormikField, ErrorMessage as FormikErrorMessage } from 'formik';
import * as Yup from "yup";
import styled, { css } from 'styled-components';
import { useMealsActions, useMealsState } from "../../../store/meals";

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

export const ErrorMessage = styled(FormikErrorMessage)`
    color: red;
    border: solid black ;
`;


console.log('')

const addRestaurantSchema = Yup.object().shape({
    name: Yup.string()
        .min(5, 'Too Short!')
        .max(70, 'Too Long!')
        .required('Required'),
    description: Yup.string()
        .min(5, 'Too Short!')
        .max(300, 'Too Long!')
        .required('Required'),
    price: Yup.number()
        .required('Required'),

});


const AddMeal = (props: any) => {
    const classes = useStyles();
    const getMealsResponse = useMealsState();
    const { getMenuRequest, addMealRequest, deleteMealRequest } = useMealsActions();

    if (getMealsResponse.status === 'loading') {
        return <p>loading</p>
    } else {
        return (
            <div className={classes.root}>
                <Formik
                    initialValues={{
                        name: '',
                        description: '',
                        price: 0,

                    }}
                    validationSchema={addRestaurantSchema}
                    onSubmit={
                        (values) => {

                            const body = {
                                restaurantId: props.restaurantId,
                                name: values.name,
                                description: values.description,
                                price: values.price
                            }
                            addMealRequest(body);
                            props.submitAddMeal();
                        }
                    }
                >
                    {({ errors, touched, isSubmitting }) => (
                        <Form>
                            <Field name="name" type="text" label="name" placeholder="name" />
                            <ErrorMessage name="name" />
                            <Field name="description" type="text" label="description" placeholder="description" />
                            <ErrorMessage name="description" />
                            <Field name="price" type="number" label="price" placeholder="price" />
                            <ErrorMessage name="price" />
                            <Button className={'btn'} variant="contained" color="primary" type="submit">Submit</Button>
                        </Form>
                    )}
                </Formik>
            </div>
        );
    }
}
export default AddMeal;