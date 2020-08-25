const express = require('express');
const router = express.Router();
const config = require('../config.json');
const fetchUrl = require("fetch").fetchUrl;
const { Octokit } = require("@octokit/core");
const octokit = new Octokit({ auth: `${process.env.githubuserapitoken}` });

router.get('/', async(req, res, next)  => {
  res.send('Working on page still, GitHub API go bruh.');

  const response = await octokit.request('GET /repos/{owner}/{repo}/contents/TDM?{ref}', {
    owner: 'craftingforchrist',
    repo: 'Maps',
    ref: 'master'
  });

  const resdata = response.data;
  var i;
  for (i = 0; i < resdata.length; i++) {
    console.log(
      `${resdata[i].name}\n${resdata[i].url}`
    );

    console.log(`\n\n`);

    
  }
});

module.exports = router;
