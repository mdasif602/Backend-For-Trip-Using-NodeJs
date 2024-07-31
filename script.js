const http = require('http');
const url = require('url');
// Define the hostname and port
const port = 3000;
const cities = ["Jayant", "Waidhan", "Siwan", "Bhilai"];
// Create the server
const server = http.createServer((req, res) => {
    const {url: URL, method}  = req;
    const parsed = url.parse(req.url, true);

    const parsedUrl = parsed.pathname;
    const id = parsed.query.id;
    // console.log(parsedUrl);
    // console.log(URL, method);

    if (parsedUrl == "/greet") {
        const data = ["Hello, Good Morning how are you"];
        console.log(parsedUrl);
        res.end(JSON.stringify(data));
    }
    else if (parsedUrl == "/cities") {
        res.end(JSON.stringify(cities));
        console.log(parsedUrl);
        console.log("This is a api call to get all cities It is GET method");
    }
    else if (parsedUrl == "/cities/update") {
        console.log("This is a update call for a city it is PUT method");
        console.log(parsedUrl, "id is", id);
        res.end("Success");
    }
    else if (parsedUrl == "/cities/delete") {
        console.log(parsedUrl, id);
        console.log("This is a call to delete a city from city it is of DELETE method");
        res.end("Success");
    }
    else if (parsedUrl == "/cities/add") {
        console.log(parsedUrl);
        console.log("This is a add call for a city it is of ADD method");
        res.end("Success");
    } else {
        res.writeHead(404, {'Content-Type': 'application.json'});
        const result = {
            success: false,
            message: "API NOT FOUND"
        }
        res.end(JSON.stringify(result));
    }
});

// Start the server
server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
