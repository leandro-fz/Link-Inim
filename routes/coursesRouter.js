const { Router } = require('express');
const { CoursesController } = require('../controller/corsiController');
const routerCourses = Router();
const { CommentsController } = require('../controller/commentsController');
const checkProfAuth = require('../middlewares/checkAuthProf');
const { QuizController } = require('../controller/quizController');

//mostra tutti i corsi
routerCourses.get('/lista', CoursesController.lista);

//CRUD gestione dei singoli corsi, solo un professore può modificare, creare e eliminare un corso
routerCourses.get('/:idCorsi', CoursesController.checkId, CoursesController.get);
routerCourses.put('/:idCorsi', checkProfAuth, CoursesController.checkId, CoursesController.update);//
routerCourses.post('/', checkProfAuth, CoursesController.insert);//
routerCourses.delete('/:idCorsi', checkProfAuth, CoursesController.checkId, CoursesController.delete);//

// mostra i commenti per i corsi
routerCourses.get('/:idCorsi/commenti', CoursesController.checkId, CommentsController.lista);

//CRUD per la gestione dei commenti relativi a un corso
routerCourses.get('/:idCorsi/commenti/:idCommenti', CoursesController.checkId, CommentsController.checkId, CommentsController.get);
routerCourses.put('/:idCorsi/commenti/:idCommenti', CoursesController.checkId, CommentsController.checkId, CommentsController.update);
routerCourses.post('/:idCorsi/commenti', CoursesController.checkId, CommentsController.insert);
routerCourses.delete('/:idCorsi/commenti/:idCommenti', CoursesController.checkId, CommentsController.checkId, CommentsController.delete);

// CRUD per la gestione dei quiz relativi al corso
routerCourses.get('/:idCorsi/quiz/:idQuiz', CoursesController.checkId, QuizController.checkId, QuizController.get);
routerCourses.put('/:idCorsi/quiz/:idQuiz', checkProfAuth, CoursesController.checkId, QuizController.checkId, QuizController.update);
routerCourses.post('/:idCorsi/quiz', checkProfAuth, CoursesController.checkId, QuizController.insert);
routerCourses.delete('/:idCorsi/quiz/:idQuiz', checkProfAuth, CoursesController.checkId, QuizController.checkId, QuizController.delete);

module.exports = routerCourses;