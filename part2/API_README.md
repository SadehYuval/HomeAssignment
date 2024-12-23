
# Darkweb Scanner API

This is an API built using Node.js and Express that interacts with the IntelX API
to scan for information related to a given domain.

## Features

- Accepts a domain and checks for any associated data on the dark web.
- Uses the IntelX API to search for dark web records related to the given domain.
- Retrieves search results by polling the IntelX API.
- Returns the search results in a structured JSON format.

## Setup

### Installation

1. Clone the repository to your local machine.
    git clone <repository-url>
    

2. Navigate into the project directory.
    cd part2
    

3. Install dependencies.
    npm install
    


### Running the Application

Start the server by running:
npm start


The API will be accessible at `http://localhost:3000`.

### Available Endpoints

#### `POST /darkweb-scan`

- **Description**: Accepts a domain name in the request body and checks for associated dark web data.
- **Request Body**:
    json
    {
      "domain": "example.com"
    }
    
- **Response**:
    - Success:
    json
    {
      "domain": "example.com",
      "results": [
        {
          "field1": "value1",
          "field2": "value2",
          ...
        }
      ]
    }
    
    - Error:
    json
    {
      "error": "Domain is required"
    }
    

### Example

To check if a domain (e.g., `example.com`) has any dark web data associated with it, send a `POST` request to:


POST http://localhost:3000/darkweb-scan

With the following body:

json
{
  "domain": "example.com"
}

If the domain has any associated data, the server will return a list of records. Otherwise, it will return an error message.

## Troubleshooting

- **Error: "Search ID not returned"**: This may occur if the IntelX API is not returning a valid search ID. Ensure that the domain is valid and that your IntelX API key is correct and active.
- **Error: "Failed to fetch data from the dark web API"**: This may occur if there is an issue with the IntelX API server. Check the API key and ensure your network is not blocking requests.

