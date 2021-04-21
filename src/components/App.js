import React, {useState, useEffect} from "react";
import { Card, CardContent, FormControl, MenuItem, Select } from '@material-ui/core';
import {sortData, convertStatToDecimal} from "../Util";
import LineGraph from "./LineGraph";
import InfoBox from "./InfoBox";
import Table from "./Table";
import '../styling/App.css';

//https://corona.lmao.ninja/docs/#/COVID-19%3A%20Worldometers/get_v3_covid_19_countries

function App() {

  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('worldwide'); //store the selected option
  const [countryInfo, setCountryInfo] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [casesType, setCasesType] = useState("cases");
  
  //run a piece of code based on the given information
  useEffect(() => {
    //The code here will run once when the component loads and 
    //when the variable within [] changes and not again
    //sending request to server async and wait for it
    const getCountriesData = async () => {
      await fetch ("https://disease.sh/v3/covid-19/countries").then((response) => response.json()).then((data) => {
        const countries = data.map((country) => (
          {
            name: country.country,
            value:country.countryInfo.iso2
          }
        ));
        
        const sortedData = sortData(data);
        setTableData(sortedData);
        setCountries(countries);
      });
    };
    getCountriesData(); // calling the function
  }, []);

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all").then(response => response.json()).then((data) => {
      setCountryInfo(data);
    });
  }, []);

  const onCountryChange = async(event) => {
    const countryCode = event.target.value; // get the selected value
    setCountry(countryCode); //set the state

    const url = countryCode === 'worldwide' ? 'https://disease.sh/v3/covid-19/all':`https://disease.sh/v3/covid-19/countries/${countryCode}`

    await fetch(url).then(response => response.json()).then((data) => {
      setCountry(countryCode);
      setCountryInfo(data);
      setCasesType("cases");
    });
  };

  return (
    <div className="app">
    <div className="app_left">
    <div className="app_header">
        <h1 data-testid="dashboard-header">Live COVID-19 Statistics</h1>
        <FormControl data-testid="dropdown-button" className = "app_dropdown">
          <Select variant = "outlined" value={country} onChange={onCountryChange}>
          <MenuItem value="worldwide">Worldwide</MenuItem>
          {
            // using jsx to combine HTML with javaScript
            //loop through all countries and show them in the drop down
            countries.map((country)=>(
              <MenuItem data-testid="menuItem" value={country.value}>{country.name}</MenuItem>
            ))
          }
          </Select>
        </FormControl>
      </div>

      <LineGraph casesType={casesType}/>

      <div className="app_stats">
        <InfoBox title="Total Critical Cases" cases={convertStatToDecimal(countryInfo.critical ? countryInfo.critical:"-")}/>
        <InfoBox active={casesType==="cases"} onClick={e => setCasesType('cases')} title="Active Cases Today" cases= {convertStatToDecimal(countryInfo.todayCases ? countryInfo.todayCases:"-")} total={convertStatToDecimal(countryInfo.cases)}/>
        <InfoBox active={casesType==="recovered"} onClick={e => setCasesType('recovered')} title="Recovered Today" cases={convertStatToDecimal(countryInfo.todayRecovered ? countryInfo.todayRecovered:"-")} total={convertStatToDecimal(countryInfo.recovered)}/>
        <InfoBox active={casesType==="deaths"} onClick={e => setCasesType('deaths')} title="Deaths Today" cases={convertStatToDecimal(countryInfo.todayDeaths ? countryInfo.todayDeaths:"-")} total={convertStatToDecimal(countryInfo.cases)}/>
      </div>
    </div>
    
    <div className="app_right">
    <Card className="app_right">
    <CardContent>
          <h3 data-testid="table-header">Country wise statistics</h3>
          <Table countries={tableData}/>
    </CardContent>
    </Card>
    </div>

    </div>
  );
}

export default App;
