const fs = require('fs');

const home = fs.readFileSync(`${__dirname}/../client/home.html`);
const error = fs.readFileSync(`${__dirname}/../client/error.html`);
const css = fs.readFileSync(`${__dirname}/../client/style.css`);
const motivation = fs.readFileSync(`${__dirname}/../client/motivation.html`);
const recipe = fs.readFileSync(`${__dirname}/../client/recipe.html`);
const admin = fs.readFileSync(`${__dirname}/../client/admin.html`);
const dog = fs.readFileSync(`${__dirname}/../client/dog.jpg`);

//for the calender
const calcss = fs.readFileSync(`${__dirname}/../client/fullcal/main.css`);
const caljs = fs.readFileSync(`${__dirname}/../client/fullcal/main.js`);

const getMotivation = (request, response) => {
	response.writeHead(200, { 'Content-Type': 'text/html' });
	response.write(motivation);
	response.end();
};

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

const getDog = (request, response) => {
	response.writeHead(200, { 'Content-Type': 'image/jpg' });
	response.write(dog);
	response.end();
};
const getRecipe = (request, response) => {
	response.writeHead(200, { 'Content-Type': 'text/html' });
	response.write(recipe);
	response.end();
};

const getAdmin = (request, response) => {
	response.writeHead(200, { 'Content-Type': 'text/html' });
	response.write(admin);
	response.end();
};

const getCalCSS = (request, response) => {
	response.writeHead(200, { 'Content-Type': 'text/css' });
	response.write(calcss);
	response.end();
};

const getCalJS = (request, response) => {
	response.writeHead(200, { 'Content-Type': 'application/javascript' });
	response.write(caljs);
	response.end();
};

module.exports.getError = getError;
module.exports.getCSS = getCSS;
module.exports.getHome = getHome;
module.exports.getMotivation = getMotivation;
module.exports.getDog = getDog;
module.exports.getAdmin = getAdmin;
module.exports.getRecipe = getRecipe;

//for the calender
module.exports.getCalCSS = getCalCSS;
module.exports.getCalJS = getCalJS;
