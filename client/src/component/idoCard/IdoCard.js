import React from 'react';
import { Card, CardActionArea, CardContent, CardMedia, Grid, Typography } from '@mui/material';

import './idoCard.scss';
import nullImage from '../../images/null.png';

const IdoCard = ({ item, key }) => {

    const ProjectStatus = () => {
        switch (item.projectStatus) {
            case 1:
                return ('Just an initial idea');
            case 2:
                return ('Idea with White Paper');
            case 3:
                return ('In early development');
            case 4:
                return ('In late stage of development');
            case 5:
                return ('Ready to launch');
            case 6:
                return ('Already launched');
        }
    }
    return (
        <Grid item xs={12} md={6} lg={6} key={key}>
            <Card sx={{ maxWidth: 400 }} style={{ height: '30rem', backgroundColor: 'var(--menu)', borderRadius: '1.375rem' }}>
                <CardActionArea style={{ width: '100%', height: '100%', padding: '2rem' }}>
                    {/* <CardMedia
                        component="img"
                        image={item.logo === null ? nullImage : `http://localhost:8800/public/${item.logo}`}
                        alt={item.projectName}
                    /> */}
                    <div className='idoLogoContain'>
                        <img className='idoLogo' alt='' src={item.logo === null ? nullImage : `http://localhost:8800/public/${item.logo}`} />
                    </div>
                    <div className='contain'>
                        <h2>{item.projectName}</h2>
                        <div className='seperator' />
                        <div className='coinLabel'>
                            <span className='label'>Total Raise: </span>
                            <span className='value'>{item.raise}</span>
                        </div>
                        <div className='coinLabel'>
                            <span className='label'>Network: </span>
                            <span className='value'>{item.network}</span>
                        </div>
                        <div className='coinLabel'>
                            <span className='label'>Status: </span>
                            <span className='value'><ProjectStatus /></span>
                        </div>
                        <div className='coinLabel'>
                            <span className='label'>{item.summary}</span>
                        </div>
                    </div>
                </CardActionArea>
            </Card>
        </Grid>
    )
}

export default IdoCard;