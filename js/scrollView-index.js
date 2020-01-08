function view(selector,attr,beforeoutfn,afteroutfn,infn) {

    if(typeof selector=="string") {
        var obj = document.querySelector(selector);
    }else{
        var obj=selector;

    }
    if(obj.disable){
        return;
    }
    var start=attr.start;
    var end=attr.end;
    var begin=attr.begin
    var finish=attr.finish
    var shuxing=attr.attr
    var top=attr.top;
    var background=attr.background;
    var unit=attr.unit||"px";
    var flag=attr.flag===false?false:true;

    var sulv=attr.sulv||1

    var speed =(finish-begin)/(end-start)*(top-start);

    if(top<=start){
        if(obj.beforeOutFnOne){
            if(!obj.beforeOutFnOne){
                beforeoutfn.call(obj,attr,obj)
                obj.beforeOutFnOne=true;
                obj.inFnOne=false;
            }

        }else {
            if (beforeoutfn) {
                beforeoutfn.call(obj,attr,obj)
            }
        }
        if(!flag){
            return;
        }

        obj.flag=true;

        var index = shuxing.indexOf(":")
        if(index>-1){
            var shu = shuxing.slice(0, index);
            var val = shuxing.slice(index + 1)
            var originshu = obj.style.transform;
            var originArr = [];
            var beginArr=begin.slice(1,-1).split(",");
            var beginstr=""
            for(var i=0;i<beginArr.length;i++){
                if(val.indexOf("scale")>-1) {
                    beginstr += beginArr[i]+","
                }else if(val.indexOf("rotate")>-1){
                    beginstr += beginArr[i]+"deg,"

                }else if(val.indexOf("translate")>-1){
                    beginstr += beginArr[i]+unit+","
                }else {
                    beginstr += beginArr[i]+"deg,"
                }
            }
            if (originshu) {
                originshu = originshu.replace(/,\s*/g, ",")
                originArr = originshu.split(" ");
            }
            for (var i = 0; i < originArr.length; i++) {
                if (originArr[i].indexOf(val) > -1) {
                    originArr[i] = val +"("+beginstr.slice(0,-1)+")";
                    break
                }
            }

            val = originArr.join(" ");
            obj.style[shu] = val;


        }else{
            if (shuxing == "opacity") {
                obj.style[shuxing] = begin ;
            } else{

                obj.style[shuxing] = begin + unit
            }
        }


    }

    if(top>end){
        if(obj.afterOutFnOne){
            if(!obj.afterOutFnOne){
                afteroutfn.call(obj,attr,obj)
                obj.afterOutFnOne=true;
                obj.inFnOne=false;
            }

        }else {
            if (afteroutfn) {
                afteroutfn.call(obj,attr,obj)
            }
        }
        if(!flag){
            return;
        }


        var index = shuxing.indexOf(":");
        if(index>-1){
            var shu = shuxing.slice(0, index);
            var val = shuxing.slice(index + 1)
            var originshu = obj.style.transform;
            var originArr = [];
            var beginArr=finish.slice(1,-1).split(",");
            var beginstr=""
            for(var i=0;i<beginArr.length;i++){
                if(val.indexOf("scale")>-1) {
                    beginstr += beginArr[i]+","
                }else if(val.indexOf("rotate")>-1){
                    beginstr += beginArr[i]+"deg,"

                }else if(val.indexOf("translate")>-1){
                    beginstr += beginArr[i]+unit+","
                }else {
                    beginstr += beginArr[i]+"deg,"
                }
            }
            if (originshu) {
                originshu = originshu.replace(/,\s*/g, ",")
                originArr = originshu.split(" ");
            }
            for (var i = 0; i < originArr.length; i++) {
                if (originArr[i].indexOf(val) > -1) {
                        originArr[i] = val +"("+beginstr.slice(0,-1)+")";
                    break;
                }
            }



            val = originArr.join(" ");

            obj.style[shu] = val;


        }else{
            if (shuxing == "opacity") {
                obj.style[shuxing] = finish ;
            }else{

                obj.style[shuxing] = finish + unit
            }
        }



    }




        if (top > start && top < end) {
            if (obj.inFnOne) {
                if (!obj.inFnOne) {
                    infn.call(obj, attr, obj)
                    obj.inFnOne = true;
                    obj.afterOutFnOne = false;
                    obj.beforeOutFnOne = false;
                }

            } else {
                if (infn) {
                    infn.call(obj, attr, obj)
                }
            }

            if (background) {
                obj.style.backgroundAttachment = "fixed"
            }

            if (!flag) {
                return
            }
            var index = shuxing.indexOf(":")

            if (index > -1) {
                var shu = shuxing.slice(0, index);
                var val = shuxing.slice(index + 1)
                var originshu = obj.style.transform;
                var originArr = [];
                if (originshu) {
                    originshu = originshu.replace(/,\s*/g, ",")
                    originArr = originshu.split(" ");
                }


                var beginArr = begin.slice(1, -1).split(",");
                var finishArr = finish.slice(1, -1).split(",");
                var vals = "";
                for (var i = 0; i < beginArr.length; i++) {
                    if (val.indexOf("rotate") > -1) {
                        vals += beginArr[i] * 1 + (finishArr[i] - beginArr[i]) / (end - start) * (top - start) + "deg,"
                    } else if (val.indexOf("translate") > -1) {
                        vals += beginArr[i] * 1 + (finishArr[i] - beginArr[i]) /( (end - start)*sulv) * (top - start) + unit + ","

                    } else if (val.indexOf("scale") > -1) {
                        vals += beginArr[i] * 1 + (finishArr[i] - beginArr[i]) / (end - start) * (top - start) + ","
                    } else {
                        vals += beginArr[i] * 1 + (finishArr[i] - beginArr[i]) / (end - start) * (top - start) + "deg,"
                    }
                }
                var flag = true;

                for (var i = 0; i < originArr.length; i++) {
                    if (originArr[i].indexOf(val) > -1) {
                        originArr[i] = val + "(" + vals.slice(0, -1) + ")"
                        flag = false;
                        break
                    }
                }
                if (flag) {
                    originArr.push(val + "(" + vals.slice(0, -1) + ")");
                }


                val = originArr.join(" ");
                obj.style[shu] = val;


            } else {
                if (shuxing == "opacity") {
                    obj.style[shuxing] = begin + speed;
                } else {

                    obj.style[shuxing] = begin + speed + unit
                }
            }
        } else {
            obj.style.backgroundAttachment = "scroll"
        }


}

function scroll(callback) {
    window.onscroll=function (ev) {
        var top = document.documentElement.scrollTop || document.body.scrollTop;
        callback(top)
    }
}