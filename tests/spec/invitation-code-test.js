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

    it('should get invitation code by a existed content ', function (done) {

      var CORRECT_CODE = '邀请码正确';
      req_mock.params = {
        content: '2003967524987'
      };

      res_mock.send = function (object) {

        expect(object.state).to.equal(200);
        expect(object.data.content).to.equal('2003967524987');
        expect(object.message).to.equal(CORRECT_CODE);

        done();
      };

      invitation_code_controller.get_invitation_by_content(req_mock, res_mock);
    });

    it('should get {} by a not existed content ', function (done) {

      var ERROR_CODE = '邀请码错误';
      req_mock.params = {
        content: '20039675249870'
      };

      res_mock.send = function (object) {

        expect(object.state).to.equal(404);
        expect(object.message).to.equal(ERROR_CODE);

        done();
      };

      invitation_code_controller.get_invitation_by_content(req_mock, res_mock);
    });
  });
});
