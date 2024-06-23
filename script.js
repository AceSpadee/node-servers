// fetches the server api
fetch('http://localhost:3001/location', {
    // specifies that the http method is POST
    method: 'POST',
    // tells the server what type of content the server should expect when POST is called
    headers: {
        'content-Type': 'application/json'
    },
    // converts the javascript object containing latitude and longitude into a json string and sets it as the body of the request
    body: JSON.stringify({
        latitude: "#", // setting the latitude
        longitude: "#" // setting the longitude
    })
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));