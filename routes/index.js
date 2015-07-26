var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz_controller');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz', errors: [] });
});

router.param('quizId', quizController.load); // autoload :quizId

/* GET quiz index, create a new question, search question by id & get answer by id */
router.get('/quizes', quizController.index);
router.get('/quizes/:quizId(\\d+)', quizController.show);
router.get('/quizes/:quizId(\\d+)/answer', quizController.answer);
router.get('/quizes/new', quizController.new);
router.post('/quizes/create', quizController.create);

/* GET credits page */
router.get('/author', function(req, res) {
  res.render('author', {errors: []});
});


module.exports = router;
