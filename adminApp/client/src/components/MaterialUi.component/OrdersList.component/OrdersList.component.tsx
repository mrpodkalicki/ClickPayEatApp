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
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';


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
    const {getOrders} = useOrdersActions();
    useEffect(() => {
        getOrders();
    }, [counter]);


    const rows = [
        createData('Frozen yoghurt',
            'serus boczus', '19 20','adrian', 'Nowal', 'ladna 23/2',
            '13;30', '11111111', '34', '124324')
    ];

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

    if(getOrdersResponse.status === 'success'){
        return ( <div>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="right">Nr</TableCell>
                            <TableCell align="right">Delete  </TableCell>
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
                        {allOrders().map((row: any, index: string ) => (
                            <TableRow key={index}>
                                <TableCell component="th" scope="row">
                                    {index +1}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    <IconButton aria-label="delete">
                                        <DeleteIcon />
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
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>)

    }else {
        return <div>loading</div>
    }

}

export default  OrderList;