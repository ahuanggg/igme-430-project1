// console.log('First web service starting up ...');
const http = require('http');
const url = require('url');
const query = require('querystring');

// console.log(query);

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const htmlHandler = require('./htmlResponses.js');
const responseHandler = require('./responses.js');

const urlStruct = {
  '/random-joke': responseHandler.getRandomJokeResponse,
  '/style.css': htmlHandler.getCSS,
  '/joke-client.html': htmlHandler.getClient,
  notFound: htmlHandler.getError,
};

const onRequest = (request, response) => {
  // console.log(request.headers);

  const parsedUrl = url.parse(request.url);
  const { pathname } = parsedUrl;

  const httpMethod = request.method;

  let acceptedTypes = request.headers.accept && request.headers.accept.split(',');
  acceptedTypes = acceptedTypes || [];

  const params = query.parse(parsedUrl.query);
  // const { limit } = params;

  if (pathname === '/random-joke') {
    urlStruct[pathname](request, response, params, acceptedTypes, httpMethod);
  } else if (pathname === '/style.css') {
    urlStruct[pathname](request, response);
  } else if (pathname === '/joke-client.html') {
    urlStruct[pathname](request, response);
  } else {
    urlStruct.notFound(request, response);
  }
};

http.createServer(onRequest).listen(port);
// console.log(`Listening on 127.0.0.1: ${port}`);
