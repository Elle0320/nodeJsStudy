
function a(a1, a2) {

    this.a1 = a1;
    this.a2 = a2;

    return a1 + a2;
}

console.log(a(1, 2)); // 3'

const plus = {
    a1: 100,
    a2: 123,
    result: function () {
        return this.a1 + this.a2;
    }
};

console.log(plus.result()); // 223

//es 6 if params have same names as the fields it will automatically assign to the fields.
function b(a1, a2) {
    a1,
    a2

return a1 + a2;
}

console.log(b(1, 2)); // 3

const test = 100000;

const aGroup = {
    a1: 1, 
    a2: 2,
    result(){ //result = function(){} or result = ()=>{} not really necessary.
        if(aGroup.a1 && aGroup.a2){
            return aGroup.a2+ aGroup.a1;
        }
        return -1;
    },
    b, //if you assign existing func and that will be same name as the one in the obj, you dont really need to set the type like b: b; not only for funtions but also any other variable. like below here : test
    test
};
aGroup.a3 = 3;
console.log(aGroup);

//delete literal
delete aGroup.a1;
console.log(aGroup);

//is this key in the group?
console.log('a1' in aGroup);
console.log('a3' in aGroup);

// aGroup.result = ()=>{
//     if(this.aGroup[0] && this.aGroup[1]){
//         return this.aGroup[0]+ this.aGroup[1];
//     }
//     return -1;
// }
// console.log(aGroup.result);[Function (anonymous)]

console.log(aGroup.result());
console.log(aGroup.b(100,209));

