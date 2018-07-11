define([], function() {
    
    var exportObj = {};
    var typeChines=null;
    //bmi 标准值
    var bmiValue = {
        thin:18.4,//偏瘦
        standard: 18.5,//标准
        fat_lv1: 24.0,//偏胖
        super_fat:28.0//肥胖
    }

    exportObj.toMath = function(weight,height){
        var _height = height / 100;//转化为米
        var obj = {};
        obj.bmi = _bmi(weight,_height);
        obj.weight = _weight_with_bmi(_height);
        obj.bmiValue = bmiValue;
        return obj
    }
    
    /**
     * 
     * 身体质量指数（BMI）
     * @param {number} weight 
     * @param {number} height -- m
     * @returns number 截取一位小数
     */
    function _bmi(weight,height){
        
        var _val = weight/(height*height);
        _val = _val.toFixed(2);
        return _val.substring(0,_val.length-1)*1;//截取一位小数
    }

    exportObj.getBodyTypeChinese = function(bmi){
         if(bmi <= bmiValue.thin){
            typeChines="偏轻";
        }else if(bmi >= bmiValue.standard && bmi < bmiValue.fat_lv1){
            typeChines="正常";
        }else if(bmi>=bmiValue.fat_lv1&&bmi <= bmiValue.super_fat){
            typeChines="偏重";
        }else if(bmi >= bmiValue.super_fat){
            typeChines="超重";
        }
        return typeChines;
    }

    /**
     * 根据bmi和身高，算出各个范围的bmi的临界体重
     * 
     * @param {number} height 米
     * @return obj {四舍五入-取整}
     */
    function _weight_with_bmi(height){
        var _obj = {};
        _obj.standard = Math.round(bmiValue.standard * height * height);//标准体重
        _obj.fat_lv1 = Math.round(bmiValue.fat_lv1 * height * height);//偏胖体重
        _obj.fat_lv2 = Math.round(bmiValue.super_fat * height * height);//肥胖体重
        return _obj
    }
    return exportObj;
});