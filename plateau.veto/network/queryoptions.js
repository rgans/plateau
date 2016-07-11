'use strict';

var OPTION_KEYS = {
    FILTER: 'filter',
    SELECT: 'select',
    TOP: 'top',
    SKIP: 'skip',
    ORDERBY: 'order'
};

function isNumeric(v) {
    if(typeof v === 'number')
        return true;
    
    try {
        var iv = parseInt(v);
        if(typeof iv === 'number')
            return true;
    } catch (e) {
        
    }
    
    return false;
};

function QueryOptions(req) {
    
    this.filter = {};
    this.orderBy = {};
    this.select = {};
    this.top = 0;
    this.skip = 0;
    
    this._load(req);
};

QueryOptions.prototype._load = function(req) {
    this._tryLoadFilter(req);
    this._tryLoadOrderBy(req);
    this._tryLoadSelect(req);
    this._tryLoadLimit(req);
};

QueryOptions.prototype._tryLoadFilter = function(req) {
};

QueryOptions.prototype._tryLoadOrderBy = function(req) {
};

QueryOptions.prototype._tryLoadSelect = function(req) {
};

QueryOptions.prototype._tryLoadLimit = function(req) {
    var top = req.query[OPTION_KEYS.TOP];
    if(top && isNumeric(top))
        this.top = parseInt(top);

    var skip = req.query[OPTION_KEYS.SKIP];
    if(skip && isNumeric(skip))
        this.skip = parseInt(skip);
};

module.exports = QueryOptions;