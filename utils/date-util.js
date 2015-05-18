'use strict';

var moment = require('moment');

var DAY = '日';
var WEEK = '周';
var MONTH = '月';
var SEASON_TYPE = '夏季';

var format_date = function(appraise) {

  var result;
  if(appraise.type === DAY) {

    result = moment(appraise.appraised_date).format('YYYY-MM-DD');
  } else if(appraise.type === WEEK) {

    result = moment(appraise.appraised_date).format('W');
  } else if(appraise.type === MONTH) {

    result = moment(appraise.appraised_date).format('YYYY-MM');
  } else {

    result = SEASON_TYPE;
  }
  return result;
};

module.exports = {
  format_date: format_date
};
