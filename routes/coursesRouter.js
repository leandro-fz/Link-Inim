const { Router } = require('express');
const { CoursesController } = require('../controller/corsiController');
const routerCourses = Router();
const { compare } = require('bcrypt');

// routerCourses.post('/', async (req, res) => {
//     console.log('fsef');
// })

routerCourses.get('/', CoursesController.lista);
routerCourses.get('/:id', CoursesController.checkId, CoursesController.get);
routerCourses.put('/:id', CoursesController.checkId, CoursesController.update);
routerCourses.post('/', CoursesController.insert);
routerCourses.delete('/:id', CoursesController.checkId, CoursesController.delete);



module.exports = routerCourses;