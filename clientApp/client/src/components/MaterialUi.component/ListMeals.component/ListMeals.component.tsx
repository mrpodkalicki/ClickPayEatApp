import React, {useEffect, useState} from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {useMealsActions, useMealsState} from "../../../store/meals";
import ModalWrapper from "../Modal.component/modal";
import SelectInput from "../SelectInput.component/SelectInput.component";
import './ListMeals.componengt.css'
import SummaryOrder from "../../SummaryOrder.component/SummaryOrder.component";
import SubmitOrder from "../../Form/SubmitOrder.component/SubmitOrder.component";
import {useOrderState, usePostOrder} from "../../../store/order";
import Swal from 'sweetalert2';

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
    const classes = useStyles();
    const {getMenuRequest} = useMealsActions();
    const [counter, setCounter] = useState<number>(0);
    const getMealsResponse = useMealsState();
    const [checked, setChecked] = React.useState([-1]);
    const [order, setOrder] = React.useState<any>([]);
    const  orderState: any = useOrderState();

    useEffect(() => {
        getMenuRequest(props.restaurantId);
    }, [counter]);

    const refresh = () => {
        setCounter((c: number) => c +1);
    }


    const submitOrder = (readyOrder: any) => {
        props.isSubmitOrder(readyOrder);
        refresh();
       
    };

    const prepareSummaryOrder = () => {
        const meals = order.map((item: any) => {
            return {
                meal: [
                    {
                        name: item.name,
                        price: item.price,
                        quantity: item.quantity
                    }
                ]
            }
        })

        const summaryOrder = {
            meals: meals,
            totalPrice: countTotalPrice(order),
            restaurantName:props.additionalData.name,
            deliveryAddress:'',
            deliveryTime: props.additionalData.deliveryTime,
            phoneNumber: '',
            clientName: '',
            clientSurname: ''
        }
        return summaryOrder;
    }

    const countTotalPrice = (items: any[]) => {
        let price = 0;
        items.map((item: any) => {
            price += (item.price * item.quantity);
        })
        return price;
    }

    const handleToggle = (value: number, mealValue: any) => () => {
        const prepareMeal = {
            id: mealValue.mealId._id,
            name: mealValue.mealId.name,
            price: mealValue.mealId.price,
            quantity: 1,
        }
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];
        const newOrder = [...order];
        if (currentIndex === -1) {
            newChecked.push(value);
            newOrder.push(prepareMeal);
        } else {
            newChecked.splice(currentIndex, 1);
            newOrder.splice(currentIndex, 1);
        }
        setChecked(newChecked);
        setOrder(newOrder);
    };

    const quantityActualization = (quantity: string, id: string) => {
        const newOrder = [...order];
        newOrder.map((item: any) => {
           if( item.id === id){
               item.quantity = quantity;
           }
        })
        setOrder(newOrder);
    }

    const isClick = (index: string) => {
        const elementIndex = checked.filter((item: any) => item === index);
        return  elementIndex.length > 0;
    }



    const quantityValue = () => {
        const value = []
        for(let i = 1; i <= 100; i++){
            value.push(i);
        }
        return value;
    }

    const getAllMeals = (): any => {
        const meals: any = getMealsResponse.data;
        if(meals.data.meals){
            return meals.data.meals.meals.filter((meal: any) => meal.mealId !== null).map( (meal: any, index: any) => {
                const labelId = `checkbox-list-label-${index}`;
                if(meal.mealId){
                    return (
                        <div key = {index} className={'listItemContainer'}  >
                            <ListItem key = {index} dense button onClick={handleToggle(index, meal)}>
                                <Checkbox
                                    edge="start"
                                    checked={checked.indexOf(index) !== -1}
                                    tabIndex={-1}
                                    disableRipple
                                    inputProps={{ 'aria-labelledby': labelId }}
                                />
                                <ListItemText
                                    primary={`${meal.mealId ? meal.mealId.name : ''}  Price: ${meal.mealId ? meal.mealId.price: ''}`}
                                    secondary={
                                        `description: ${meal.mealId ? meal.mealId.description: ''}`
                                    }
                                />
                            </ListItem>
                            <SelectInput  id = {meal.mealId._id}
                                          isClick = {isClick(index)}
                                          header={'quantity'}
                                          name = {meal}
                                          quantityActualization={quantityActualization}
                                          quantityValue = {quantityValue()} />
                        </div>

                    )
                }

            })
        }

    }

    if (getMealsResponse.status === 'success') {

        return (
            <div className={classes.root}>
                <Grid container spacing={2}>
                    <div >
                        <Typography variant="h6" className={classes.title}>
                            {props.header}
                        </Typography>
                        <div className={classes.demo}>
                            <List className={'listItem'} dense={false}>
                                <div>
                                    {getAllMeals()}
                                </div>
                            </List>
                            <ModalWrapper button = {' Submit order'} tittle = { 'Submit order' }>
                                <SummaryOrder order ={prepareSummaryOrder()}/>
                                <SubmitOrder order ={prepareSummaryOrder()} submitOrder = {submitOrder}/>
                            </ModalWrapper>
                        </div>
                    </div>
                </Grid>
            </div>
        );
    }
    return (
        <div>loading</div>
    )
}

export default ListWrapper;