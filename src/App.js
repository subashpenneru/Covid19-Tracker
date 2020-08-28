import React, { useState, useEffect } from 'react';
import {
  FormControl,
  Select,
  MenuItem,
  Card,
  CardContent,
} from '@material-ui/core';

import InfoBox from './InfoBox';
import Map from './Map';
import Table from './Table';
import LineGraph from './LineGraph';
import axios from './axios';
import { sortData, prettyPrintStat } from './util';
import 'leaflet/dist/leaflet.css';
import './App.css';

const App = () => {
  const [countries, setCountries] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [country, setCountry] = useState('worldwide');
  const [countryInfo, setCountryInfo] = useState({});
  const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 });
  const [mapZoom, setMapZoom] = useState(3);
  const [mapCountries, setMapCountries] = useState([]);
  const [casesType, setCasesType] = useState('cases');

  const fetchData = async () => {
    try {
      const res = await axios.get('countries');
      const countries = res.data.map((ctry) => ({
        name: ctry.country,
        value: ctry.countryInfo.iso2,
        id: ctry.countryInfo._id,
      }));

      setCountries(countries);
      setTableData(sortData(res.data));
      setMapCountries(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const getWorldData = async () => {
      try {
        const res = await axios.get('all');

        setCountryInfo(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    getWorldData();
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  const onCountryChange = async (e) => {
    const countryCode = e.target.value;

    const url =
      countryCode === 'worldwide' ? 'all' : `countries/${countryCode}`;

    try {
      const res = await axios.get(url);

      setCountry(countryCode);
      setCountryInfo(res.data);

      const obj = {
        lat: res.data.countryInfo.lat,
        lng: res.data.countryInfo.long,
      };

      setMapCenter(obj);
      setMapZoom(4);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className='app'>
      <div className='app__left'>
        <div className='app__header'>
          <h1>COVID19 TRACKER</h1>
          <FormControl className='app__dropdown'>
            <Select
              variant='outlined'
              value={country}
              onChange={onCountryChange}>
              <MenuItem key='worldwide' value='worldwide'>
                Worldwide
              </MenuItem>
              {countries.map((ctry, i) => (
                <MenuItem key={i} value={ctry.value}>
                  {ctry.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        <div className='app__stats'>
          <InfoBox
            active={casesType === 'cases'}
            casesType='cases'
            title='Coronavirus cases'
            cases={prettyPrintStat(countryInfo.todayCases)}
            total={prettyPrintStat(countryInfo.cases)}
            onClick={() => setCasesType('cases')}
          />
          <InfoBox
            active={casesType === 'recovered'}
            casesType='recovered'
            title='Recovered'
            cases={prettyPrintStat(countryInfo.todayRecovered)}
            total={prettyPrintStat(countryInfo.recovered)}
            onClick={() => setCasesType('recovered')}
          />
          <InfoBox
            active={casesType === 'deaths'}
            casesType='deaths'
            title='Deaths'
            cases={prettyPrintStat(countryInfo.todayDeaths)}
            total={prettyPrintStat(countryInfo.deaths)}
            onClick={() => setCasesType('deaths')}
          />
        </div>

        <Map
          countries={mapCountries}
          casesType={casesType}
          center={mapCenter}
          zoom={mapZoom}
        />
      </div>
      <Card className='app__right'>
        <CardContent>
          <h3>Live Cases WorldWide</h3>
          <Table countries={tableData} />
          <div style={{ marginTop: '10px' }}>
            <h3>Worldwide {casesType} details past 120days</h3>
            <LineGraph casesType={casesType} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default App;
