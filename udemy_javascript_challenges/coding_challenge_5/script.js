// Remember the tip calculator challenge? Let's create a more advanced version using everything we learned!

// This time, John and his family went to 5 different restaurants. The bills were $124, $48, $268, $180 and $42.
// John likes to tip 20% of the bill when the bill is less than $50, 15% when the bill is between $50 and $200, and 10% if the bill is more than $200.

// Implement a tip calculator using objects and loops:
// 1. Create an object with an array for the bill values
// 2. Add a method to calculate the tip
// 3. This method should include a loop to iterate over all the paid bills and do the tip calculations
// 4. As an output, create 1) a new array containing all tips, and 2) an array containing final paid amounts (bill + tip). HINT: Start with two empty arrays [] as properties and then fill them up in the loop.


// EXTRA AFTER FINISHING: Mark's family also went on a holiday, going to 4 different restaurants. The bills were $77, $375, $110, and $45.
// Mark likes to tip 20% of the bill when the bill is less than $100, 10% when the bill is between $100 and $300, and 25% if the bill is more than $300 (different than John).

// 5. Implement the same functionality as before, this time using Mark's tipping rules
// 6. Create a function (not a method) to calculate the average of a given array of tips. HINT: Loop over the array, and in each iteration store the current sum in a variable (starting from 0). After you have the sum of the array, divide it by the number of elements in it (that's how you calculate the average)
// 7. Calculate the average tip for each family
// 8. Log to the console which family paid the highest tips on average


let john = {
	fullName: 'John Smith',
	johnsBills:	[124, 48, 268, 180, 42],
	johnsTips: [],
	johnsBillnTips: [],
	tips: function(){
	for(let i = 0; i<this.johnsBills.length; i++){
		if(this.johnsBills[i]<50){
			this.johnsTips.push(this.johnsBills[i]*0.2);
			this.johnsBillnTips[i]=this.johnsTips[i]+ this.johnsBills[i];
		}else if(this.johnsBills[i]>50&&this.johnsBills[i]<200){
			this.johnsTips.push(this.johnsBills[i]*0.15);
			this.johnsBillnTips[i]=this.johnsTips[i]+ this.johnsBills[i];
		}else{
			this.johnsTips.push(this.johnsBills[i]*0.1);
			this.johnsBillnTips[i]=this.johnsTips[i]+ this.johnsBills[i];
		}
	}return console.log(john);
}
};
john.tips();

let mark = {
	fullName: 'Mark Smith',
	markBills:	[77, 375, 110, 45],
	markTips: [],
	markBillnTips: [],
	tips: function(){
	for(let i = 0; i<this.markBills.length; i++){
		if(this.markBills[i]<100){
			this.markTips.push(this.markBills[i]*0.2);
			this.markBillnTips[i]=this.markTips[i]+ this.markBills[i];
		}else if(this.markBills[i]>=100&&this.markBills[i]<300){
			this.markTips.push(this.markBills[i]*0.25);
			this.markBillnTips[i]=this.markTips[i]+ this.markBills[i];
		}else{
			this.markTips.push(this.markBills[i]*0.1);
			this.markBillnTips[i]=this.markTips[i]+ this.markBills[i];
		}
	}return console.log(mark);
}
};
mark.tips();

function tipAvg(tipArray){
	let tipSum=0;
	for(i=0; i<tipArray.length; i++){
		tipSum+=tipArray[i];
	}
	return tipSum/tipArray.length;
}

let johnMidAvg = tipAvg(john.johnsTips);
let markMidAvg = tipAvg(mark.markTips);

console.log(markMidAvg, johnMidAvg);

if(johnMidAvg>markMidAvg){
	console.log('John gives biggest tips ' + johnMidAvg);
}else{
	console.log('Mark gives biggest tips ' + markMidAvg);
}
