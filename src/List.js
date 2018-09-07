import React from "react";
import config from "./config";
import { ListItem } from "./ListItem";

/**
 * Load the cars from the spreadsheet
 * Get the right values from it and assign.
 */
export function load(callback) {
  window.gapi.client.load("sheets", "v4", () => {
    window.gapi.client.sheets.spreadsheets.values
      .get({
        spreadsheetId: config.spreadsheetId,
        range: "Sheet1!A2:C"
      })
      .then(
        response => {
          const data = response.result.values;
          const listings =
            data.map(listing => ({
              message: listing[0],
              image: listing[1],
              contact: listing[2]
            })) || [];
          console.log(response);
          callback(listings);
        },
        response => {
          callback(false, response.result.error);
        }
      );
  });
}

export class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listings: [],
      error: null
    };
  }
  componentDidMount() {
    // 1. Load the JavaScript client library.
    window.gapi.load("client", this.initClient);
  }

  initClient = () => {
    // 2. Initialize the JavaScript client library.
    window.gapi.client
      .init({
        apiKey: config.apiKey,
        // Your API key will be automatically added to the Discovery Document URLs.
        discoveryDocs: config.discoveryDocs
      })
      .then(() => {
        // 3. Initialize and make the API request.
        load(this.onLoad);
      });
  };

  onLoad = (listings, error) => {
    console.log(listings);
    if (listings) {
      this.setState({ listings });
    } else {
      this.setState({ error });
    }
  };

  render() {
    return this.state.listings.map((item, index) => (
      <ListItem item={item} key={index} />
    ));
  }
}
