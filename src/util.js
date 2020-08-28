import React from 'react';
import numeral from 'numeral';
import { Circle, Popup } from 'react-leaflet';

export const casesTypeColors = {
  cases: {
    hex: '#CC1034',
    rgb: 'rgb(204, 16, 52)',
    half_op: 'rgba(204, 16, 52, 0.5)',
    multiplier: 800,
  },
  recovered: {
    hex: '#7dd71d',
    rgb: 'rgb(125, 218, 29)',
    half_op: 'rgba(125, 218, 29, 0.5)',
    multiplier: 1200,
  },
  deaths: {
    hex: '#fb4443',
    rgb: 'rgb(251, 68, 67)',
    half_op: 'rgba(251, 68, 67, 0.5)',
    multiplier: 2000,
  },
};

export const sortData = (data) => {
  const sortedData = [...data];

  return sortedData.sort((a, b) => a.cases - b.cases).reverse();
};

export const prettyPrintStat = (stat) =>
  stat ? `+${numeral(stat).format('0.0a')}` : 0;

export const showDataOnMap = (data, casesType = 'cases') =>
  data.map((ctry, i) => (
    <Circle
      key={i}
      center={[ctry.countryInfo.lat, ctry.countryInfo.long]}
      fillOpacity={0.4}
      color={casesTypeColors[casesType].hex}
      fillColor={casesTypeColors[casesType].hex}
      radius={
        Math.sqrt(ctry[casesType]) * casesTypeColors[casesType].multiplier
      }>
      <Popup>
        <div className='info-container'>
          <div
            className='info-flag'
            style={{ backgroundImage: `url(${ctry.countryInfo.flag})` }}
          />
          <div className='info-name'>{ctry.country}</div>
          <div className='info-confirmed'>
            Cases: {numeral(ctry.cases).format('0,0')}
          </div>
          <div className='info-recovered'>
            Recovered: {numeral(ctry.recovered).format('0,0')}
          </div>
          <div className='info-deaths'>
            Deaths: {numeral(ctry.deaths).format('0,0')}
          </div>
        </div>
      </Popup>
    </Circle>
  ));
