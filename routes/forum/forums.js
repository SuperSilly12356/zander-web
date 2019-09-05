const express = require('express');
const router = express.Router();
const config = require('../../config.json');

// router.get('/', (req, res, next) => {
//   res.render('forum/forums', {
//     "pagetitle": "Forums"
//   });
// });

router.get('/', (req, res, next) => {
  res.redirect(config.forumlink);
});

module.exports = router;
