import React, {useEffect, useState} from 'react';
import {useRestaurantActions, useReastaurantState } from '../../store/restaurant';
import  Item from '../../components/materialUi/Item/Item';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid, { GridSpacing } from '@material-ui/core/Grid';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
            margin: 5,
            '& > span': {
                margin: theme.spacing(2),
            }
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
    const classes = useStyles();
    const {getRestaurants } = useRestaurantActions();
    const  getRestaurantsResponse = useReastaurantState();

    useEffect(  () =>  {
        getRestaurants();
    },[]);

    const addRestaurant = () => {
        console.log('add')
    }

    const showRestaurants = () => {
        const restaurants: any = getRestaurantsResponse.data;

        return restaurants.data.restaurants.map((restaurant: any, index: number) => {

            const body = [
                {name: 'address', value: restaurant.address},
                {name: 'category', value: restaurant.category},
                {name: 'cuisine', value: restaurant.cuisine},
            ]
            return (
                <Item key = {index} header = {restaurant.name} body = {body} />
            )
        })
    }

    if(getRestaurantsResponse.status === 'success'){
        return (
          <div>
              <h2>Restaurant</h2>
              <IconButton onClick={addRestaurant} aria-label="delete" color="primary">
                  <AddIcon/>
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