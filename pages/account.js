/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
import { parseCookies } from 'nookies';
import React, { useEffect, useState } from 'react';

import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';


function TabPanel(props)
{
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index)
{
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
}));

const Account = () =>
{
    const cookieUser = parseCookies()
    const [user, setUser] = useState({})
    useEffect(() =>
    {
        setUser(cookieUser.user ? JSON.parse(cookieUser.user) : {})
    }, [])

    const classes = useStyles();
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) =>
    {
        setValue(newValue);
    };

    return (
        <>
            <div className='container'>
                <div className="row">

                    <div className="col s3">
                        <div>
                            <img alt={user.username} src={user.image} style={{ width: '250px', height: 'auto' }} />
                            <br />
                            <h6>Name : <b>{user.username}</b></h6>
                            <h6>Email : {user.email}</h6>
                        </div>
                    </div>

                    <div className="col s9">
                        <div>
                            Phone : <b>01234567890</b><br />
                            Address : <b>Commercial Cove, 52, Gulshan -1, Dhaka</b><br />
                            BirthDay : <b>01-01-1970</b><br />
                            Gender : <b>Male</b><br />
                            Username : <b>{user.username}</b><br />
                            Password : <b>**********</b><br />
                        </div>
                        {/* <div className={classes.root}>
                            <AppBar position="static">
                                <Tabs value={value} onChange={handleChange} aria-label="User Tabs">
                                    <Tab label="About" {...a11yProps(0)} />
                                    <Tab label="Personal" {...a11yProps(1)} />
                                </Tabs>
                            </AppBar>
                            <TabPanel value={value} index={0}>
                                <div>
                                    Phone : <b>01234567890</b><br />
                                    Address : <b>Commercial Cove, 52, Gulshan -1, Dhaka</b><br />
                                    BirthDay : <b>01-01-1970</b><br />
                                    Gender : <b>Male</b><br />
                                </div>
                            </TabPanel>
                            <TabPanel value={value} index={1}>
                            </TabPanel>
                        </div> */}
                    </div>

                </div>
            </div>
        </>
    )
}


export async function getServerSideProps(ctx)
{
    const { user, token } = parseCookies(ctx)
    if (!token) {
        const { res } = ctx
        res.writeHead(302, { Location: "/auth/login" })
        res.end()
    }
    return {
        props: {
            user: JSON.parse(user)
        }
    }

}
export default Account