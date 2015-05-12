'use strict';

var _ = require('lodash');
var date_util = require('../utils/date-util');

var mongoose = require('mongoose');
var Trainee = mongoose.model('Trainee');
var Appraise = mongoose.model('Appraise');
var Group = mongoose.model('Group');
var Trainer = mongoose.model('Trainer');

var TRAINEE_EXISTED = '学生存在';
var REGISTER_SUCCESS = '注册成功';
var APPRAISE_ADD_SUCCESS = '添加评价成功';
var APPRAISED_ALREADY = '该学生评价已存在';

var get_trainee_by_id = function (req, res, next) {

  Trainee.findById(req.params.id)
    .populate('appraises')
    .populate('groups')
    .exec()
    .then(function (trainee) {
      return Group.populate(trainee, 'appraises.group');
    })
    .then(function (trainee) {
      return Trainer.populate(trainee, 'appraises.appraiser')
    })
    .then(function (trainee) {
      res.send({state: 200, data: trainee, message: TRAINEE_EXISTED})
    })
    .onReject(function (err) {

      next(err);
    })
};

var verify_trainee_by_email = function (req, res, next) {

  var email = req.params.email;
  Trainee.findOne({email: email})
    .exec()
    .then(function (trainee) {

      if (trainee) {
        res.send({state: 200, data: false, message: '邮箱可用'})
      } else {
        res.send({state: 200, data: true, message: '邮箱已被注册'})
      }
    })
    .onReject(function (err) {

      next(err);
    })
};

var create_trainee = function (req, res, next) {

  var trainee = req.body;

  Trainee.create(trainee)
    .then(function (trainee) {
      res.send({state: 200, data: trainee, message: REGISTER_SUCCESS})
    })
    .onReject(function (err) {

      next(err);
    })
};

var has_appraised = function (req, res, next) {

  var trainee_id = req.params.id;
  var current_appraise = req.body.appraise;
  current_appraise.appraised_date = date_util.format_date(current_appraise);

  Trainee.findById(trainee_id)
    .populate('appraises')
    .exec()
    .then(function (trainee) {

      var new_trainee = trainee;
      new_trainee.appraises = trainee.appraises.filter(function (appraise) {
        return appraise.type === current_appraise.type && appraise.group === current_appraise.group;
      });
      return new_trainee;
    })
    .then(function (trainee) {

      trainee.appraises.forEach(function (appraise) {
        appraise.appraised_date = date_util.format_date(appraise.appraised_date);
      });
      return trainee;
    })
    .then(function (trainee) {

      var result = _.find(trainee.appraises, function (appraise) {
        return appraise.appraised_date === current_appraise.appraised_date
      });

      if (!result) {
        res.send({state: 200, data: true, message: '已评价'})
      } else {
        res.send({state: 200, data: false, message: '还未评价'})
      }
    })
    .onReject(function (err) {

      next(err);
    })
};

var add_appraise = function (req, res, next) {

  var trainee_id = req.params.id;
  var appraise = req.body;
  appraise.appraiser = req.session.currentUserId;
  have_appraised(trainee_id, appraise, function (result){
    console.log(result);

    if(result) {
      console.log(result);
    }
  });

  //Appraise.create(appraise)
  //  .then(function (appraise) {
  //
  //    return Trainee.findById(trainee_id, function (err, trainee) {
  //      trainee.appraises.push(appraise._id);
  //      trainee.save();
  //      res.send({state: 200, data: trainee, message: APPRAISE_ADD_SUCCESS});
  //    });
  //  })
  //  .onReject(function (err) {
  //    next(err);
  //  });
};

function have_appraised(trainee_id, appraise, callback) {
  var result = false;
  return Trainee.findById(trainee_id)
    .populate('appraises')
    .exec()
    .then(function (trainee) {
      trainee.appraises.forEach(function (one) {
        if(one.type === appraise.type && one.date === appraise.date && appraise.group === one.group) {
          result =  true;
          callback(result);
          return result;
        }
      });
    });
}
//router.put('/:id/appraise', function (req, res, next) {
//
//  var trainee_id = req.params.id;
//  var appraise = req.body;
//  appraise.appraiser = req.session.currentUserId;
//
//  var have_appraised = false;
//  Trainee.findById(trainee_id)
//    .populate('appraises')
//    .exec()
//    .then(function (trainee) {
//      trainee.appraises.forEach(function (one) {
//        if (one.type === appraise.type && one.date === appraise.date) {
//          have_appraised = true;
//        }
//      });
//    })
//    .onReject(function (err) {
//      next(err);
//    });
//
//  if (have_appraised) {
//    res.send({state: 200, data: {}, message: APPRAISED_ALREADY});
//    return;
//  }
//
//  Appraise.create(appraise)
//    .then(function (appraise_entity) {
//      return Trainee.findById(trainee_id, function (err, trainee) {
//        trainee.appraises.push(appraise_entity._id);
//        trainee.save();
//        res.send({state: 200, data: trainee, message: APPRAISE_ADD_SUCCESS});
//      });
//    })
//    .then(function (trainee) {
//
//      return Group.populate(trainee, 'appraises.group');
//    })
//    .then(function (trainee) {
//
//      return Trainer.populate(trainee, 'appraises.appraiser')
//    })
//    .then(function (trainee) {
//
//      //res.send({state: 200, data: trainee, message: ''})
//    })
//    .onReject(function (err) {
//      next(err);
//    });
//});
var add_appraises = function (req, res, next) {
  var appraiser = req.session.currentUserId;
  var appraised_date = req.body.appraise.appraised_date;
  var type = req.body.appraise.type;
  var trainees = req.body.trainees;
  trainees.forEach(function (trainee) {
    trainee.appraise.appraised_date = appraised_date;
    trainee.appraise.type = type;
    trainee.appraise.appraiser = appraiser;

    Appraise.create(trainee.appraise)
      .then(function (appraise) {
        return Trainee.findById(trainee._id, function (err, trainee) {
          //TODO 根据type和date检查唯一性，即应该再次判断该学生是否已经添加了此种类型的当天评价
          trainee.appraises.push(appraise._id);
          trainee.save();
        })
      })
  });
  res.send({state: 200, data: trainees, message: APPRAISE_ADD_SUCCESS});
};

module.exports = {
  get_trainee_by_id: get_trainee_by_id,
  verify_trainee_by_email: verify_trainee_by_email,
  create_trainee: create_trainee,
  has_appraised: has_appraised,
  add_appraise: add_appraise,
  add_appraises: add_appraises
};
