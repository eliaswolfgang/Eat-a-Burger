const express = require('express');
const router = express.Router();
const burger = require('../models/burger.js');

// Create all our routes and set up logic within those routes where required.
router.get('/', (req, res) => {
  burger.all((data) => {
    const hbs = {
      burger: data,
    };
    res.render('index', hbs);
  });
});

router.post('/api/burgers', (req, res) => {
  burger.insert(['burger_name', 'devoured'], [req.body.name, req.body.devoured], (result) => {
    res.json({ id: result.id });
  });
});

router.put('/api/burgers/:id', (req, res) => {
  const condition = `id = ${req.params.id}`;
  burger.update(
    {
      devoured: req.body.devoured,
    },
    condition,
    (result) => {
      if (result.affectedRows === 0) {
        // No burger with that ID exists, 404
        return res.status(404).end();
      }
      res.status(200).end();
    }
  );
});

 router.delete('/api/burgers/:id', (req, res) => {
   const condition = `id = ${req.params.id}`;
   burger.delete(condition, (result) => {
    if (result.affectedRows === 0) {
      // No burger with that ID exists, 404
      return res.status(404).end();
    }
    res.status(200).end();
   });
 });

// Export routes for server
module.exports = router;
