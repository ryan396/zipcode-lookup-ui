export type Place = {
  "place name": string;
  latitude: string;
  state: string;
  "state abbreviation": string;
};

export type SearchResults = {
  country: string;
  "post code": string;
  "country abbreviation": string;
  places: Place[];
};

export type SearchHistory = {
  result: Place;
  searchCriteria: {
    countryCode: string;
    zipcode: string;
  };
};

export type FormValues = {
  countryCode: string;
  zipcode: string;
};
