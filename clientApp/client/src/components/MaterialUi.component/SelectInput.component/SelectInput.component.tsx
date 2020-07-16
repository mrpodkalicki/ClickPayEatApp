import React, {useEffect, useState} from 'react';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        formControl: {
            margin: theme.spacing(1),
            minWidth: 120,
        },
        selectEmpty: {
            marginTop: theme.spacing(2),
        },
    }),
);



const SelectInput = (props: any) => {
    const classes = useStyles();
    const [quantity, setQuantity] = React.useState('');

    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setQuantity(event.target.value as string);
        props.quantityActualization(event.target.value as string, props.id)
    };
    const allItem = () => {
        return props.quantityValue.map((quantity: any, index: number) => <MenuItem  key ={index} value={quantity}>{quantity}</MenuItem>)
    }
    if(props.isClick){
        return(
            <FormControl className={classes.formControl} >
                <InputLabel id="demo-simple-select-label">{props.header}</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={quantity}
                    onChange={handleChange}
                >
                    {allItem()}
                </Select>
            </FormControl>
        )
    }
    return (<div>

    </div>)
}

export default SelectInput;