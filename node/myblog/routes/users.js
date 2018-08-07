const express = require('express');
const router = express.Router();

// router.get('/:name', (req, res) => {
//   res.send(`hello express, ${req.params.name}`);
// });

router.get('/:name', (req, res) => {
  // 渲染 ejs 模板
  res.render('users', {
    name: req.params.name,
    supplies: ['mop', 'broom', 'duster']
  })
})

module.exports = router;