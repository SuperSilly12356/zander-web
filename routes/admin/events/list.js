const express = require('express');
const router = express.Router();
const config = require('../../../config.json');
const database = require('../../../controllers/database.js');
const accounts = require('../../../functions/admin/accounts.js');

router.get('/', (req, res, next) => {
  if (req.session.user) {
    database.query(`SELECT * FROM events;`, function (error, results, fields) {
      if (error) {
        res.redirect('/');
        throw error;
      } else {
        res.render('admin/events/list', {
          "pagetitle": "Administration Panel - Events",
          objdata: results
        });
      };
    });
  } else {
    res.render('session/login', {
      setValue: true,
      message: 'You cannot access this page unless you are logged in.',
      "pagetitle": "Login"
    });
  };
});

router.post('/', function (req, res) {
  if (req.session.user) {
    const action = req.body.action;
    const id = req.body.id;

    if (action === "delete") {
      database.query(`DELETE FROM events WHERE id=?;`, [id], function (error, results, fields) {
        if (error) {
          res.redirect('/');
          throw error;
        } else {
          res.redirect('/admin/events');
        }
      });
    };

    if (action === "edit") {
      database.query(`SELECT * FROM events WHERE id=?;`, [id], function (error, results, fields) {
        if (error) {
          res.redirect('/');
          throw error;
        } else {
          console.log(results);
          res.render('admin/events/edit', {
            "pagetitle": `Administration Panel - Event Editor - ${results[0].eventtitle}`,
            objdata: results
          });
        }
      });
    };
  } else {
    res.render('session/login', {
      setValue: true,
      message: 'You cannot access this page unless you are logged in.',
      "pagetitle": "Login"
    });
  };
});

module.exports = router;
