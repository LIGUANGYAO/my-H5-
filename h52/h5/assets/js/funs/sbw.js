define([], function() {
    
    var _obj = {};

    //标准体重（SBW）
    // 男性：标准体重 =（身高（cm）－80）× 70%
    // 女性：标准体重 =（身高－70）× 60%
    // 正常体重范围：标准体重正负10%
    /**
     * sex【male--1,female--2】
     */
    _obj.toMath = function(sex,height){
        var weight = null;
        if(sex==1){
            weight = (height-80)*0.7;
        }else if(sex==2){
            weight = (height-70)*0.6;
        }
        var weight_min = weight * 0.9;
        var weight_max = weight * 1.1;
        return {
            weight_min: Math.round(weight_min),
            weight_max: Math.round(weight_max),
            weight: Math.round(weight)
        }
    }
    
    return _obj;
});