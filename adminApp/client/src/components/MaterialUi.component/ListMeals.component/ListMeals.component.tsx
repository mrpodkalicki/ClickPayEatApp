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
    const [secondary, setSecondary] = React.useState(false);
    const getMealsResponse = useMealsState();
    const {getMenuRequest, addMealRequest, deleteMealRequest} = useMealsActions();

    useEffect(() => {
        getMenuRequest(props.restaurantId);
    }, [counter]);

    const deleteMeal = (event: any) => {
        event.stopPropagation();
        deleteMealRequest(event.currentTarget.id)
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

    if (getMealsResponse.status === 'success') {
        return (
            <div className={classes.root}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                        <Typography variant="h6" className={classes.title}>
                            {props.header}
                        </Typography>
                        <ModalWrapper button = {<AddIcon/>} tittle = {'Add Meal'} >
                            <AddMeal restaurantId={props.restaurantId} />
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
    }
    return (
        <div>loading</div>
    )
}

export default ListWrapper;