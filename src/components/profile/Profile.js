import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import { useCallback, useEffect, useState, Fragment } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import useToken from '../utils/useToken';
import { toast } from 'react-toastify';
import './Profile.css'
import axios from 'axios';
import GridProfile from './GridProfile';

function Profile(props) {
    const [loading, setLoading] = useState(true);
    const [isFirstTime, setIsFirstTime] = useState(true);
    const [specialist, setSpecialist] = useState(null);
    const { getToken } = useToken();

    const getSpecialist = useCallback(() => {
        let token = getToken();
        axios({
            method: "GET",
            url: `http://dermoapp-server.eba-u5i6h72y.us-east-1.elasticbeanstalk.com/specialist/profile/${localStorage.getItem("id")}`,
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
