import React, {useEffect, useState} from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import {useMealsActions, useMealsState} from "../../../store/meals";
import AddIcon from "@material-ui/icons/Add";
import ModalWrapper from "../Modal.component/modal";
import AddMeal from "../../Form/addMeal.component/addMeal.component";
import Swal from 'sweetalert2';
import {ApiStatus} from '../../../enums/apiStatus';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
            maxWidth: 752,
        },
        demo: {
            backgroundColor: theme.palette.background.paper,
        },
        title: {
            margin: theme.spacing(4, 0, 2),
        },
    }),
);

const ListWrapper = (props: any) => {
    const [counter, setCounter] = useState<number>(0);
    const classes = useStyles();
    const [meals, setMeals] = React.useState<any>([]);
    const [isShowAlertDeleteMeal, setIsShowAlertDeleteMeal] = useState<boolean>(false);
    const [isShowAlertAddMeal, setIsShowAlertAddMeal] = useState<boolean>(false);
    const getMealsResponse = useMealsState();
    const {getMenuRequest, addMealRequest, deleteMealRequest} = useMealsActions();

    useEffect(() => {
        getMenuRequest(props.restaurantId);
    }, [counter]);

    const refresh = () => {
        setCounter((c: number) => c +1);
    }

    const deleteMeal = (event: any) => {
        event.stopPropagation();
        const mealId = event.currentTarget.id;
        Swal.fire({
            title: 'Are you sure delete restaurant ?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result: any) => {
            if (result.isConfirmed) {
                deleteMealRequest(mealId);
                setIsShowAlertDeleteMeal(true);
            }
        });
          

    }

    const submitAddMeal = () => {
        setIsShowAlertAddMeal(true);
    }

    const getAllMeals = (): any => {
        const meals: any = getMealsResponse.data;

        if(meals.data.meals){
            return meals.data.meals.meals.map( (meal: any, index: any) => {
                if(meal.mealId){
                    return (
                        <ListItem key ={index}  >
                            <ListItemText
                                primary={`${meal.mealId ? meal.mealId.name : ''}  Price: ${meal.mealId ? meal.mealId.price: ''}`}
                                secondary={
                                    `description: ${meal.mealId ? meal.mealId.description: ''}`
                                }
                            />
                            <ListItemSecondaryAction>
                                <IconButton edge="end"  id = {meal.mealId._id}  aria-label="delete" onClick={deleteMeal} >
                                    <DeleteIcon/>
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    )
                }

            })
        }

    }

    if (getMealsResponse.status === ApiStatus.SUCCESS) {
        if (isShowAlertAddMeal){
            Swal.fire({
                icon: 'success',
                showCloseButton: true,
                title: 'Adding meal successfully',
            }).then((result) => {
                setIsShowAlertAddMeal(false);
                refresh();
            })
        }
        if (isShowAlertDeleteMeal){
            Swal.fire({
                icon: 'success',
                showCloseButton: true,
                title: 'Deleating meal successfully',
            }).then((result) => {
                setIsShowAlertDeleteMeal(false);
                refresh();

            })
        }

        return (
            <div className={classes.root}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                        <Typography variant="h6" className={classes.title}>
                            {props.header}
                        </Typography>
                        <ModalWrapper button = {<AddIcon/>} tittle = {'Add Meal'} >
                            <AddMeal restaurantId={props.restaurantId} submitAddMeal ={submitAddMeal}/>
                        </ModalWrapper>
                        <div className={classes.demo}>
                            <List dense={false}>
                                <div>
                                    {getAllMeals()}
                                </div>
                            </List>
                        </div>
                    </Grid>
                </Grid>
            </div>
        );
    } else if(getMealsResponse.status === ApiStatus.FAILURE){
        if (isShowAlertAddMeal){
            Swal.fire({
                icon: 'error',
                showCloseButton: true,
                title: 'Adding meal failed',
            })
            setIsShowAlertAddMeal(false);
        }
        if(isShowAlertDeleteMeal){
            Swal.fire({
                icon: 'error',
                showCloseButton: true,
                title: 'Delete meal failed',
            }) 
            setIsShowAlertDeleteMeal(false);
        }

    } else if(getMealsResponse.status === ApiStatus.LOADING) {
        return (
            <div>loading</div>
        )
    }
   return (<div></div>)
}

export default ListWrapper;