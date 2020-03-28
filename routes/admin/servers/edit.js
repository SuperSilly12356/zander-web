const express = require('express');
const router = express.Router();
const config = require('../../../config.json');
const database = require('../../../controllers/database.js');

router.get('/', (req, res, next) => {
  if (!req.session.user) {
    res.render('session/login', {
      setValue: true,
      message: 'You cannot access this page unless you are logged in.',
      "pagetitle": "Login"
    });
}});

router.post('/', function (req, res) {
  if (req.session.user) {
    const action = req.body.action;
    const id = req.body.id;
    const name = req.body.name;
    const description = req.body.description;
    const disclaimer = req.body.disclaimer;
    const ipaddress = req.body.ipaddress;
    const position = req.body.position;

    console.log(req.body);

    database.query(`UPDATE servers SET name = ?, description = ?, disclaimer = '${disclaimer}', ipaddress = ?, position = ? WHERE id = ?;`, [name, description, ipaddress, position, id], function (error, results, fields) {
      if (error) {
        res.redirect('/');
        throw error;
      } else {
        res.redirect('/admin/servers');
      };
    });
  } else {
    res.render('session/login', {
      setValue: true,
      message: 'You cannot access this page unless you are logged in.',
      "pagetitle": "Login"
    });
  }
});

module.exports = router;
