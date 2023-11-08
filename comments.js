// Create web server
// Start the server with "node comments.js"
// Load the page with "http://localhost:3000"

var http = require("http");
var url = require("url");
var fs = require("fs");

// Load the comments from the json file
var comments = JSON.parse(fs.readFileSync("comments.json"));

// Create the server
var server = http.createServer(function (request, response) {
	// Parse the url
	var urlObject = url.parse(request.url, true);
	// Get the query string as an object
	var queryObject = urlObject.query;
	// Get the pathname
	var pathname = urlObject.pathname;
	// If this is a POST request, we want to save the comment
	if (request.method == "POST") {
		// Read the data from the form
		var body = "";
		request.on("data", function (data) {
			body += data;
		});
		// When we have all the data, save the comment
		request.on("end", function () {
			// Parse the body of the form
			var form = JSON.parse(body);
			// Save the comment
			saveComment(form);
			// Redirect to the home page
			response.writeHead(302, {"Location": "/"});
			response.end();
		});
	} else {
		// If this is a GET request, we want to display the home page
		if (pathname == "/") {
			// Display the home page
			displayHomePage(response);
		} else if (pathname == "/comments") {
			// Display the comments page
			displayCommentsPage(response);
		} else {
			// Display an error page
			displayErrorPage(response);
		}
	}
});

// Start the server
server.listen(3000);

// Display the home page
function displayHomePage(response) {
	// Set the content type
	response.writeHead(200, {"Content-Type": "text/html"});
	// Display the home page
	response.write("<!DOCTYPE html>");
	response.write("<html>");
	response.write("<head>");
	response.write("<title>Comments</title>");
	response.write("</head>");
	response.write("<body>");
	response.write("<h1>Comments</h1>");
	response.write("<form method='POST' action='/'>");
	response.write("<p>Name: <input type='text' name='name'></p>");
	response.write("<p>Comment: <textarea name