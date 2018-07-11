define([], function() {
    
    var _obj = {};

    // 燃脂心率 Burning heart rate
    // 年龄 yearsold
    _obj.toMath = function(yearsold){
        var bhr_min = (220 - yearsold) * 0.6;
        var bhr_max = (220 - yearsold) * 0.75;
        return {
            bhr_min: Math.round(bhr_min),
            bhr_max: Math.round(bhr_max)
        }
    }
    
    return _obj;
    
});