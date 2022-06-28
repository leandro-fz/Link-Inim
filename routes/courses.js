const { Router } = require('express');
const { CoursesController } = require('../controller/corsiController');
const routerCourses = Router();
const { compare } = require('bcrypt');

// routerCourses.post('/', async (req, res) => {
//     console.log('fsef');
// })

routerCourses.get('/', CoursesController.lista);
routerCourses.get('/:id', CoursesController.get);
routerCourses.put('/:id', CoursesController.update);
routerCourses.post('/', CoursesController.insert);
routerCourses.delete('/:id', CoursesController.delete)



module.exports = routerCourses;