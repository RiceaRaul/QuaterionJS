import Quaterion from "./quaterion.js"

const q = new Quaterion(true,6);
console.log("Metoda 1");
var t = q.ConvertFromEuler(0,-5.00895567E-06,-13.9999962)
console.table(t);
console.log("Metoda 2");
q.quaterion(0,-5.00895567E-06,-13.9999962);
console.table(q.result)
console.log("Array");
console.log(q.array)
console.log("String");
console.log(q.string)
console.table(q.rotationMatrix)