'use strict';

module.exports = router => {
  router.get('*', (req, res) => res.send('No GET routes implemented yet'));
  router.post('*', (req, res) => res.send('No POST routes implemented yet'));
  router.put('*', (req, res) => res.send('No PUT routes implemented yet'));
};



const Router = require('express').Router;
const jsonParser = require('body-parser').json();
const createError = require('http-errors');
// const debug = require('debug')('job-seeker: student-router');

const Teacher = require('../model/teacher.js');
const Company = require('../model/student.js');
// cons = require('../lib/bearer-auth-middleware.js');

const studentRouter = module.exports = Router();

studentRouter.post('/api/teacher/:teacherId/createStudent', jsonParser, function (req, res, next) {
  debug('POST: /api/teacher/:teacherId/createStudent');
  if (!req.body.studentName) return next(createError(400, 'bad request'));

  Teacher.findByIdAndAddstudent(req.params.teacherId, req.body)
    .then(student => {
      if (req.params.teacherId === student.teacherId.toString()) res.json(student);
    })
    .catch(next);
});

studentRouter.post('/api/teacher/:teacherId/student', jsonParser, function (req, res, next) {
  debug('POST: /api/student');
  if (!req.body.studentName) return next(createError(400, 'bad request'));

  Teacher.findByIdAndAddstudent(req.params.teacherId, req.body)
    .then(student => {
      if (req.params.teacherId === student.teacherId.toString()) res.json(student);
    })
    .catch(next);
});

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

// studentRouter.get('/api/student/:studentId', function(req, res, next) {
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

// studentRouter.get('/api/teacher/:teacherId/student', function (req, res, next) {
//   debug('GET: /api/teacher/:teacherId/student');

//   Profile.findById(req.params.teacherId)
//     .then(companies => {
//       return res.json(companies);
//     })
//     .catch(err => next(createError(404, err.message)));
// });

// studentRouter.delete('/api/teacher/:teacherId/student/:studentId', function (req, res, next) {
//   debug('DELETE: /api/teacher/:teacherId/student/:studentId');

//   Profile.findByIdAndRemovestudent(req.params.teacherId, req.params.studentId)
//     .then(teacher => {
//       return teacher;
//     })
//     .then(() => {
//       return student.findByIdAndRemove(req.params.studentId);
//     })
//     .then(() => {
//       return res.sendStatus(204);
//     })
//     .catch(next);
// });