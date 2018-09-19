'use strict';

module.exports = router => {
  router.get('*', (req, res) => res.send('No GET routes implemented yet'));
  router.post('*', (req, res) => res.send('No POST routes implemented yet'));
  router.put('*', (req, res) => res.send('No PUT routes implemented yet'));
};



const Router = require('express').Router;
const jsonParser = require('body-parser').json();
const createError = require('http-errors');

const Teacher = require('../model/teacher.js');
const Company = require('../model/student.js');


const studentRouter = module.exports = Router();

studentRouter.post('/api/createStudent', jsonParser, function (req, res, next) {
  debug('POST: /api/createStudent');
  if (!req.body.studentName) return next(createError(400, 'bad request'));

  return new Student(req.body).save()
    .then(student => {
      return res.json(student)
    })
    .catch(next);
});

// studentRouter.post('/api/teacher/:teacherId/student', jsonParser, function (req, res, next) {
//   debug('POST: /api/student');
//   if (!req.body.studentName) return next(createError(400, 'bad request'));

//   Teacher.findByIdAndAddstudent(req.params.teacherId, req.body)
//     .then(student => {
//       if (req.params.teacherId === student.teacherId.toString()) res.json(student);
//     })
//     .catch(next);
// });

studentRouter.put('/api/teacher/:teacherId/student/:studentId', jsonParser, function (req, res, next) {
  debug('PUT: /api/student/:studentId');
  if (!req.body.studentName) return next(createError(400, 'bad request'));
  Student.findByIdAndUpdate(req.params.studentId, req.body, { new: true })
    
    .then(student => {
      if (req.params.teacherId === student.teacherId.toString()) {
        return res.json(student);
      }
    })
    .catch(err => {
      createError(404, err.message);
      next();
    });
});

studentRouter.get('/api/teacher/:teacherId/student/:studentId', function (req, res, next) {
  debug('GET: /api/student/:studentId');

  Student.findById(req.params.studentId)
    .then(student => {
      if (req.params.teacherId === student.teacherId.toString()) {
        return res.json(student);
      }
    })
    .catch(err => {
      createError(404, err.message);
      next();
    });
});
