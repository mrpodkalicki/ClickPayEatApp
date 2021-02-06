import React from 'react';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import Container from '@material-ui/core/Container';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Link, useHistory } from 'react-router-dom';
import {useAuth} from '../../Routes';
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
    let auth: any = useAuth();
    const history = useHistory();

    const logOutUser = () => {
        localStorage.removeItem('user');
        auth.signout(() => history.push("/"));    
    }
    

    const classes = useStyles();
    let redirectRestauratn: any ;
    const detailsUSer = JSON.parse(localStorage.getItem('user') as string);
    if (detailsUSer?.role === 'admin') {
        redirectRestauratn = <MenuItem>
        <Link className={'menu-list__item__link'} to="/restaurants">Restaurants</Link></MenuItem> 
    } else {
        redirectRestauratn = <div></div> ;
    }
    

    return (
        <Box component="span" m={1} className={'container'}>
            <Paper className={classes.paper}>
                <MenuList>
                    <MenuItem>
                        <Link className={'menu-list__item__link'} to="/dashboard">Dashboard</Link>
                    </MenuItem>
                    
                        {redirectRestauratn}
                   
                    <MenuItem >
                        <a className={'menu-list__item__link'} onClick={logOutUser} href={'/'}>
                            Log out
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