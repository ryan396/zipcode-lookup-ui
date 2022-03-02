import { Grid, TextField, Paper, Button, Typography } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import "./App.css";
import SearchHistoryTable from "./components/SearchHistoryTable";
import { Place, SearchHistory } from "./Types";

function App() {
  const formDefaultValue = {
    countryCode: "us",
    zipcode: "",
  };

  const [formValues, setFormValues] = useState(formDefaultValue);
  const [searchResults, setSearchResults] = useState<Place>();
  const [zipcodeSearchHistory, setZipcodeSearchHistory] = useState<
    SearchHistory[]
  >([]);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log(formValues);
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/zipcode/${formValues.countryCode}/${formValues.zipcode}`
      )
      .then((response) => {
        console.log(response.data);
        setSearchResults(response.data.places[0]);
        const searchHistory = {
          result: response.data.places[0],
          searchCriteria: formValues,
        };
        zipcodeSearchHistory.unshift(searchHistory);
        if (zipcodeSearchHistory.length > 5) {
          zipcodeSearchHistory.pop();
        }
        setZipcodeSearchHistory([...zipcodeSearchHistory]);
        setFormValues(formDefaultValue);
      })
      .catch(() => {
        console.log("error");
      });
  }

  function handleCountryCodeChange(value: string) {
    formValues.countryCode = value;
    setFormValues({ ...formValues });
  }

  function handleZipcodeChange(value: string) {
    formValues.zipcode = value;
    setFormValues({ ...formValues });
  }

  console.log(zipcodeSearchHistory);

  return (
    <div className="App">
      <div className="App-header">
        <Grid container justifyContent="center">
          <Grid item lg={6} xs={12} component={Paper}>
            <form
              onSubmit={(e: React.FormEvent<HTMLFormElement>) =>
                handleSubmit(e)
              }
            >
              <Grid container padding={3}>
                <Grid item xs={2}>
                  <TextField
                    required
                    label="Country Code"
                    inputProps={{ maxLength: 2 }}
                    value={formValues.countryCode}
                    onChange={(e) => {
                      handleCountryCodeChange(e.target.value);
                    }}
                  />
                </Grid>
                <Grid xs={5}>
                  <TextField
                    required
                    label="Zip Code"
                    value={formValues.zipcode}
                    onChange={(e) => {
                      handleZipcodeChange(e.target.value);
                    }}
                  />
                </Grid>
                <Grid xs={3}>
                  <Button type="submit" variant="outlined" size="large">
                    Search
                  </Button>
                </Grid>
              </Grid>
              <Grid item xs={6}>
                <Typography>
                  {searchResults &&
                    `Search Results: ${searchResults["place name"]}, ${searchResults.state}`}
                </Typography>
              </Grid>
            </form>
          </Grid>
          <Grid item lg={12} xs={12}>
            <SearchHistoryTable searchHistory={zipcodeSearchHistory} />
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default App;
