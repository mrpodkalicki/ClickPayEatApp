import React from 'react';
import TextField from '@material-ui/core/TextField';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({

        root: {
            '& .MuiTextField-root': {
                margin: theme.spacing(1),
                width: '100%',

            },
            '& input': {
                padding: 8,
            },
            '& .btn': {
                width: 100,
                alignSelf: 'flex-end',
            },
            '& .container': {
                display: 'flex',
                flexDirection: 'column',
                width: 220,
            }
        },
    }),
);

export default function Login() {
    const classes = useStyles();

    return (
        <form className={classes.root} noValidate autoComplete="off">
            <div className={'container'}>
                <TextField
                    error
                    id="outlined-error-helper-text"
                    label="email"
                    defaultValue="Hello World"
                    helperText="Incorrect email."
                    variant="outlined"
                />
                <TextField
                    error
                    id="outlined-error-helper-text"
                    label="password"
                    defaultValue="Hello World"
                    helperText="Incorrect password."
                    variant="outlined"
                />
                <Button className={'btn'} variant="contained" color="primary">
                    Sign in
                </Button>
            </div>
        </form>
    );
}