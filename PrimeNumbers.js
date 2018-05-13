	var primeNumbers = []; 
	var length = 100;
	var numbers = []; 
	var sqrtlength;
	var numbersToDispay = [];
	var numbersToDispayRange = [0,0];
	var numberOfElementsToDisplay;
	var steps = 0;
	var loader;
	var a;

function start(){
	loader = document.getElementsByClassName("loader")[0];
	a = document.getElementsByClassName("getNumbers")[0];
	length = document.getElementById("length").value;
	sqrtlength = Math.sqrt(length);
	sqrtlength = Math.floor(sqrtlength);
	numbersToDispayRange = [0,0];
	steps = 0;
	a.innerHTML="";
	numbers = [];
	primeNumbers = [];
	initializeNumbers();
}

async function initializeNumbers(){
	for (var i = 2; i <= length; i++) { 
    	numbers[i] = 1;
	}
	await findPrimeNumbers();
	loader.style.display = "block";
}

async function findPrimeNumbers(){
	var j = 0;
	for(var i = 2; i<=sqrtlength; i++)
	{
		if(numbers[i]==1){
    		for(var k = 0; k<= length;k++){
    			j=Math.pow(i,2)+k*i;
    			if(j>length)
    				break;
    			numbers[j] = 0;
    		}
    	}
	}
	await getPrimeNumbers()
}

async function getPrimeNumbers(){
	for (var i = 2; i <= length; i++){ 
		if(numbers[i] != 0){
  			primeNumbers.push(i);
		}
	}
	numberOfElementsToDisplay = Math.floor(primeNumbers.length/10);
    await splitPrimeNumbers();
}

async function printNumbers(){
	a.innerHTML += numbersToDispay.join('');
	await splitPrimeNumbers();
}

function splitPrimeNumbers(){
	numbersToDispay = [];
	steps++;
	for(var i = numbersToDispayRange[0];i<=numbersToDispayRange[1];i++){
		numbersToDispay.push("<p class='number'>" + primeNumbers[i] + "</p>");
	}
 	getNextRange();
	if(steps<=10){
		setTimeout(printNumbers, 200);
	}else{
		loader.style.display = "none";
	}
}

function getNextRange(){
		numbersToDispayRange[0] = numbersToDispayRange[1] + 1;
	if(steps>=9){
		numbersToDispayRange[1] =primeNumbers.length -1;
	}else{
		numbersToDispayRange[1] +=numberOfElementsToDisplay;
	}
}
