import React, {useEffect, useState} from 'react';
import {useOrdersActions, useOrdersState} from "../../../store/orders";
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import CachedIcon from "@material-ui/icons/Cached";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import Swal from 'sweetalert2';

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

function createData(restaurantName: string, meals: string, quantity: string,
                    clientName: string, clientSurname: string,
                    deliveryAddress: string, deliveryTime: string,
                    phoneNumber: string, totalPrice: string, idOrder: string ) {
    return { restaurantName, clientName, clientSurname, deliveryAddress,
        deliveryTime, phoneNumber, totalPrice, meals, idOrder, quantity  };
}

const OrderList = () => {
    const classes = useStyles();
    const [counter, setCounter] = useState<number>(0);
    const getOrdersResponse = useOrdersState();
    const {getOrders, deleteOrderRequest} = useOrdersActions();
    const [isShowAlertDeletedOrder, setIsShowAlertDeletedOrder] = useState<boolean>(false);

    useEffect(() => {
        const userDetails: any = JSON.parse(localStorage.getItem('user') as string);
        if (userDetails?.role === 'admin') {
            getOrders({role: userDetails?.role});
        } else if(userDetails.role === 'restaurant') {
            let restaurantName = userDetails?.email?.split('@')[0];
            if( restaurantName === 'shrimphouse') {
                restaurantName = 'shrimp house'
            }

            if(restaurantName === 'sushimidai'){
                restaurantName = 'sushi midai'
            } 



            // restaurantName[0] = restaurantName[0].toUpperCase();
            getOrders({role: userDetails?.role, restaurantName: restaurantName});
        }   
    }, [counter]);


    const rows = [
        createData('Frozen yoghurt',
            'serus boczus', '19 20','adrian', 'Nowal', 'ladna 23/2',
            '13;30', '11111111', '34', '124324')
    ];


    const deleteOrder = (event: any) => {
        event.stopPropagation();
        const restId = event.currentTarget.id;
        Swal.fire({
            title: 'Are you sure delete restaurant ?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {
                deleteOrderRequest(restId)

                setIsShowAlertDeletedOrder(true);
            }
          })
    }

    const refresh = () => {
        setCounter((c: number) => c +1);
    }

    const allOrders = () => {
        const response: any = getOrdersResponse.data;
        if(response.data){
            if(Array.isArray(response.data.orders)){
                return  response.data.orders.map( (order: any, index: number) => {
                    const allMeals = order.meals.map((meal: any) =>  meal.meal[0].name)
                        .reduce((nameMealFirst: string, nameMealSecond: string) => `${nameMealFirst} | ${nameMealSecond}`);

                    const allQuantity = order.meals.map((meal: any) =>  meal.meal[0].quantity)
                        .reduce((nameMealFirst: string, nameMealSecond: string) => `${nameMealFirst} | ${nameMealSecond}`);

                   return createData(order.restaurantName, allMeals ,allQuantity, order.clientName, order.clientSurname,
                       order.deliveryAddress, order.deliveryTime, order.phoneNumber, order.totalPrice, order._id)

                })
            }
        }
    }


    const detailsUSer = JSON.parse(localStorage.getItem('user') as string);
    
    const displayOrders = () => {
        const order = allOrders();
        if(Array.isArray(order)) {
            return (
                order.map((row: any, index: number) => {
                    if (detailsUSer?.role === 'admin'){
                        return (
                            <TableRow key={index}>
                                <TableCell component="th" scope="row">
                                    {index + 1}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    <IconButton  id ={row.idOrder} aria-label="delete" onClick={deleteOrder} >
                                        <DeleteForeverIcon />
                                    </IconButton>
                                </TableCell>
                                <TableCell align="right">{row.restaurantName}</TableCell>
                                <TableCell align="right">{row.meals}</TableCell>
                                <TableCell align="right">{row.quantity}</TableCell>
                                <TableCell align="right">{row.clientName}</TableCell>
                                <TableCell align="right">{row.clientSurname}</TableCell>
                                <TableCell align="right">{row.deliveryAddress}</TableCell>
                                <TableCell align="right">{row.deliveryTime}</TableCell>
                                <TableCell align="right">{row.phoneNumber}</TableCell>
                                <TableCell align="right">{row.totalPrice}</TableCell>
                            </TableRow>
                        )
                    }else {
                        return (
                            <TableRow key={index}>
                                <TableCell component="th" scope="row">
                                    {index + 1}
                                </TableCell>
                                <TableCell align="right">{row.restaurantName}</TableCell>
                                <TableCell align="right">{row.meals}</TableCell>
                                <TableCell align="right">{row.quantity}</TableCell>
                                <TableCell align="right">{row.clientName}</TableCell>
                                <TableCell align="right">{row.clientSurname}</TableCell>
                                <TableCell align="right">{row.deliveryAddress}</TableCell>
                                <TableCell align="right">{row.deliveryTime}</TableCell>
                                <TableCell align="right">{row.phoneNumber}</TableCell>
                                <TableCell align="right">{row.totalPrice}</TableCell>
                            </TableRow>
                        ) 
                    }
                   
            })
            )
        }else {
            return <div></div>
        }
    }

    let deleteHeader: any;

   

    if(getOrdersResponse.status === 'success'){
        if (isShowAlertDeletedOrder) {
            Swal.fire({
                icon: 'success',
                showCloseButton: true,
                title: 'Deleted order succesfully',
            }).then((result) => {
                setIsShowAlertDeletedOrder(false);
                refresh();
            })
        }
        if (detailsUSer?.role === 'admin'){
            return (
                <div>
                    <IconButton aria-label="add" color="primary"  onClick={refresh} >
                        <CachedIcon/>
                    </IconButton>
                    <TableContainer component={Paper}>
                        <Table className={classes.table} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="right">Nr</TableCell>
                                    <TableCell align="right">Delete</TableCell>
                                    <TableCell align="right">Restaurant</TableCell>
                                    <TableCell align="right">Meals</TableCell>
                                    <TableCell align="right">Quantity</TableCell>
                                    <TableCell align="right">Name</TableCell>
                                    <TableCell align="right">Surname</TableCell>
                                    <TableCell align="right">Address</TableCell>
                                    <TableCell align="right">Delivery time</TableCell>
                                    <TableCell align="right">Phone</TableCell>
                                    <TableCell align="right">Price</TableCell>
                                </TableRow>
                            </TableHead>
                        <TableBody>
                            {displayOrders()}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>)
        } else {
            return (
                <div>
                    <IconButton aria-label="add" color="primary"  onClick={refresh} >
                        <CachedIcon/>
                    </IconButton>
                    <TableContainer component={Paper}>
                        <Table className={classes.table} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="right">Nr</TableCell>
                                    <TableCell align="right">Restaurant</TableCell>
                                    <TableCell align="right">Meals</TableCell>
                                    <TableCell align="right">Quantity</TableCell>
                                    <TableCell align="right">Name</TableCell>
                                    <TableCell align="right">Surname</TableCell>
                                    <TableCell align="right">Address</TableCell>
                                    <TableCell align="right">Delivery time</TableCell>
                                    <TableCell align="right">Phone</TableCell>
                                    <TableCell align="right">Price</TableCell>
                                </TableRow>
                            </TableHead>
                        <TableBody>
                            {displayOrders()}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>)
        }

       
    }else if (getOrdersResponse.status === 'failure') {
        Swal.fire({
            icon: 'error',
            showCloseButton: true,
            title: 'Deleting restauran failed',
        }).then((result) => {
            setIsShowAlertDeletedOrder(false);
        })
    }else if(getOrdersResponse.status === 'loading') {
        return <div>loading</div>
    }
    return <div></div>
}

export default  OrderList;