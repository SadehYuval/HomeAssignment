require('dotenv').config();
const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000;

// IntelX API Configuration
const API_BASE_URL = 'https://2.intelx.io/';
const API_KEY = process.env.INTELX_API_KEY;

app.use(express.json());

// Our API endpoint to scan for dark web data
app.post('/darkweb-scan', async (req, res) => {
    const { domain } = req.body;

    if (!domain) {
        return res.status(400).json({ error: "Domain is required" });
    }

    try {
        // The process starts with a POST request to /intelligent/search with the relevant domain.
        const searchResponse = await axios.post(`${API_BASE_URL}intelligent/search`, {
            term: domain,
            maxresults: 10,
            timeout: 10000,
        }, {
            headers: {
                'x-key': API_KEY,
            }
        });

        const searchId = searchResponse.data.id; // Pull the search ID from the response for later use

        if (!searchId) {
            return res.status(400).json({ error: "Search ID not returned" });
        }

        // Function to handle the wait time for the response
        const pollResults = async (searchId) => {
            const delay = 400; // Documentation suggests 400ms delay
            let attempts = 0;
            const maxAttempts = 5; // In case it took a little longer to get results
            

            while (attempts < maxAttempts) {
                try {
                    // Use the search ID to get the search results from /intelligent/search/result
                    const resultsResponse = await axios.get(`${API_BASE_URL}intelligent/search/result`, {
                        params: {
                            id: searchId,
                        },
                        headers: {
                            'x-key': API_KEY,
                        }
                    });

                    // If we got a result
                    if (resultsResponse.data.records) {
                        return resultsResponse.data.records;
                    }
                } catch (error) {
                    console.error(`Attempt ${attempts + 1}: Error querying dark web API`, error.response ? error.response.data : error.message);
                }

                attempts++;
                if (attempts < maxAttempts) {
                    console.log(`Retrying... Attempt ${attempts + 1}`);
                    await new Promise(resolve => setTimeout(resolve, delay));
                }
            }

            throw new Error('Max attempts reached without getting results');
        };

        const results = await pollResults(searchId);

        res.status(200).json({
            domain,
            results
        });

    } catch (error) {
        console.error("Error querying dark web API:", error);
        res.status(500).json({ error: "Failed to fetch data from the dark web API", details: error.response ? error.response.data : error.message });
    }
});

app.listen(port, () => {
    console.log(`Darkweb Scanner API is running on http://localhost:${port}`);
});
