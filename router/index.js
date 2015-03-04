module.exports = function(app, passport) {
  app.use('/api/categories', require('./routes/categories'));
  app.use('/api/users', require('./routes/users')(passport));
  app.use('/api/trainees', require('./routes/trainees')(passport));
};
