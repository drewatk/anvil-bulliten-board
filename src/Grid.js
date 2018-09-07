import React from "react";
import sizeMe from "react-sizeme";
import StackGrid from "react-stack-grid";
import config from "./config";
import { GridItem } from "./GridItem";

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
              date: listing[0],
              message: listing[1],
              contact: listing[2]
            })) || [];
          callback(listings);
        },
        response => {
          callback(false, response.result.error);
        }
      );
  });
}

class Grid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
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
    if (listings) {
      this.setState({ loading: false, listings });
    } else {
      this.setState({ lodading: false, error });
    }
  };

  render() {
    const { loading, error } = this.state;
    const {
      size: { width }
    } = this.props;
    const listings = this.state.listings.map((item, index) => (
      <GridItem item={item} key={index} />
    ));
    return (
      <div>
        {loading && "Loading..."}
        {error && "There was an error loading the bulletin board"}
        <StackGrid columnWidth={width <= 768 ? "100%" : "25%"}>
          {listings}
        </StackGrid>
      </div>
    );
  }
}

export const WithGrid = sizeMe()(Grid);
