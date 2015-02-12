var mongoose = require('mongoose');
var Course = require('Course');

exports.create = function(req, res) {
  var course = new Course();

  course.save(function (err) {
    if(err) {
      return '课程创建失败';
    }


  });
};

exports.show = function (req, res) {
  var course = new Course();
  res.send(course);
};
