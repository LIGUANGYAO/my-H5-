define([], function() {
    
    var _obj = {};

    //基础代谢率（BMR）
    //男性：BMR = 10 * 体重（KG）+ 6.25 * 身高（CM）- 5 * 年龄 + 5
    //女性：BMR = 10 * 体重（KG）+ 6.25 * 身高（CM）- 5 * 年龄 – 161
    /**
     * sex【male--1,female--2】
     */
    _obj.toMath = function(sex,weight,height,yearsold){
        var bmr = null;
        if(sex==1){
            bmr = 10 * weight + 6.25 * height - 5 * yearsold + 5;
        }else if(sex==2){
            bmr = 10 * weight + 6.25 * height - 5 * yearsold - 161;
        }
        bmr = Math.round(bmr);
        return bmr;
    };
    
    return _obj;
    
});