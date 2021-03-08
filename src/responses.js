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
  let responseXML = '</motivation>';

  for (let x = 0; x < arr.length; x++) {
    const str = `<quote> \n <m> ${arr[x].m} </m> \n </quote> `;
    // console.log(str);
    responseXML += str;
    // console.log(responseXML);
  }
  // console.log(responseXML);
  responseXML += '\n </motivation>';
  return responseXML;
};

// function to get random joke
const getRandomQuote = (limit = 1) => {
  const result = [];
  const quotes = [
    {
      m: 'All our dreams can come true, if we have the courage to pursue them.',
      name: 'Walt Disney',
    },
    {
      m: 'The secret of getting ahead is getting started. – Mark Twain',
    },
    {
      m:
				'I’ve missed more than 9,000 shots in my career. I’ve lost almost 300 games. 26 times I’ve been trusted to take the game winning shot and missed. I’ve failed over and over and over again in my life and that is why I succeed. – Michael Jordan',
    },
    {
      m:
				'Don’t limit yourself. Many people limit themselves to what they think they can do. You can go as far as your mind lets you. What you believe, remember, you can achieve. – Mary Kay Ash',
    },
    {
      m: 'The best time to plant a tree was 20 years ago. The second best time is now. – Chinese Proverb',
    },
    {
      m: 'It’s hard to beat a person who never gives up. – Babe Ruth',
    },
    {
      m: 'If people are doubting how far you can go, go so far that you can’t hear them anymore. – Michele Ruiz',
    },
    {
      m:
				'You’ve gotta dance like there’s nobody watching, love like you’ll never be hurt, sing like there’s nobody listening, and live like it’s heaven on earth. ― William W. Purkey',
    },
    {
      m: 'Everything you can imagine is real. ― Pablo Picasso',
    },
    {
      m: 'Do one thing every day that scares you. ― Eleanor Roosevelt',
    },
    {
      m: 'It’s no use going back to yesterday, because I was a different person then. ― Lewis Carroll',
    },
    {
      m: 'Happiness is not something ready made. It comes from your own actions. ― Dalai Lama XIV',
    },
  ];

  // track the size of the json
  const jsonCount = Object.keys(quotes).length;
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
  shuffle(quotes);

  for (let i = 0; i < templimit; i++) {
    result.push(quotes[i]);
  }

  // console.log(jokes[num]);
  return result;
};

const getRandomQuoteResponse = (request, response, params, acceptedTypes, httpMethod) => {
  // check that text/xml is in the acceptedTypes array with array.includes
  // console.log(acceptedTypes);

  const quoteJSON = getRandomQuote(params.limit);
  // console.log(httpMethod);

  const quoteXML = JSONtoXML(quoteJSON);
  if (httpMethod === 'GET') {
    if (acceptedTypes.includes('text/xml')) {
      // if is xml return xml
      respond(request, response, quoteXML, 'text/xml');
    } else {
      // if it is json
      respond(request, response, JSON.stringify(quoteJSON), 'application/json');
    }
  } else if (httpMethod === 'HEAD') {
    response.writeHead(200, {
      'Content-Type': acceptedTypes[0],
      'Content-Length': getBinarySize(quoteXML),
    });
    response.end();
  }
};

module.exports.getRandomQuoteResponse = getRandomQuoteResponse;
