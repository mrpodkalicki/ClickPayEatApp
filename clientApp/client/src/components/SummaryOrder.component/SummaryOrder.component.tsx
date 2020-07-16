import React, {useEffect, useState} from 'react';
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import {useOrderState} from "../../store/order";

const SummaryOrder = (props: any) => {
    const  orderState = useOrderState();
    const allMeals = () => {
        return props.order.meals.map((meal: any, index: number) => {
            return (
                <ListItem key = {index} dense >
                    <ListItemText
                        primary={`${meal.meal[0].name}` }
                        secondary={`Price: ${meal.meal[0].price}  quantity: ${meal.meal[0].quantity}`}
                    />
                </ListItem>
            )
        })
    }
    if(orderState.status === 'success'){
        return <div></div>
    }else {
        return (
            <div>
                <h2>Restaurant {props.order.restaurantName}</h2>
                {allMeals()}
                <h2>Total Price: {props.order.totalPrice}</h2>
            </div>

        )
    }

}

export default SummaryOrder;
