const bodyParse = require('body-parser').json();

module.exports = router => {
  router.post('*api/free-trial-request', bodyParse, (req, res) => {
    const bodyParams = Object.keys(req.body);
    // Need to validate that bodyParams contains all required params
    if (!bodyParams.length) {
      return res.status(400).send('Bad Request body');
    }
    return res.send('This is the response of the free-trial-request route');
  });
};
