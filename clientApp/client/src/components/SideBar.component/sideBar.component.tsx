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
            height: '100%',
        },
        paper: {
            width: 200,
            backgroundColor:'#3f50b5',
            color: 'white',

        },
        navItem: {
            marginBottom: 30,

        },
        navContainer: {
            margin: 'auto',
            minHeight: '96.7vh'
        }
    }),
);



const  SideBar = ({children}: any) => {
    const classes = useStyles();
    return (
        <Box component="span" m={1} className={'container'}>
            <Paper className={classes.paper}>
                <MenuList className={classes.navContainer}>
                    <MenuItem className={classes.navItem}>
                        <Link className={'menu-list__item__link'} to="/dashboard">Dashboard</Link>
                    </MenuItem>
                    <MenuItem className = {classes.navItem}>
                        <Link className={'menu-list__item__link'} to="/restaurants">Restaurants</Link>
                    </MenuItem>
                    <MenuItem className = {classes.navItem}>
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