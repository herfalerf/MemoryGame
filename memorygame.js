const gameContainer = document.getElementById('game');

const COLORS = [ 'red', 'blue', 'green', 'orange', 'purple', 'red', 'blue', 'green', 'orange', 'purple' ];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
	let counter = array.length;

	// While there are elements in the array
	while (counter > 0) {
		// Pick a random index
		let index = Math.floor(Math.random() * counter);

		// Decrease counter by 1
		counter--;

		// And swap the last element with it
		let temp = array[counter];
		array[counter] = array[index];
		array[index] = temp;
	}

	return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
	for (let color of colorArray) {
		// create a new div
		const newDiv = document.createElement('div');

		// give it a class attribute for the value we are looping over
		newDiv.classList.add(color);
		// add a class so I can hide the cards
		newDiv.classList.add('color-hidden');
		// add a data element so that I can match attributes
		newDiv.setAttribute('data-color', color);

		// call a function handleCardClick when a div is clicked on
		newDiv.addEventListener('click', handleCardClick);

		// append the div to the element with an id of game
		gameContainer.append(newDiv);
	}
}

let clickedCard = null;
let preventClick = false;
//score counter
let score = 0;
const htmlScore = document.querySelector('#score');
htmlScore.innerText = `Score = ${score}`;
//combo counter
let combos = 0;
//Play button event listener
const playBtn = document.querySelector('#play');
console.log(playBtn);
playBtn.addEventListener('click', handlePlayClick);
gameContainer.style.visibility = 'hidden';

function handlePlayClick() {
	gameContainer.style.visibility = 'visible';
	playBtn.style.visibility = 'hidden';
}

// TODO: Implement this function!
function handleCardClick(event) {
	// store clicked card
	const storedCard = event.target;
	// GOTCHA logic
	if (preventClick || storedCard === clickedCard || storedCard.className.includes('done')) {
		return;
	}
	storedCard.className = storedCard.className.replace('color-hidden', '').trim();
	storedCard.classList.add('done');
	// if we haven't clicked a card, store the card
	if (!clickedCard) {
		clickedCard = storedCard;
		score++;
		console.log(score);
	}
	else if (clickedCard) {
		// if we have already clicked, check if the new card matches the old card color.  If it does not, display the two cards for 1s and then hide them again.  Prevent clicks during this time.
		if (clickedCard.getAttribute('data-color') !== storedCard.getAttribute('data-color')) {
			preventClick = true;
			setTimeout(function() {
				console.log('card not equal');
				clickedCard.classList.replace('done', 'color-hidden');
				storedCard.classList.replace('done', 'color-hidden');
				clickedCard = null;
				preventClick = false;
				score++;
				console.log(score);
				htmlScore.innerText = `Score = ${score}`;
			}, 1000);
		}
		else {
			//if cards match leave them displayed.
			clickedCard = null;
			score++;
			combos++;
			console.log(score);
			htmlScore.innerText = `Score = ${score}`;
		}
	}
	//Score Counter
	htmlScore.innerText = `Score = ${score}`;
	if (combos === COLORS.length / 2) {
		console.log('You win', combos);
	}
}

// when the DOM loads
createDivsForColors(shuffledColors);
