'use strict';

var date_util = require('../../utils/date-util');

describe('date_util', function() {

  it('should have a format_date method and it can return a formated day date', function() {

    var appraise = {
      type: '日',
      appraised_date: new Date(2015, 4, 15)
    };
    var result = date_util.format_date(appraise);
    expect(result).to.equal('2015-05-15');
  });

  it('should have a format_date method and it can return a formated week date', function() {

    var appraise = {
      type: '周',
      appraised_date: new Date(2015, 4, 15)
    };
    var result = date_util.format_date(appraise);
    expect(result).to.equal('20');
  });
});
