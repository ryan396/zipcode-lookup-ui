import { Grid } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import "./App.css";
import SearchHistoryTable from "./components/SearchHistoryTable";
import { Place, SearchHistory } from "./Types";
import Navbar from "./components/Navbar";
import SearchForm from "./components/SearchForm";

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
  const [errorAlertMsg, setErrorAlertMessage] = useState<string>("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    setErrorAlertMessage("");
    e.preventDefault();
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/zipcode/${formValues.countryCode}/${formValues.zipcode}`
      )
      .then((response) => {
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
      .catch((error) => {
        console.log("error", error.response);
        if (error.response.status === 404) {
          setErrorAlertMessage("No results for this search criteria");
        } else {
          setErrorAlertMessage("Server error");
        }
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

  function clearHistory() {
    setZipcodeSearchHistory([]);
  }

  const searchFormProps = {
    handleSubmit,
    handleCountryCodeChange,
    formValues,
    handleZipcodeChange,
    searchResults,
    clearHistory,
    errorAlertMsg,
  };

  return (
    <div className="App">
      <Navbar />
      <div className="App-header">
        <Grid container justifyContent="center">
          <SearchForm {...searchFormProps} />
          <Grid item lg={8} xs={12}>
            <SearchHistoryTable zipcodeSearchHistory={zipcodeSearchHistory} />
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default App;
