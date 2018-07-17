module.exports = router => {
  router.get('*', (req, res) => res.send('No GET routes implemented yet'));
  router.post('*', (req, res) => res.send('No POST routes implemented yet'));
  router.put('*', (req, res) => res.send('No PUT routes implemented yet'));
  router.delete('*', (req, res) =>
    res.send('No DELETE routes implemented yet')
  );
};
