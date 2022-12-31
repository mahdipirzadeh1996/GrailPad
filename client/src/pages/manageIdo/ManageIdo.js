import React, { useContext, useEffect } from 'react';
import { Card, CardActionArea, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import BeatLoader from "react-spinners/BeatLoader";
import { css } from "@emotion/react";

import './manageIdo.scss';
import IdoCard from '../../component/idoCard/IdoCard';
import { AuthContext } from '../../context/authContext/AuthContext';
import { AdminIdoContext } from '../../context/adminIdoContext/AdminIdoContext';
import { getAdminIdo } from '../../context/adminIdoContext/apiCalls';

const override = css`
  display: block;
  border-color: red;
`;
const ManageIdo = ({ open }) => {
    const { user } = useContext(AuthContext);
    const { dispatch, isFetching, adminIdo } = useContext(AdminIdoContext);

    useEffect(() => {
        getAdminIdo(user, dispatch);
    }, []);

    return (
        <div className='manageIdo' style={{ marginLeft: open ? '17rem' : '5vw' }}>
            <div className='loaderContainer' style={{ left: open ? 'calc(50% + 10rem)' : 'calc(50% + 5vw)' }}>
                <BeatLoader color={"#fff"} loading={isFetching} css={override} size={20} />
            </div>
            <Grid container spacing={3} className='idoCard'>
                {adminIdo && adminIdo.map((item, index) => (
                    <IdoCard item={item} key={index} />
                ))}
            </Grid>
        </div>
    )
}

export default ManageIdo;