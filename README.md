# awsm-backend

This is a basic implementation of Node.js/Express HTTP server for Project AWSM backend.

### Requirements:
* Node.js must be installed

### Installation:

1. Clone repo to local machine.
2. Install node modules to run program: ```npm install```
3. Create ```.env``` file in root directory.
  - ```.env``` example with required defined parameters:
  ```
    PORT=3000
  ```
4. To run server locally, ```npm run start```
5. Make HTTP requests at ```localhost:3000```

### Testing
For testing setup and teardown purposes, the server may need to be started and stopped.  This can be accomplished as such:

```
const server = require('./lib/server.js');
server.start();
server.stop();
```

### CalendarAPI

To use the calendarAPI.js do the following:

1.  Visit https://developers.google.com/calendar/quickstart/nodejs and under Step 1 click the "ENABLE THE GOOGLE CALENDAR API" button. This opens a new dialog. In the dialog, do the following:
  1. Select + Create a new project.
  2. Enter a name for the project and product, ensuring not to use the word "Google", as it's a reserved word.
  3. Download the configuration file.
2. Move the downloaded file to your working directory.
