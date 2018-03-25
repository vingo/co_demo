
function runCo(gen){
    
    var g=gen(),data_co;

    
    function next(data){
        var result=g.next(data);
        var valType=Object.prototype.toString.call(result.value).split(' ')[1].toString().replace(']','');
        console.log('result: ',result,valType);
        if(result.done){
            return data_co=result.value;
        }
        switch(valType){
            case 'Array':
                data_co=[];
                Promise.all(result.value).then(d=>{
                    next(d)
                })
            break;
            default:
                result.value.then(function(d){
                    next(d);
                })
            break
        }
        // result.value.then(function(data){
        //     next(data);
        // })
    }
    next();// init iterable next
}
var gen=function *(){
    yield Promise.resolve(1);
    yield Promise.resolve(2);
    return yield Promise.resolve(3);
    
}
// result=runCo(gen);
// console.log('>>>>>>>result:  ',result);


var gen2=function *(){
   x= yield [Promise.resolve(1),Promise.resolve(2)];
   return x;
}
result2=runCo(gen2);
console.log('>>>>>>>>result2:  ',result2);