import {
  Grid,
  TextField,
  Paper,
  Button,
  Typography,
  Alert,
} from "@mui/material";
import React from "react";
import { FormValues, Place } from "../Types";

interface Props {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  searchResults: Place | undefined;
  handleCountryCodeChange: (value: string) => void;
  handleZipcodeChange: (value: string) => void;
  formValues: FormValues;
  clearHistory: () => void;
  errorAlertMsg: string;
}

export default function SearchForm({
  handleSubmit,
  handleCountryCodeChange,
  formValues,
  handleZipcodeChange,
  searchResults,
  clearHistory,
  errorAlertMsg,
}: Props) {
  return (
    <Grid item lg={8} xs={12} component={Paper}>
      {errorAlertMsg && <Alert severity="error">{errorAlertMsg}</Alert>}
      <form onSubmit={(e: React.FormEvent<HTMLFormElement>) => handleSubmit(e)}>
        <Grid container padding={3}>
          <Grid item lg={2} xs={6}>
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
          <Grid item lg={5} xs={6}>
            <TextField
              required
              label="Zip Code"
              value={formValues.zipcode}
              onChange={(e) => {
                handleZipcodeChange(e.target.value);
              }}
            />
          </Grid>
          <Grid item lg={3} xs={6}>
            <Button type="submit" variant="outlined">
              Search
            </Button>
          </Grid>
          <Grid item lg={2} xs={6}>
            <Button variant="outlined" color="secondary" onClick={clearHistory}>
              Clear History
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
  );
}
