// John and his family went on a holiday and went to 3 different restaurants. The bills were $124, $48 and $268.

// To tip the waiter a fair amount, John created a simple tip calculator (as a function). He likes to tip 20% of the bill when the bill is less than $50, 15% when the bill is between $50 and $200, and 10% if the bill is more than $200.

// In the end, John would like to have 2 arrays:
// 1) Containing all three tips (one for each bill)
// 2) Containing all three final paid amounts (bill + tip).

// (NOTE: To calculate 20% of a value, simply multiply it with 20/100 = 0.2)


let bills = [124, 48, 268];
let tip = [];
let finalAmount =[];

function tipsForBills(bills){
	let tips = 0;
	for(let i = 0; i<=bills.length; i++){
		if(bills[i]<50){
			tips = bills[i]*0.2;
		}else if(bills[i]>=50 && bills[i]<=200){
			tips = bills[i]*0.15;
		}else{
			tips = bills[i]*0.1;
		}
	}
	return tips;
}


let tipCalulator = function(amount){
		if(amount<50){
			return amount *= 0.2;
		}else if(amount>=50 && amount<=200){
			return amount *= 0.15;
		}else{
			return amount *= 0.1;
		}
	}

tip.push(tipCalulator(124), tipCalulator(48),tipCalulator(268));
console.log(tip);

finalAmount.push(tipCalulator(124)+124, tipCalulator(48)+48, tipCalulator(268)+268);
console.log(finalAmount);