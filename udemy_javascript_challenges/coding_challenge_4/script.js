// Let's remember the first coding challenge where Mark and John compared their BMIs. Let's now implement the same functionality with objects and methods.
// 1. For each of them, create an object with properties for their full name, mass, and height
// 2. Then, add a method to each object to calculate the BMI. Save the BMI to the object and also return it from the method.
// 3. In the end, log to the console who has the highest BMI, together with the full name and the respective BMI. Don't forget they might have the same BMI.

// Remember: BMI = mass / height^2 = mass / (height * height). (mass in kg and height in meter).

let mark = {
	firstName: 'Mark',
	lastName: 'Smith',
	weight: 62,
	height: 1.80,
	calcBMI: function(){
	this.bmi = this.weight/(this.height*2);
	return this.bmi;
	}
}

mark.calcBMI();
console.log(mark);

let john = {
	firstName: 'John',
	lastName: 'Smith',
	height: 1.75,
	weight: 57,
	calcBMI: function(){
		this.bmi = this.weight/(this.height*2);
		return this.bmi;
	}
}

john.calcBMI();
console.log(john);

// markWeight = 62;
// markHeight = 1.80;
// johnHeight = 1.75;
// johnWeight = 57;

let bigBMI = function(firstBmi, secondBmi){
	finalBmi = [];
if(mark.bmi>john.bmi){
	finalBmi = mark.firstName+' '+mark.lastName+' '+mark.bmi;
}else if(john.bmi>mark.bmi){
	finalBmi = john.firstName+' '+john.lastName+' '+john.bmi;
}else{
	finalBmi = 'Their BMI is is equal';
	}
	return finalBmi;
};


console.log(bigBMI(mark.bmi,john.bmi));
