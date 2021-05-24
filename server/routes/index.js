const express = require('express');
const router = express.Router();

router.get("/algorithms", (req, res) => {
    res.send({algorithms: true});
});

router.get("/jobs", (req, res) => {
    res.send({jobs: true});
});

router.get("/projects", (req, res) => {
    res.send({projects: true});
});

module.exports = router;
