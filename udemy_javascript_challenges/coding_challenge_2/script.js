// John and Mike both play basketball in different teams. In the latest 3 games, John's team scored 89, 120 and 103 points, while Mike's team scored 116, 94 and 123 points.

// 1. Calculate the average score for each team
// 2. Decide which teams wins in average (highest average score), and print the winner to the console. Also include the average score in the output.
// 3. Then change the scores to show different winners. Don't forget to take into account there might be a draw (the same average score)

// 4. EXTRA: Mary also plays basketball, and her team scored 97, 134 and 105 points. Like before, log the average winner to the console. HINT: you will need the && operator to take the decision. If you can't solve this one, just watch the solution, it's no problem :)
// 5. Like before, change the scores to generate different winners, keeping in mind there might be draws.

let johnsTeamAvg = (89+120+103)/3;
let mikeTeamAvg = (116+94+123)/3;
let maryTeamAvg = (97+134+105)/3;

if(johnsTeamAvg>mikeTeamAvg){
	console.log('John\'s team wins with '+johnsTeamAvg);
}else if(mikeTeamAvg>johnsTeamAvg){
	console.log('Mike\'s team wins with '+ mikeTeamAvg);
}else{
	console.log('Both teams got draw');
}

if(johnsTeamAvg>mikeTeamAvg && johnsTeamAvg>maryTeamAvg){
	console.log('John\'s team wins with '+johnsTeamAvg);
}else if(mikeTeamAvg>johnsTeamAvg && mikeTeamAvg>maryTeamAvg){
	console.log('Mike\'s team wins with '+ mikeTeamAvg);
}else if(maryTeamAvg>johnsTeamAvg && mikeTeamAvg<maryTeamAvg){
	console.log('Mary\'s team wins with '+ maryTeamAvg);	
}else{
	console.log('Three teams got draw');
}
