import React, { useState, useEffect } from 'react';
import {
  FormControl,
  Card,
  CardContent,
  TextField,
  LinearProgress,
} from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';

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
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    try {
      const res = await axios.get('countries');

      let countries = res.data.map((ctry) => ({
        name: ctry.country,
        value: ctry.countryInfo.iso2,
        id: ctry.countryInfo._id,
      }));

      countries = [{ name: 'Worldwide', value: 'worldwide' }, ...countries];

      setCountries(countries);
      setTableData(sortData(res.data));
      setMapCountries(res.data);
      setIsLoading(false);
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

  const onCountryChange = async (e, ctry) => {
    if (!ctry) {
      return;
    }

    const countryCode = ctry.value;
    const url =
      countryCode === 'worldwide' ? 'all' : `countries/${countryCode}`;

    try {
      const res = await axios.get(url);

      setCountry(countryCode);
      setCountryInfo(res.data);

      let obj;
      if (countryCode !== 'worldwide') {
        obj = {
          lat: res.data.countryInfo.lat,
          lng: res.data.countryInfo.long,
        };
      } else {
        obj = { lat: 34.80746, lng: -40.4796 };
      }

      setMapCenter(obj);
      setMapZoom(4);
    } catch (err) {
      console.error(err);
    }
  };

  if (isLoading) {
    return <LinearProgress />;
  }

  return (
    <div className='app'>
      <div className='app__left'>
        <div className='app__header'>
          <h1>COVID19 TRACKER</h1>
          <FormControl className='app__dropdown'>
            {/* <Select
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
            </Select> */}
            <Autocomplete
              value={country}
              onChange={(e, ctry) => onCountryChange(e, ctry)}
              style={{ width: '150px', backgroundColor: 'white' }}
              options={countries}
              getOptionLabel={(option) =>
                option.name
                  ? option.name
                  : countries.find((ctry) => ctry.value === country).name
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  label='Countries'
                  value={country}
                  variant='outlined'
                />
              )}
            />
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
            <h3>
              {countryInfo.country || 'Worldwide'} {casesType} details past
              120days
            </h3>
            <LineGraph country={country} casesType={casesType} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default App;
