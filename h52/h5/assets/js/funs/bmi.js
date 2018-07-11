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

    exportObj.toMathBmi = function(weight,height){
        var _height = height / 100;//转化为米
        var obj = {};
        obj.bmi = _bmi(weight,_height);
        // obj.weight = _weight_with_bmi(_height);
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
        _val = _val.toFixed(1);
        return _val
    }



    exportObj.getBodyTypeChinese = function(bmi){
         if(bmi <= bmiValue.thin){
            typeChines="偏瘦";
        }else if(bmi >= bmiValue.standard && bmi < bmiValue.fat_lv1){
            typeChines="正常";
        }else if(bmi>=bmiValue.fat_lv1&&bmi <= bmiValue.super_fat){
            typeChines="偏胖";
        }else if(bmi >= bmiValue.super_fat){
            typeChines="肥胖";
        }
        return typeChines;
    }
     /**
     *根据身高 性别判断计算美体体重 健美体重计算公式
     */
     exportObj.BeauBody = function(height,sex){
         var _height = height / 100;//转化为米
         var obj = {};
         if(sex==1){
            obj.beautWeight = (_height*_height*22.8).toFixed(1);
         }else if(sex==2){
            obj.beautWeight = (_height*_height*19.2).toFixed(1);
         }
         return obj
     }
    /*
      标准三围计算公式
     */
    exportObj.standMeasur =function(height){
        var obj = {};
        obj.chest= (height*0.53).toFixed(0);
        obj.waist = ((height*0.5)-13).toFixed(0);
        obj.hipline = (height*0.54).toFixed(0);
        return obj
    }
    /*
    美体三围计算公式
    */
    exportObj.bodyMeasur = function(height){
        var obj = {};
        obj.bChest= ((height*0.53)-5).toFixed(0);
        obj.bWaist = ((height*0.5)-13-5).toFixed(0);
        obj.bHipline = (height*0.54-5).toFixed(0);
        return obj
    }

     //标准体重（SBW）
    // 男性：标准体重 =（身高（cm）－80）× 70%
    // 女性：标准体重 =（身高－70）× 60%
    // 正常体重范围：标准体重正负10%
    /**
     * sex【male--1,female--2】
     */
    exportObj.toMathSBW = function(sex,height){
        var weight = null;
        if(sex==1){
            weight = ((height-80)*0.7).toFixed(1);
        }else if(sex==2){
            weight = ((height-70)*0.6).toFixed(1);
        }
        var weight_min = (weight * 0.9).toFixed(1);
        var weight_max = (weight * 1.1).toFixed(1);
        return {
            weight_min: weight_min,
            weight_max: weight_max,
            weight: weight
        }
    }

      // 燃脂心率 Burning heart rate
     // 年龄 yearsold
     exportObj.toMathBHR = function(yearsold){
        var bhr_min = (220 - yearsold) * 0.6;
        var bhr_max = (220 - yearsold) * 0.75;
        return {
            bhr_min: Math.round(bhr_min),
            bhr_max: Math.round(bhr_max)
        }
    }

    //基础代谢率（BMR）
    //男性：BMR = 10 * 体重（KG）+ 6.25 * 身高（CM）- 5 * 年龄 + 5
    //女性：BMR = 10 * 体重（KG）+ 6.25 * 身高（CM）- 5 * 年龄 – 161
    /**
     * sex【male--1,female--2】
     */
    exportObj.toMathBMR = function(sex,weight,height,yearsold){
        var bmr = null;
        if(sex==1){
            bmr = 10 * weight + 6.25 * height - 5 * yearsold + 5;
        }else if(sex==2){
            bmr = 10 * weight + 6.25 * height - 5 * yearsold - 161;
        }
        bmr = Math.round(bmr);
        return bmr;
    }
    
    exportObj.toBMR = function(sex,weight,height,yearsold, type){
        var bmr = null;

        if (type == 2) {
            if (sex == 1) {
                bmr = (66 + 13.7 * weight + 5*height - 6.8*yearsold) * 1.15; 
            } else {
                bmr = (655.1 + 9.6 * weight + 1.8 * height - 4.7 * yearsold)* 1.15;
            }
        } else if (type == 3) {
            if (sex == 1) {
                bmr = (66 + 13.7 * weight + 5*height - 6.8*yearsold) * 1.55; 
            } else {
                bmr = (655.1 + 9.6 * weight + 1.8 * height - 4.7 * yearsold)* 1.55;
            }
        } else {

            if (sex == 1) {
                bmr = 66 + 13.7 * weight + 5*height - 6.8*yearsold; 
            } else {
                bmr = 655.1 + 9.6 * weight + 1.8 * height - 4.7 * yearsold;
            }
        }
        bmr = Math.round(bmr);
        return bmr;
    }


    return exportObj;
});