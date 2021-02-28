const fs = require('fs');

const home = fs.readFileSync(`${__dirname}/../client/home.html`);
const error = fs.readFileSync(`${__dirname}/../client/error.html`);
const css = fs.readFileSync(`${__dirname}/../client/style.css`);

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

const getHome = (request, response) => {
	response.writeHead(200, { 'Content-Type': 'text/html' });
	response.write(home);
	response.end();
};

module.exports.getError = getError;
module.exports.getCSS = getCSS;
module.exports.getHome = getHome;
