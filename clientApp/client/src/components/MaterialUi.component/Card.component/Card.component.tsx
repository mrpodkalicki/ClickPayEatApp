import React, {useContext} from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import {useReastaurantState, useRestaurantActions} from "../../../store/restaurant";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            minWidth: 445,
            margin: 3,
        },
        media: {
            height: 0,
            paddingTop: '6.25%', // 16:9
        },
        expand: {
            transform: 'rotate(0deg)',
            marginLeft: 'auto',
            transition: theme.transitions.create('transform', {
                duration: theme.transitions.duration.shortest,
            }),
        },
        expandOpen: {
            transform: 'rotate(180deg)',
        },
        avatar: {
            backgroundColor: red[500],
        },
    }),
);


const CardItem = (props: any) => {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);;
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const getBody = () => {
      return props.body.map((item: any, index: number) => {
          return (
              <li key = {index}>
                {item.name}: {item.value}
              </li>)
      })
    }

    return (
        <Card className={classes.root} id ={props.id} >
            <CardHeader
                action={
                    props.menu
                }
                title={props.header}
            />
            <CardMedia
                className={classes.media}
                image="/static/images/cards/paella.jpg"
                title="Paella dish"
            />
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                    {getBody()}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton
                    className={clsx(classes.expand, {
                        [classes.expandOpen]: expanded,
                    })}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <p>Menu</p>
                    <ExpandMoreIcon />
                </IconButton>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <div >{props.collapse}</div>
                </CardContent>
            </Collapse>
        </Card>
    )
}

export default CardItem;