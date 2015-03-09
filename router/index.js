module.exports = function(app, passport) {
  app.use('/api/categories', require('./routes/categories'));
  app.use('/api/users', require('./routes/users')(passport));
  app.use('/api/trainees', require('./routes/trainees')(passport));
  app.use('/api/courses', require('./routes/courses'));
  app.use('/api/trainers', require('./routes/trainers'))
};
