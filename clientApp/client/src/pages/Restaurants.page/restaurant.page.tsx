import React, {useEffect, useState} from 'react';
import {useRestaurantActions, useReastaurantState } from '../../store/restaurant';
import  CardItem from '../../components/MaterialUi.component/Card.component/Card.component';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid, { GridSpacing } from '@material-ui/core/Grid';
import {useMealsActions, useMealsState} from "../../store/meals";
import ListWrapper from "../../components/MaterialUi.component/ListMeals.component/ListMeals.component";
import Swal from 'sweetalert2';
import {useOrderState, usePostOrder} from "../../store/order";

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
        header: {
            textAlign: 'center',
        }
    }),
);


const Restaurants = () => {
    const [counter, setCounter] = useState<number>(0);
    const classes = useStyles();
    const {getRestaurants } = useRestaurantActions();
    const getRestaurantsResponse = useReastaurantState();
    const getMealsResponse = useMealsState();
    const {getMenuRequest} = useMealsActions();
    const [isShowALertSubmitOrder, setIsShowALertSubmitOrder] = useState<boolean>(false);
    const  orderState: any = useOrderState();
    const {postOrderRequest} = usePostOrder();

    useEffect(  () =>  {
        getRestaurants();
    },[counter]);



    const isSubmitOrder = (readyOrder: any) => {
        postOrderRequest(readyOrder)
        setIsShowALertSubmitOrder(true);
        refresh();
    }

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
                                    isSubmitOrder = {isSubmitOrder}
                              />
                          }/>
                )
            })
        }

    }

    const refresh = () => {
        setCounter((c: number) => c +1);
    }

    if (orderState.status === 'success' && isShowALertSubmitOrder) {
        Swal.fire({
            icon: 'success',
            showCloseButton: true,
            title: 'Order send to restaurant',
    
        }).then((result: any) => {
            setIsShowALertSubmitOrder(false);
            refresh();
        })
    }

    if(getRestaurantsResponse.status === 'success'){
        return (
          <div>
              <h2 className={classes.header}>Restaurants</h2>
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