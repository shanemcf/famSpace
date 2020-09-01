const router = require('express').Router();
const { User, Contact } = require('../models');
const withAuth = require('../utils/auth'); // Authenticate user session middleware.

module.exports = router;