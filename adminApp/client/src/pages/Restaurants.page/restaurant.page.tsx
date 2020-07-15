import React, {useEffect, useState} from 'react';
import {useRestaurantActions, useReastaurantState } from '../../store/restaurant';
import  CardItem from '../../components/MaterialUi.component/Card.component/Card.component';
import ModalWrapper from '../../components/MaterialUi.component/Modal.component/modal';
import AddRestaurantComponent from '../../components/Form/addRestaurant.component/addRestaurant.component';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid, { GridSpacing } from '@material-ui/core/Grid';
import AddIcon from '@material-ui/icons/Add';
import CachedIcon from '@material-ui/icons/Cached';
import IconButton from "@material-ui/core/IconButton";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
            margin: 5,

        },
        paper: {
            height: 140,
            width: 100,
        },
        control: {
            padding: theme.spacing(2),
        },
    }),
);


const Restaurants = () => {
    const [counter, setCounter] = useState<number>(0);
    const classes = useStyles();
    const {getRestaurants, deleteRestaurant } = useRestaurantActions();
    const  getRestaurantsResponse = useReastaurantState();

    useEffect(  () =>  {
        getRestaurants();
    },[counter]);

    const showRestaurants = () => {
        const restaurants: any = getRestaurantsResponse.data;

        const deleteItem = (event: any) => {
            event.stopPropagation();
            deleteRestaurant(event.currentTarget.id)
        }

        if(Array.isArray(restaurants.data.restaurants)){
            return restaurants.data.restaurants.map((restaurant: any, index: number) => {

                const body = [
                    {name: 'address', value: restaurant.address},
                    {name: 'category', value: restaurant.category},
                    {name: 'cuisine', value: restaurant.cuisine},
                ]
                return (
                    <CardItem id={restaurant._id}
                          menu = {
                              <IconButton  id ={restaurant._id} aria-label="delete"onClick={deleteItem} >
                                  <DeleteForeverIcon />
                              </IconButton>
                          }
                          key = {index}
                          header = {restaurant.name}
                          body = {body} />
                )
            })
        }

    }

    const refresh = () => {
        setCounter((c: number) => c +1);
    }

    if(getRestaurantsResponse.status === 'success'){
        return (
          <div>
              <h2>Restaurants</h2>
              <ModalWrapper button = {<AddIcon/>} tittle = {'Add restaurant'} >
                  <AddRestaurantComponent setCounter = {setCounter}/>
              </ModalWrapper>
              <IconButton aria-label="add" color="primary"  onClick={refresh} >
                  <CachedIcon/>
              </IconButton>
              <Grid container className={classes.root} spacing={2}>
                  <Grid item xs={12}>
                      <Grid container justify="center" spacing={3}>
                          {showRestaurants()}
                      </Grid>
                  </Grid>
              </Grid>
          </div>
        )
    }
    return (
        <div>
            Loading
        </div>
    )
}

export default Restaurants;