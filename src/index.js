// console.log('First web service starting up ...');
const http = require('http');
const url = require('url');
const query = require('querystring');

// console.log(query);

const port = process.env.PORT || process.env.NODE_PORT || 3000;

// const { parse } = require('path');
const htmlHandler = require('./htmlResponses.js');
const responseHandler = require('./responses.js');

// fucntion to hnadle post
const handlePost = (request, response, parsedUrl) => {
	// console.dir('in handle');
	// console.dir(parsedUrl.pathname);
	if (parsedUrl.pathname === '/add-quote') {
		const body = [];

		request.on('error', (err) => {
			// console.dir('in err');
			console.dir(err);
			response.statusCode = 400;
			response.end();
		});

		request.on('data', (chunk) => {
			// console.dir('in data');
			body.push(chunk);
		});

		request.on('end', () => {
			// console.dir(body);
			const bodyString = Buffer.concat(body).toString();
			// console.log(bodyString);
			const bodyParams = query.parse(bodyString);
			// console.dir(bodyParams);

			responseHandler.addQuote(request, response, bodyParams);
		});
	}
	// console.dir('outside if');
};

const urlStruct = {
	'/random-quote': responseHandler.getRandomQuoteResponse,
	'/add-quote': responseHandler.addQuote,
	'/': htmlHandler.getHome,
	'/style.css': htmlHandler.getCSS,
	'/motivation.html': htmlHandler.getMotivation,
	'/dog.jpg': htmlHandler.getDog,
	'/admin.html': htmlHandler.getAdmin,
	'/suggestions.html': htmlHandler.getSuggestion,

	// for the calander css and js
	'/full-cal-css.css': htmlHandler.getCalCSS,
	'/full-cal-js.js': htmlHandler.getCalJS,
	notFound: htmlHandler.getError,
};

//fucntion to handle on request
const onRequest = (request, response) => {
	// console.log(request.headers);

	const parsedUrl = url.parse(request.url);
	const { pathname } = parsedUrl;

	// handle POST
	if (request.method === 'POST') {
		// console.dir('in post');
		handlePost(request, response, parsedUrl);
		return;
	}

	const httpMethod = request.method;

	let acceptedTypes = request.headers.accept && request.headers.accept.split(',');
	acceptedTypes = acceptedTypes || [];

	const params = query.parse(parsedUrl.query);
	// const { limit } = params;

	if (pathname === '/') {
		urlStruct[pathname](request, response);
	} else if (pathname === '/style.css') {
		urlStruct[pathname](request, response);
	} else if (pathname === '/motivation.html') {
		urlStruct[pathname](request, response);
	} else if (pathname === '/dog.jpg') {
		urlStruct[pathname](request, response);
	} else if (pathname === '/admin.html') {
		urlStruct[pathname](request, response);
	} else if (pathname === '/suggestions.html') {
		urlStruct[pathname](request, response);
	} else if (pathname === '/random-quote') {
		urlStruct[pathname](request, response, params, acceptedTypes, httpMethod);
	} else if (pathname === '/full-cal-css.css') {
		// for the calenders
		urlStruct[pathname](request, response);
	} else if (pathname === '/full-cal-js.js') {
		// for the calenders
		urlStruct[pathname](request, response);
	} else {
		urlStruct.notFound(request, response);
	}
};

http.createServer(onRequest).listen(port);
// console.log(`Listening on 127.0.0.1: ${port}`);
