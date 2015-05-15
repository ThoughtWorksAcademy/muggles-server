'use strict';

describe('invitation_code_controller', function () {
  var req_mock;
  var res_mock;
  var invitation_code_controller = require('../../controllers/invitation-code');

  beforeEach(function () {
    req_mock = {};
    res_mock = {};
  });

  afterEach(function (done) {
    reloadDatabase(done);
  });

  describe('get_invitation_by_content', function () {

    it('should get invitation code by a exist content ', function (done) {

      var CORRECT_CODE = '邀请码正确';
      req_mock.params = {
        content: '2003967524987'
      };

      res_mock.send = function (object) {

        expect(object.state).to.equal(200);
        expect(object.message).to.equal(CORRECT_CODE);

        done();
      };

      invitation_code_controller.get_invitation_by_content(req_mock, res_mock);
    });
  });
});
