const { Router } = require('express');
const { CoursesController } = require('../controller/corsiController');
const routerCourses = Router();
const { compare } = require('bcrypt');
const { CommentsController } = require('../controller/commentsController');
const checkProfAuth = require('../middlewares/checkAuthProf');

// routerCourses.post('/', async (req, res) => {
//     console.log('fsef');
// })

routerCourses.get('/', CoursesController.lista);
routerCourses.get('/:idCorsi', CoursesController.checkId, CoursesController.get);
routerCourses.put('/:idCorsi', checkProfAuth, CoursesController.checkId, CoursesController.update);//
routerCourses.post('/', checkProfAuth, CoursesController.insert);//
routerCourses.delete('/:idCorsi', checkProfAuth, CoursesController.checkId, CoursesController.delete);//

routerCourses.get('/:idCorsi/commenti', CoursesController.checkId, CommentsController.lista);
routerCourses.get('/:idCorsi/commenti/:idCommenti', CoursesController.checkId, CommentsController.checkId, CommentsController.get);
routerCourses.put('/:idCorsi/commenti/:idCommenti', CoursesController.checkId, CommentsController.checkId, CommentsController.update);
routerCourses.post('/:idCorsi/commenti', CoursesController.checkId, CommentsController.insert);
routerCourses.delete('/:idCorsi/commenti/:idCommenti', CoursesController.checkId, CommentsController.checkId, CommentsController.delete);



module.exports = routerCourses;