const { Router } = require('express');
const { CoursesController } = require('../controller/corsiController');
const routerCourses = Router();
const { compare } = require('bcrypt');
const { CommentsController } = require('../controller/commentsController');

// routerCourses.post('/', async (req, res) => {
//     console.log('fsef');
// })

routerCourses.get('/', CoursesController.lista);
routerCourses.get('/:idCorsi', CoursesController.checkId, CoursesController.get);
routerCourses.put('/:idCorsi', CoursesController.checkId, CoursesController.update);
routerCourses.post('/', CoursesController.insert);
routerCourses.delete('/:idCorsi', CoursesController.checkId, CoursesController.delete);

routerCourses.get('/:idCorsi/commenti', CoursesController.checkId, CommentsController.lista);
routerCourses.get('/:idCorsi/commenti/:idCommenti', CoursesController.checkId, CommentsController.checkId, CommentsController.get);
routerCourses.put('/:idCorsi/commenti/:idCommenti', CoursesController.checkId, CommentsController.checkId, CommentsController.update);
routerCourses.post('/:idCorsi/commenti', CoursesController.checkId, CommentsController.insert);
routerCourses.delete('/:idCorsi/commenti/:idCommenti', CoursesController.checkId, CommentsController.checkId, CommentsController.delete);



module.exports = routerCourses;