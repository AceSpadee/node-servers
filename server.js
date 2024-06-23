// importing the modules
const express = require('express');
const fs = require('fs');
const path = require('path');

// creating an instance for express to run and setting the port to 3001.
const app = express();
const port = 3001;

// adds a piece of middleware to the Express application to parse incoming JSON request bodies.
app.use(express.json());

// constructs an absolute file path to a file named locations.json
const filePath = path.join(__dirname, 'locations.json');

// Check if the File Exists, Create and Write to the File,
if (!fs.existsSync(filePath)) {
    fs.writeFile(filePath, JSON.stringify([]), (err) => {
      if (err) throw err;
    });
  }

// location as a different webpage or a specific URL endpoint that your server responds to can be a helpful analogy.
// In the context of a web application, each endpoint (or route) can be thought of as a different page or service that the server provide
// route handler for post requests. callback function is executed whenever a POST request is made to the /location endpoint.
app.post('/location', (req, res) => {

// uses object destructuring to extract latitude and longitude from the request body. req.body contains the data sent by 
// the client in the body of the POST request.
  const { latitude, longitude } = req.body;

// if statement that says if longitude or latitude is null/ not listed than return a status of 404. else continue
  if (latitude == null || longitude == null) {
    return res.status(400).send('Latitude and longitude are required.');
  }

//  =====================================================================================================================

  // Read the existing locations from the JSON file
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) return res.status(500).send(err.message); // Handle any errors that occur during file reading

    // Parse the JSON data into a JavaScript array
    const locations = JSON.parse(data);

    // Create a new location object
    const newLocation = {
      id: locations.length + 1, // Incremental ID based on array length
      latitude,
      longitude,
      timestamp: new Date().toISOString() // Current timestamp
    };

    // Add the new location to the locations array
    locations.push(newLocation);

    // Convert the updated array back to JSON and write it to the file
    fs.writeFile(filePath, JSON.stringify(locations, null, 2), (err) => {
      if (err) return res.status(500).send(err.message); // Handle any errors that occur during file writing

      res.status(201).send('Location saved successfully!');
    });
  });
});