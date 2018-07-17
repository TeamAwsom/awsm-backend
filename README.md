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