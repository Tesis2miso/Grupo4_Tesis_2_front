import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import { useTranslation } from "react-i18next";
import { useCallback, useEffect, useState, Fragment } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { Avatar, Input, ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import useToken from '../utils/useToken';
import { toast } from 'react-toastify';
import './Profile.css'
import axios from 'axios';
import { Password } from '@mui/icons-material';
import { Button } from 'react-bootstrap';
import GridProfile from './GridProfile';

function Profile(props) {
    const { t } = useTranslation();
    const [loading, setLoading] = useState(true);
    const [isFirstTime, setIsFirstTime] = useState(true);
    const [specialist, setSpecialist] = useState(null);
    const { getToken } = useToken();
    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));

    const getSpecialist = useCallback(() => {
        let token = getToken();
        axios({
            method: "GET",
            url: `${process.env.REACT_APP_BASE_PATH}/specialist/profile/${localStorage.getItem("id")}`,
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then((response) => {
                const { data } = response;
                setSpecialist(data);
                setLoading(false);
            }).catch((error) => {
                let mssg = error.response.data.msg;
                toast(mssg);
            })
    })

    useEffect(() => {
        if (isFirstTime) {
            setIsFirstTime(false)
            getSpecialist()
        }
    }, [isFirstTime, getSpecialist])

    return (
        <Fragment>
            <Toolbar />
            <Box sx={{ display: 'flex' }}>
                {
                    loading ? (
                        <CircularProgress />
                    ) : (
                        <GridProfile specialist={specialist} />
                    )
                }
            </Box>
        </Fragment>
    );
}

export default Profile;
