/* eslint-disable react-refresh/only-export-components */
import { memo, useEffect, useState } from 'react';
import moment from 'moment';
import { Typography } from 'antd';

function Clock() {
    const [time, setTime] = useState(new Date());
    
    useEffect(() => {
        let intervalId;

        intervalId = setInterval(() => {
            const newTime = new Date();
            setTime(newTime);
        }, 1000);

        return () => {
            clearInterval(intervalId);
        };
    }, [time]);

    const date = moment(time).format('DD/MM/YYYY');

    return (
        <Typography.Title level={5} style={{margin: 0, color: 'rgb(247 241 234)'}}>{moment(time).format('hh:mm:ss')} - {date}</Typography.Title>
    );
}

export default memo(Clock);