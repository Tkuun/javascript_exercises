//Budget controller

let budgetController = (function(){

	let Expense = function(id, description, value){
		this.id = id;
		this.description = description;
		this.value = value;
		this.percentage = -1;
	};

	Expense.prototype.calcPercentage=function(totalIncome){
		if(totalIncome>0){
		this.percentage = Math.round((this.value/ totalIncome)*100);
		}else{
			this.percentage = -1;
		}
	};

	Expense.prototype.getPercentage = function(){
		return this.percentage;
	}

	let Income = function(id, description, value){
		this.id = id;
		this.description = description;
		this.value = value;
	};

	let calculateTotal = function(type){

		let sum = 0;
		data.allItems[type].forEach(function(cur){
			sum = sum + cur.value;
		});
		data.totals[type] = sum;
	};

	let data = {
		allItems: {
			exp: [],
			inc: []
		},
		totals:{
			exp: 0,
			inc: 0
		},
		budget:0,
		percentage: -1

	};
		return{
			addItem: function(type, des, val){
				let newItem, ID;
				//create new ID and create new item
				if(data.allItems[type].length > 0){
					ID = data.allItems[type][data.allItems[type].length -1].id+1;
				}else{
					ID = 0;
				}
				
				// Create new item based on 'inc' and 'exp' type
				if(type === 'exp'){
				newItem = new Expense(ID, des, val);
			}else if(type === 'inc'){
				newItem = new Income(ID, des, val);
			}
			//Push it in to our data structure
			data.allItems[type].push(newItem);
			//return new element
			return newItem;
		},

		deleteItem: function(type, id){
			let ids, index;
			ids = data.allItems[type].map(function(current){
				return current.id;
			});

			index = ids.indexOf(id);

			if(index !==-1){
				data.allItems[type].splice(index, 1);
			}
		},

		calculateBudget: function(){

			// Calculate total income and expenses
			calculateTotal('exp');
			calculateTotal('inc');


			//Calculate the budget income - expenses
			data.budget = data.totals.inc - data.totals.exp;
			//Calculate the procentage of income that we spent
			if(data.totals.inc>0){
				data.percentage = Math.round((data.totals.exp/data.totals.inc)*100);
			}else{
				data.percentage = -1;
			}
			


		},

		calculatePercentages: function(){

			data.allItems.exp.forEach(function(cur){
				cur.calcPercentage(data.totals.inc);
			});

		},

		getPercentages: function(){
			let allPerc = data.allItems.exp.map(function(cur){
				return cur.getPercentage();
			});
			return allPerc;
		},

		getBudget: function(){
			return {
				budget: data.budget,
				totalINC: data.totals.inc,
				totalEXP: data.totals.exp,
				percentage: data.percentage
			}
		},

		testing: function(){
			console.log(data);
		}
	}
})();

//UI controller

