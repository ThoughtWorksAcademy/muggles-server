'use strict';

describe('cart', function () {
  var req_mock;
  var res_mock;
  var trainee_controller = require('../../controllers/trainee');

  beforeEach(function () {
    req_mock = {};
    res_mock = {};
  });

  afterEach(function (done) {
    reloadDatabase(done);
  });

  describe('get_trainee_by_id', function () {

    it('should get trainee by the id of trainee', function (done) {

      req_mock.params = {
        id : '550249080bf4a43115ef2dae'
      };
      res_mock.send = function (object) {

        expect(object.state).to.equal(200);
        expect(object.data.name).to.equal('张志慧');

        done();
      };

      trainee_controller.get_trainee_by_id(req_mock, res_mock);
    });
  });
});
