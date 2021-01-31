import React, {useEffect, useState,} from 'react';
import  CardItem from '../../components/MaterialUi.component/Card.component/Card.component';
import ModalWrapper from '../../components/MaterialUi.component/Modal.component/modal';
import AddRestaurantComponent from '../../components/Form/addRestaurant.component/addRestaurant.component';
import {makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid  from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import AddIcon from '@material-ui/icons/Add';
import CachedIcon from '@material-ui/icons/Cached';
import IconButton from "@material-ui/core/IconButton";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import {useMealsActions, useMealsState} from "../../store/meals";
import ListWrapper from "../../components/MaterialUi.component/ListMeals.component/ListMeals.component";
import {RESTAURAN_DOMAIN} from '../../utilities/createAccount';
import {useSignAdminActions, useSignAdminState} from '../../store/signAdmin';
import { useRestaurantActions, useRestaurantState } from "../../store/restaurant";
import Swal from 'sweetalert2';
import {ApiStatus} from '../../enums/apiStatus';




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
    const [isShowAlertAddRestaurant, setIsShowAlertAddRestaurant] = useState<boolean>(false);
    const [isShowAlertDeleteRestaurant, setIsShowAlertDeleteRestaurant] = useState<boolean>(false);
    const [adminCredential, setAdminCredential] = useState<any>({email: '', password: ''});
    const classes = useStyles();
    const {getRestaurants, deleteRestaurant } = useRestaurantActions();
    const getRestaurantsResponse = useRestaurantState();
    const {addRestaurant } = useRestaurantActions();
    const {singUpAdmin} = useSignAdminActions();
    const singAdminResponse = useSignAdminState();
    const addRestaurantResponse = useRestaurantState();

    useEffect(  () =>  {
        getRestaurants();
    },[counter]);


    const refresh = () => {
        setCounter((c: number) => c +1);
    }

    const deleteItem = (event: any) => {
        event.stopPropagation();
        deleteRestaurant(event.currentTarget.id);
        setIsShowAlertDeleteRestaurant(true);
    }
    const getaddRestaurantReqForm = (reqForm: any) => {
        addRestaurant(reqForm);   
        const email = reqForm.name + RESTAURAN_DOMAIN;
        const password = reqForm.name;
        setAdminCredential({email, password})

        if (addRestaurantResponse.status === ApiStatus.SUCCESS) {
            singUpAdmin({
                email: email,
                password: password
            })  
            setIsShowAlertAddRestaurant(true);              
        } else if (singAdminResponse.status === ApiStatus.FAILURE) {
            Swal.fire({
                icon: 'error',
                showCloseButton: true,
                title: 'Adding restauran failed, try again',
            })
        }
    }

    if (singAdminResponse.status === ApiStatus.SUCCESS && isShowAlertAddRestaurant) {
        Swal.fire({
            icon: 'success',
            showCloseButton: true,
            title: 'Adding restauran successfully',
            html: `<h4>Creating account for restaurant</h4>
                    <h5>email: ${adminCredential.email}</h5>
                    <h5>password: ${adminCredential.password}</h5>`

        }).then((result) => {
            setIsShowAlertAddRestaurant(false);
            refresh();
        })
    } else if (singAdminResponse.status === ApiStatus.FAILURE && isShowAlertAddRestaurant) {
         Swal.fire({
            icon: 'error',
            showCloseButton: true,
            title: 'Adding admin account failed',
        }).then((result) => {
            setIsShowAlertAddRestaurant(false);
        })
    }

    
 if(getRestaurantsResponse.status === ApiStatus.SUCCESS && isShowAlertDeleteRestaurant){ 
    Swal.fire({
        icon: 'success',
        showCloseButton: true,
        title: 'Deleting restauran successfully',

    }).then((result) => {
        setIsShowAlertDeleteRestaurant(false);
        refresh();
    })
 } else if(getRestaurantsResponse.status === ApiStatus.SUCCESS && isShowAlertDeleteRestaurant) {
    Swal.fire({
        icon: 'error',
        showCloseButton: true,
        title: 'Deleting restauran successfully',
    }).then((result) => {
        setIsShowAlertDeleteRestaurant(false);
    })
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
                          menu = {
                              <IconButton  id ={restaurant._id} aria-label="delete"onClick={deleteItem} >
                                  <DeleteForeverIcon />
                              </IconButton>
                          }
                          key = {index}
                          header = {restaurant.name}
                          body = {body}
                          collapse = {
                              <ListWrapper
                                    header ={'Menu'}
                                    restaurantId = {restaurant._id}
                              />
                          }/>
                )
            })
        }

    }
    if(getRestaurantsResponse.status === ApiStatus.SUCCESS){
        return (
          <div>
              <h2>Restaurants</h2>
              <ModalWrapper button = {<AddIcon/>} tittle = {'Add restaurant'} >
                  <AddRestaurantComponent  getaddRestaurantReqForm = {getaddRestaurantReqForm}   refresh = {refresh}/>
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
            <CircularProgress />
        </div>
    )
}

export default Restaurants;