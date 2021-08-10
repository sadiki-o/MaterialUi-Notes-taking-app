import { makeStyles } from '@material-ui/core'
import React from 'react'
import { Drawer, Typography } from '@material-ui/core'
import { List, ListItem,ListItemIcon, ListItemText } from '@material-ui/core';
import { SubjectOutlined, AddCircleOutlineOutlined } from '@material-ui/icons';
import { useHistory, useLocation } from 'react-router-dom';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    page: {
        background: '#f9f9f9',
        width: '100%',
        padding: theme.spacing(3)
    },
    drawer: {
        width: drawerWidth
    },
    drawerPaper: {
        width: drawerWidth
    },
    root: {
        display: 'flex'
    },
    active: {
        background: '#f4f4f4'
    },
    title: {
        padding: theme.spacing(2)
    }
}))

const Layout = ({children}) => {
    const classes = useStyles()
    const history = useHistory()
    const location = useLocation()

    const menuItems = [
        {
            text: 'My Notes',
            icon: <SubjectOutlined color="secondary"/>,
            path: '/'
        },
        {
            text: 'Create Note',
            icon: <AddCircleOutlineOutlined color="secondary" />,
            path: '/create'
        },
    ]
    
    return (
        <div className={classes.root}>
            {/* app bar */}
            

            {/* side drawer*/}
            <Drawer
            className={classes.drawer}
            variant="permanent"
            anchor="left"
            classes={{paper: classes.drawerPaper}}
            >
                <div>
                    <Typography variant="h5" className={classes.title}>
                     Notes App
                    </Typography>
                </div>
            {/* list links */}
                <List>
                    {menuItems.map(item => (
                        <ListItem 
                        onClick={() => {
                            history.push(item.path)
                        }}
                        button
                        key="item.text"
                        className={
                            location.pathname === item.path ?
                            classes.active:
                            null
                        }>
                            <ListItemIcon >
                                {item.icon}
                            </ListItemIcon>
                            
                            <ListItemText primary={item.text} />
                        </ListItem>
                        
                    ))}
                </List>
            </Drawer>

            <div className={classes.page}>
                {children}
            </div>
        </div>
    )
}

export default Layout
