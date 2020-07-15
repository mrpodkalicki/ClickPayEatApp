import React, {useEffect, useState} from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import FolderIcon from '@material-ui/icons/Folder';
import DeleteIcon from '@material-ui/icons/Delete';
import {useMealsActions, useMealsState} from "../../../store/meals";
import CachedIcon from "@material-ui/icons/Cached";
import AddIcon from "@material-ui/icons/Add";
import ModalWrapper from "../Modal.component/modal";
import AddRestaurantComponent from "../../Form/addRestaurant.component/addRestaurant.component";
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