import React from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';

import { casesTypeColors } from './util';
import './InfoBox.css';

const InfoBox = ({ active, casesType, title, cases, total, ...props }) => {
  let colorObj;

  if (active) {
    colorObj = {
      borderTop: `10px solid ${casesTypeColors[casesType].hex}`,
    };
  }
  return (
    <Card onClick={props.onClick} className='infoBox' style={colorObj}>
      <CardContent>
        <Typography className='infoBox__title' color='textSecondary'>
          {title}
        </Typography>
        <h2 className={`infoBox__${casesType}`}>{cases}</h2>
        <Typography className='infoBox__total' color='textSecondary'>
          {total}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default InfoBox;
