module.exports = function (app, passport) {
  app.use('/api/stations', require('./stations'));
  app.use('/api/users', require('./users')(passport));
  app.use('/api/trainees', require('./trainees')(passport));
  app.use('/api/courses', require('./courses'));
  app.use('/api/trainers', require('./trainers')(passport));
  app.use('/api/checkpoints', require('./checkpoints'));
  app.use('/api/invitation', require('./invitation-code'))
};
