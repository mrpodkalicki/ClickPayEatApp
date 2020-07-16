import React, {useEffect, useState} from 'react';
import {useRestaurantActions, useReastaurantState } from '../../store/restaurant';
import  CardItem from '../../components/MaterialUi.component/Card.component/Card.component';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid, { GridSpacing } from '@material-ui/core/Grid';
import {useMealsActions, useMealsState} from "../../store/meals";
import ListWrapper from "../../components/MaterialUi.component/ListMeals.component/ListMeals.component";

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
    const {getRestaurants } = useRestaurantActions();
    const getRestaurantsResponse = useReastaurantState();
    const getMealsResponse = useMealsState();
    const {getMenuRequest} = useMealsActions();

    useEffect(  () =>  {
        getRestaurants();
    },[counter]);

    const showRestaurants = () => {
        const restaurants: any = getRestaurantsResponse.data;

        if(Array.isArray(restaurants.data.restaurants)){
            return restaurants.data.restaurants.map((restaurant: any, index: number) => {
                const body = [
                    {name: 'address', value: restaurant.address},
                    {name: 'category', value: restaurant.category},
                    {name: 'cuisine', value: restaurant.cuisine},
                ]
                return (
                    <CardItem id={restaurant._id}
                          key = {index}
                          header = {restaurant.name}
                          body = {body}
                          collapse = {
                              <ListWrapper
                                    header ={'Menu'}
                                    restaurantId = {restaurant._id}
                                    restaurantName = {restaurant.name}
                                    additionalData = {restaurant}
                              />
                          }/>
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