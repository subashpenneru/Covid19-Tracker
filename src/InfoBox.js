import React from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';

import './InfoBox.css';

const InfoBox = ({ active, casesType, title, cases, total, ...props }) => {
  return (
    <Card
      onClick={props.onClick}
      className={`infoBox ${active && 'infoBox__border--' + casesType}`}>
      <CardContent>
        <Typography className='infoBox__title' color='textSecondary'>
          {title}
        </Typography>
        <h2 className={`infoBox__cases infoBox--${casesType}`}>{cases}</h2>
        <Typography className='infoBox__total' color='textSecondary'>
          {total}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default InfoBox;