let uiController = (function(){

	let domStrings = {
		inputType: '.add__type',
		inputDescription: '.add__description',
		inputValue: '.add__value',
		inputBtn: '.add__btn',
		incomeContainer: '.income__list',
		expensesContainer: '.expenses__list',
		budgetLabel: '.budget__value',
		incomeLabel: '.budget__income--value',
		expensesLabel: '.budget__expenses--value',
		percentageLabel: '.budget__expenses--percentage',
		container: '.container',
		expensesPercLabel: '.item__percentage',
		dateLabel: '.budget__title--month'
	}

	let formatNumber = function(num, type){
			let numSplit, int, dec;
			//plus or minus before the number

			num = Math.abs(num);
			num = num.toFixed(2);
			//comma after first number
			numSplit = num.split('.')

			int = numSplit[0];
			if(int.length>3){
				int = int.substr(0,int.length-3)+','+int.substr(int.length-3,3);
			}

			dec = numSplit[1];

			return (type==='exp' ? '-':'+') + ' ' + int+'.' + dec; 
		};
		let nodeListForEach = function(list, callback){
				for( let i = 0; i<list.length; i++){
					callback(list[i],i);
				}
			};

	return {
		getInput: function(){
			return {
			type: document.querySelector(domStrings.inputType).value,
			description: document.querySelector(domStrings.inputDescription).value,
			value: parseFloat (document.querySelector(domStrings.inputValue).value)

			};
		},

		addListItem: function(obj, type){
			let html, newHtml, element, fields, fieldsArr;
			//Create html string with placeholder text
			 if(type === 'exp'){
			 	element = domStrings.expensesContainer;
			 html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">- %value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
			}else if(type==='inc'){
				element = domStrings.incomeContainer;
			 html = '<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">+ %value%</<div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></but</div>'
			}
			//Replace the placeholder text with actual data
			newHtml = html.replace('%id%', obj.id);
			newHtml = newHtml.replace('%description%', obj.description);
			newHtml = newHtml.replace('%value%', formatNumber(obj.value, type));
			//Insert HTML into the DOM
			document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);

		},

		deleteListItem: function(selectorID){
			let el = document.getElementById(selectorID);
			el.parentNode.removeChild(el);
		},

		clearFields: function(){
			fields = document.querySelectorAll(domStrings.inputDescription+ ',' + domStrings.inputValue);

			fieldsArr = Array.prototype.slice.call(fields);

			fieldsArr.forEach(function(current, index, array){
				current.value = '';
			});

			fieldsArr[0].focus();
		},

		displayBudget: function(obj){

			obj.budget > 0 ? type = 'inc': type = 'exp';
			document.querySelector(domStrings.budgetLabel).textContent = formatNumber(obj.budget, type);
			document.querySelector(domStrings.incomeLabel).textContent = formatNumber(obj.totalINC, 'inc');
			document.querySelector(domStrings.expensesLabel).textContent = formatNumber(obj.totalEXP, 'exp');

			if(obj.percentage>0){
				document.querySelector(domStrings.percentageLabel).textContent = obj.percentage + '%';
			}else{
				document.querySelector(domStrings.percentageLabel).textContent = '---';
			}
		},	

		displayPercentages: function(percentages){

			let fields = document.querySelectorAll(domStrings.expensesPercLabel);


			nodeListForEach(fields, function(current, index){
				if(percentages[index]>0){
				current.textContent = percentages[index]+'%';
				}else{
					current.textContent = '---';
				}

			});

		},

			displayMonth: function(){
				let now,year,month, months;
				now = new Date();
				months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ];
				month = now.getMonth();

				year = now.getFullYear();
				document.querySelector(domStrings.dateLabel).textContent = months[month] + ' ' +year;
			},

			changeType: function(){
				let fields = document.querySelectorAll(
					domStrings.inputType+','+domStrings.inputDescription+','+domStrings.inputValue
					);

				nodeListForEach(fields, function(cur){
					cur.classList.toggle('red-focus');
				});

				document.querySelector(domStrings.inputBtn).classList.toggle('red');

			},

		getdomStrings: function(){
			return domStrings;
		}
	};

})()

//Global app controller

let controller = (function(budgetCtrl, uiCtrl){

	let setEventListeners = function(){
			let DOM = uiCtrl.getdomStrings();

			document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);

			document.addEventListener('keypress', function(event){

			if(event.keyCode === 13 || event.which === 13){
			
			ctrlAddItem();

		}

	});
			document.querySelector(DOM.container).addEventListener('click', ctrlDeleteItem);

			document.querySelector(DOM.inputType).addEventListener('change',uiCtrl.changeType);
	};


	let updateBudget = function(){

		//4. Calculate the budget
		budgetCtrl.calculateBudget();
		//return the budget
		let budget = budgetCtrl.getBudget();
		//5. Display the budget on the UI
		uiCtrl.displayBudget(budget);

	};

	let updatePercentages = function(){


		//Calculate the percentages
		budgetCtrl.calculatePercentages();
		// Read precentage from budget controller
		let percentages = budgetCtrl.getPercentages();
		//Update the user UI
		uiCtrl.displayPercentages(percentages);
		//4. Calculate and update the precentages
	};

	let ctrlAddItem = function(){
		let input, newItem;
		// 1. Get the field input data

		input = uiCtrl.getInput();

		if(input.description !== '' && !isNaN(input.value) && input.value > 0){
			//2. Add the item to budget controller

		newItem = budgetCtrl.addItem(input.type, input.description, input.value);

		//3. Add the item to UI
		uiCtrl.addListItem(newItem, input.type);

		//3a. Clear the fields
		uiCtrl.clearFields();

		//4. Calculate and update budget
		updateBudget();

		updatePercentages();
		}

	};

	let ctrlDeleteItem = function(event){
		let itemID,splitID,type, ID;
		itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;
		if(itemID){

			//inc-1
			splitID = itemID.split('-');
			type = splitID[0];
			ID = parseInt(splitID[1]);

			//1. delete item from data structure
			budgetCtrl.deleteItem(type, ID);
			//2. delete the item from UI
			uiCtrl.deleteListItem(itemID);
			//3. update and show the new budget
			updateBudget();

			updatePercentages();
		}
	};

	return {

		init: function(){
			uiCtrl.displayMonth();
			uiCtrl.displayBudget({
				budget: 0,
				totalINC: 0,
				totalEXP: 0,
				percentage: -1
			});
			setEventListeners();
		}
	}

})(budgetController, uiController);

controller.init();







