let markWeight,johnWeight,markHeight,johnHeight;

markWeight = 62;
markHeight = 1.80;
johnHeight = 1.75;
johnWeight = 57;

let johnBmi = johnWeight/(johnHeight*2);
console.log(johnBmi);
let markBmi = markWeight/(markHeight*2);
console.log(markBmi);
let bothBmi = markBmi>johnBmi;
console.log('Is Marks Bmi higher than Johns?'+ bothBmi);
