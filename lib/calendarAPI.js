const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');

// If modifying these scopes, delete credentials.json.
const SCOPES = ['https://www.googleapis.com/auth/calendar.readonly'];
const TOKEN_PATH = 'token.json';


const calendarAPI = module.exports;

// Load client secrets from a local file.
calendarAPI.getSchedule = async (timeMin, timeMax) =>
  new Promise((resolve, reject) => {
    timeMin = convertDateTime(timeMin);
    timeMax = convertDateTime(timeMax);
    if(!timeMin || !timeMax) return console.log('Error invalid timeMin and/or timeMax');
    const output = [];
    fs.readFile('credentials.json', (err, content) => {
      if (err) return console.log('Error loading client secret file:', err);
      // Authorize a client with credentials, then call the Google Calendar API.
      authorize(JSON.parse(content), listEvents, timeMin, timeMax, output);
    })
    resolve(output);
  });

calendarAPI.createEvent = (event) => {
  fs.readFile('credentials.json', (err, content) => {
    if (err) return console.log('Error loading client secret file:', err);
    authorize(JSON.parse(content), addEvent);
  })
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
function authorize(credentials, callback) {
  const {client_secret, client_id, redirect_uris} = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(
      client_id, client_secret, redirect_uris[0]);
  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) return getAccessToken(oAuth2Client, callback, arguments[2], arguments[3], arguments[4]);
    oAuth2Client.setCredentials(JSON.parse(token));
    callback(oAuth2Client, arguments[2], arguments[3], arguments[4]);
  });
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
function getAccessToken(oAuth2Client, callback) {
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
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
        if (err) console.error(err);
        console.log('Token stored to', TOKEN_PATH);
      });
      callback(oAuth2Client, arguments[2], arguments[3], arguments[4]);
    });
  });
}

/**
 * Lists the events on the user's primary calendar.
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
function listEvents(auth, timeMin, timeMax, output) {
  const calendar = google.calendar({version: 'v3', auth});
  calendar.events.list({
    calendarId: 'primary',
    timeMin: timeMin.toISOString(),
    timeMax: timeMax.toISOString(),
    singleEvents: true,
    orderBy: 'startTime',
  }, (err, res) => {
    if (err) return console.log('The API returned an error: ' + err);
    const events = res.data.items;
    if (events.length) {
      events.map((event, i) => {
        output[i] = {};
        output[i].summary = event.summary;
        output[i].location = event.location;
        output[i].start = event.start.dateTime;
        output[i].end = event.end.dateTime;
      });
      // console.log('Events between:'+timeMin+" and "+timeMax+"\n");
      // console.log(output);
      return output;
    } else {
      console.log('No events found.');
    }
  });
}
