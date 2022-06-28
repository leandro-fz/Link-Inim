const { Router } = require('express');
const routerCourses = Router();
const { compare } = require('bcrypt');

routerCourses.post('/', async (req, res) => {
    console.log('fsef');
})


module.exports = routerCourses;