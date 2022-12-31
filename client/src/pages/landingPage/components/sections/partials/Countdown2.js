import React, { useState, useEffect } from 'react';
import moment from 'moment'
import { mapNumber, SVGCircle } from './countdownComp'

import './countdown.scss';

const Countdown2 = (props) => {
    const [time, setTime] = useState({
        days: undefined,
        hours: undefined,
        minutes: undefined,
        seconds: undefined
    })

    useEffect(() => {
        const interval = setInterval(() => {
            const { timeTillDate, timeFormat } = props
            const then = moment(timeTillDate, timeFormat)
            const now = moment()
            const countdown = moment.duration((then.diff(now)))
            const days = Math.floor(countdown.asDays())
            countdown.subtract(moment.duration(days, 'days'))
            const hours = Math.floor(countdown.hours())
            countdown.subtract(moment.duration(hours, 'hours'))
            const minutes = Math.floor(countdown.minutes())
            const seconds = Math.floor(countdown.seconds())
            setTime({ days, hours, minutes, seconds });
        }, 1000);
        return () => clearInterval(interval);
    }, [props])

    const { days, hours, minutes, seconds } = time;
    const daysRadius = mapNumber(days, 30, 0, 0, 360);
    const hoursRadius = mapNumber(hours, 24, 0, 0, 360);
    const minutesRadius = mapNumber(minutes, 60, 0, 0, 360);
    const secondsRadius = mapNumber(seconds, 60, 0, 0, 360);

    if (seconds < 0 || hours < 0 || minutes < 0 || days < 0) {
        return null;
    }

    return (
        <div className='countContainer'>
            <div className='headerContainer'>
                <h3 style={{ color: '#fff' }}>You can withdraw your funds in: </h3>
            </div>
            <div className='countTemp'>
                <div className='countdown-wrapper'>
                    {!!days && (
                        <div className='countdown-item'>
                            <SVGCircle radius={daysRadius} />
                            {days}
                            <span>days</span>
                        </div>
                    )}
                    {!!hours && (
                        <div className='countdown-item'>
                            <SVGCircle radius={hoursRadius} />
                            {hours}
                            <span>hours</span>
                        </div>
                    )}
                    {!!minutes && (
                        <div className='countdown-item'>
                            <SVGCircle radius={minutesRadius} />
                            {minutes}
                            <span>minutes</span>
                        </div>
                    )}
                    {!!seconds && (
                        <div className='countdown-item'>
                            <SVGCircle radius={secondsRadius} />
                            {seconds}
                            <span>seconds</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Countdown2;