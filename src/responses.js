// const getRandomNumber = (min, max) => {
// const min2 = Math.ceil(min);
// const max2 = Math.floor(max);
// return Math.floor(Math.random() * (max2 - min2 + 1)) + min2;
// };

// shuffle array taken from: https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
const shuffle = (array) => {
  let currentIndex = array.length;
  let temporaryValue;
  let randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex !== 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
};

// function to handle response
const respond = (request, response, content, type) => {
  response.writeHead(200, { 'Content-Type': type });
  response.write(content);
  response.end();
};

// ALWAYS GIVE CREDIT - in your code comments and documentation
// Source: https://stackoverflow.com/questions/2219526/how-many-bytes-in-a-javascript-string/29955838
// Refactored to an arrow function by ACJ
const getBinarySize = (string) => Buffer.byteLength(string, 'utf8');

// function to change JSON obj to XML
const JSONtoXML = (arr) => {
  let responseXML = '</jokes>';

  for (let x = 0; x < arr.length; x++) {
    const str = `<joke> \n <q> ${arr[x].q} </q> \n <a> ${arr[x].a} </a> \n </joke> `;
    // console.log(str);
    responseXML += str;
    // console.log(responseXML);
  }
  // console.log(responseXML);
  responseXML += '\n </jokes>';
  return responseXML;
};

// function to get random joke
const getRandomJoke = (limit = 1) => {
  const result = [];
  const jokes = [
    {
      q: 'Why did the chicken cross the road?',
      a: 'To get to the other side!',
    },
    {
      q: 'I dont trust stairs',
      a: 'They are always up to something!',
    },
    {
      q: 'Dad, did you get a haircut?',
      a: 'No, I got them all cut!',
    },
    {
      q: 'My wife is really mad at the fact that I have no sense of direction.',
      a: 'So I packed up my stuff and right!',
    },
    {
      q: 'Why wont eggds tell jokes?',
      a: 'They would crack each other up',
    },
    {
      q: 'Why cant a nose be 12 inches long?',
      a: 'Because then it would be a foot!',
    },
    {
      q: 'What concert cost just 45 cents?',
      a: '50 Cent featuring Nickelback!',
    },
    {
      q: 'Why did the math book look so sad?',
      a: 'Becuase of all its problems!',
    },
    {
      q: 'What do you call cheese that is not yours',
      a: 'Nacho Cheese!',
    },
    {
      q: 'Here is a joke for your dogs',
      a: 'woof woof woof? woof woof!',
    },
  ];

  // track the size of the json
  const jsonCount = Object.keys(jokes).length;
  // console.log(jsonCount);
  let templimit;
  // test if the limit is too big for the json
  if (limit > jsonCount) {
    // set limit to max size since it would be greater and user probably wants all the jokes
    templimit = jsonCount;
  } else if (limit < 1) {
    // set limit to 1 because if its 0 then they want no jokes and thats bad cause jokes are good
    templimit = 1;
  } else {
    // set temp limit because should not change param
    templimit = limit;
  }

  // shuffle the array then push it into results
  shuffle(jokes);

  for (let i = 0; i < templimit; i++) {
    result.push(jokes[i]);
  }

  // console.log(jokes[num]);
  return result;
};

const getRandomJokeResponse = (request, response, params, acceptedTypes, httpMethod) => {
  // check that text/xml is in the acceptedTypes array with array.includes
  // console.log(acceptedTypes);

  const jokesJSON = getRandomJoke(params.limit);
  // console.log(httpMethod);

  const jokesXML = JSONtoXML(jokesJSON);
  if (httpMethod === 'GET') {
    if (acceptedTypes.includes('text/xml')) {
      // if is xml return xml
      respond(request, response, jokesXML, 'text/xml');
    } else {
      // if it is json
      respond(request, response, JSON.stringify(jokesJSON), 'application/json');
    }
  } else if (httpMethod === 'HEAD') {
    response.writeHead(200, {
      'Content-Type': acceptedTypes[0],
      'Content-Length': getBinarySize(jokesXML),
    });
    response.end();
  }
};

module.exports.getRandomJokeResponse = getRandomJokeResponse;
