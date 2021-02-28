const fs = require('fs');

const error = fs.readFileSync(`${__dirname}/../client/error.html`);
const css = fs.readFileSync(`${__dirname}/../client/style.css`);
const jokeclient = fs.readFileSync(`${__dirname}/../client/joke-client.html`);

const getError = (request, response) => {
  response.writeHead(404, { 'Content-Type': 'text/html' });
  response.write(error);
  response.end();
};

const getCSS = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/css' });
  response.write(css);
  response.end();
};

const getClient = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(jokeclient);
  response.end();
};

module.exports.getError = getError;
module.exports.getCSS = getCSS;
module.exports.getClient = getClient;
