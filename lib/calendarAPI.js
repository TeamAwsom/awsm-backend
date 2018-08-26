const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');

// If modifying these scopes, delete credentials.json.
const SCOPES = ['https://www.googleapis.com/auth/calendar'];
const TOKEN = process.env.TOKEN;
const CREDENTIALS = process.env.CREDENTIALS;
const ENV_PATH = "./.env";


const calendarAPI = module.exports;

// Load client secrets from a local file.
calendarAPI.getSchedule = async (timeMin, timeMax, calendarId) => {
  timeMin = convertDateTime(timeMin);
  timeMax = convertDateTime(timeMax);
  if(!timeMin || !timeMax) return console.log('Error: Invalid timeMin and/or timeMax');
  const oAuth2Client = await authorize(JSON.parse(CREDENTIALS));
  return await listEvents(oAuth2Client, timeMin, timeMax, calendarId);
};

calendarAPI.createEvent = async (event, calendarId) => {
  const content = fs.readFileSync(CREDENTIALS);
  const oAuth2Client = await authorize(JSON.parse(content));
  return await addEvent(oAuth2Client, event, calendarId);
};

// Check if value is a proper dateTime
function convertDateTime(d) {
  var timestamp = Date.parse(d);
  if (isNaN(timestamp) == false) return new Date(timestamp);
}

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
async function authorize(credentials) {
  const {client_secret, client_id, redirect_uris} = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);
  // Check if we have previously stored a token.
  try {
    oAuth2Client.setCredentials(JSON.parse(TOKEN));
    return oAuth2Client;
  } catch (err) {
    return getAccessToken(oAuth2Client);
  }
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
function getAccessToken(oAuth2Client) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
  console.log('Authorize this app by visiting this url:', authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question('Enter the code from that page here: ', (code) => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
      if (err) return callback(err);
      oAuth2Client.setCredentials(token);
      // Store the token to disk for later program executions
      fs.appendFileSync(ENV_PATH, "\nTOKEN = "+JSON.stringify(token));
      console.log('Token stored to', ENV_PATH);
    });
    return oAuth2Client;
  });
}

/**
 * Lists the events on the user's primary calendar.
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
async function listEvents(auth, timeMin, timeMax, calendarId) {
  const calendar = await google.calendar({version: 'v3', auth});

  const res = await calendar.events.list({
    calendarId: calendarId,
    timeMin: timeMin.toISOString(),
    timeMax: timeMax.toISOString(),
    singleEvents: true,
    orderBy: 'startTime',
  });
  return res.data;
}

/**
 * Adds an event into the user's primary calendar.
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
async function addEvent(auth, event, calendarId) {
  const calendar = await google.calendar({version: 'v3', auth});
  const res = await calendar.events.insert({
    auth: auth,
    calendarId: calendarId,
    resource: event,
  });
  console.log('Event created: %s', res.data.htmlLink);
  return res.data;
}
