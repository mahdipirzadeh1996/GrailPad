import React from 'react';

import './footer.scss';
import './logo.css'

const Footer = ({oprn}) => {
    return (
        <div className='footer'>
            <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossOrigin="anonymous" />

            <div className="wrapper">
                <ul>
                    <li data-aos={"fade-down"} data-aos-delay="100" className="telegram"><a href={'https://t.me/Grailpad'} rel="noopener noreferrer" target="_blank"><i className="fa fa-telegram fa" aria-hidden="true"></i>{''}</a></li>
                    <li data-aos={"fade-down"} data-aos-delay="100" className="medium"><a href={'http://grailpad.medium.com'} rel="noopener noreferrer" target="_blank"><i className="fa fa-medium fa" aria-hidden="true"></i>{''}</a></li>
                    <li data-aos={"fade-down"} data-aos-delay="100" className="twitter"><a href={'http://twitter.com/GrailPad_io'} rel="noopener noreferrer" target="_blank"><i className="fa fa-twitter fa" aria-hidden="true"></i>{''}</a></li>
                </ul>
            </div>
        </div>
    )
}


export default Footer;