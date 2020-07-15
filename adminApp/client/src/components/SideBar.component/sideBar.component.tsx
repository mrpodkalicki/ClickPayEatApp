import React from 'react';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import Container from '@material-ui/core/Container';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import './sideBar.component.css'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
        },
        paper: {
            width: 200,
            height: '100vh',
            backgroundColor:'#3f50b5',
            color: 'white'

        },
    }),
);



const  SideBar = ({children}: any) => {
    const classes = useStyles();
    return (
        <Box component="span" m={1} className={'container'}>
            <Paper className={classes.paper}>
                <MenuList>
                    <MenuItem>
                        <Link className={'menu-list__item__link'} to="/dashboard">Dashboard</Link>
                    </MenuItem>
                    <MenuItem>
                        <Link className={'menu-list__item__link'} to="/restaurants">Restaurants</Link>
                    </MenuItem>
                    <MenuItem >
                        <a href={'/signIn'}>
                            Log
                        </a>
                    </MenuItem>
                </MenuList>
            </Paper>
            <Container maxWidth="lg" fixed>
                <div>{children}</div>
            </Container>

        </Box>
    )
}
export default SideBar;