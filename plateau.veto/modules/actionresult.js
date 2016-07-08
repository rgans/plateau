'use strict';

function ActionResult(content) {
    this.content = content;
};

ActionResult.prototype.setStatusCode = function(status) {
    this.statusCode = status;
};

module.exports = ActionResult;