window.onload = getPageReady;
function getPageReady() {
	let space01 = {};
	let space02 = {};
	let space03 = {};
	let space04 = {};
	let space05 = {};
	let space06 = {};
	let space07 = {};
	let space08 = {};
	let space09 = {};
	let space10 = {};
	let space11 = {};
	let space12 = {};
	let space13 = {};
	let space14 = {};
	let space15 = {};
	let space16 = {};
	let space17 = {};
	let space18 = {};
	let space19 = {};
	let space20 = {};
	let space21 = {};
	let space22 = {};
	let space23 = {};
	let space24 = {};
	let space25 = {};
	let space26 = {};
	let space27 = {};
	let space28 = {};

	let userForm = document.getElementById("VisitorInput");
	let thanksMsg = document.getElementById("thanksMsg");
	// form elements
	let visitorInput = document.getElementById("visitorName");
	let typeInput = document.getElementById("type");
	let phoneInput = document.getElementById("phoneNum");
	let spaceInput = document.getElementById("spaceNum");
	let colorInput = document.getElementById("color");
	let brandInput = document.getElementById("brand");
	let prepaidTimeInput = document.getElementById("prepaidTime");
	let licenseInput = document.getElementById("vehicleNum");
	let confidentality = document.getElementById("confidentality");

	// alert messages on the form shown if invalid input
	let nameRequired = document.getElementById("nameRequired");
	let phoneRequired = document.getElementById("phoneRequired");
	let licenseRequired = document.getElementById("licenseRequired");
	let spaceRequired = document.getElementById("spaceRequired");
	let prepaidRequired = document.getElementById("prepaidRequired");
	let acceptanceRequired = document.getElementById("acceptanceRequired");
	// radio element
	let radio1 = document.getElementById("0.5hr");
	let radio2 = document.getElementById("1hr");
	let radio3 = document.getElementById("1.5hr");
	let radio4 = document.getElementById("2hr");
	// information shown after successful submission
	let usernameMsg = document.getElementById("usernameMsg");
	let licenseMsg = document.getElementById("licenseMsg");
	let spaceMsg = document.getElementById("spaceMsg");
	// button and navigation
	let btnSubmit = document.getElementById("submitForm");
	let btnToHome = document.getElementById("backToSystem");
	let btnToForm = document.getElementById("backToForm");
	// Timer
	let hoursOut = document.getElementById("hoursOut");
	let minsOut = document.getElementById("minsOut");
	let secsOut = document.getElementById("secsOut");
	let initialTime;
	// check the duplicated input by comparing with info in localstorage
	let licenseExist = document.getElementById("licenseExist");
	let spaceExist = document.getElementById("spaceExist");
	// get and format local storage
	let parkingStorage;
	let existSpace = [];
	let existVehicle = [];
	let spaces = [space01, space02, space03, space04, space05, space06, space07, space08, space09, space10, space11, space12, space13, space14, space15, space16, space17, space18, space19, space20, space21, space22, space23, space24, space25, space26, space27, space28];
	let arrParking = [];
	let interval;

	console.log(spaces);
	getStorageSummary();

	// for testing -------------- manually adjust
	function resetElementInSpace(element) {
		const valueToRemove = element;
		let index = spaces.indexOf(valueToRemove);
		while (index !== -1) {
			spaces[index]={};
			index = spaces.indexOf(valueToRemove, index + 1); 
		}
		console.log(spaces);
	}

	// get spaces: full parking; get arrParking: not-null parking;
	function getStorageSummary() {
		let tempParking = localStorage.getItem("parkingArr");
		/* 		console.log(tempParking);
				console.log('Length of tempParking:', tempParking.length); */
		if (tempParking !== null && tempParking.trim() !== '""') {
			console.log("parking is not null.")
			spaces = JSON.parse(tempParking);
			console.log(spaces);
			// re-read arrParking to avoid any duplicate parking data
			arrParking = [];
			arrParking = getValidData(spaces);
			getExistingParking();
		}
		else {
			console.log("Parking system data has been reset.");
		}
		console.log(spaces);
	}

	// get an parking array without null value
	function getValidData(array) {
		for (let key in array) {
			if (typeof array[key] === 'object' && Object.keys(array[key]).length !== 0) {
				arrParking.push(array[key]);
			}
		}
		console.log(arrParking);
		return arrParking;
	}

	// get existing parking licenses and spaces for form validation, run when submitting the form
	function getExistingParking() {
		for (let i = 0; i < arrParking.length; i++) {
			if (arrParking[i] && typeof arrParking[i] === 'object' && arrParking[i].vehicle) {
				let tempVehicleNum = arrParking[i].vehicle.license;
				if (!existVehicle.includes(tempVehicleNum)) { existVehicle.push(tempVehicleNum); }
				let tempSpaceNum = arrParking[i].vehicle.space;
				if (!existSpace.includes(tempSpaceNum)) { existSpace.push(tempSpaceNum); }
			}
		}
		console.log(existVehicle);
		console.log(existSpace);
	}
	// easy to get existing objects in the array which store previous parking information 

	// check and make sure the space and vehicle license of userinput are not in the existing parking system.
	function duplicatedParking() {
		getExistingParking();
		if (existVehicle.length !== 0) {
			for (let i = 0; i < existVehicle.length; i++) {
				if (licenseInput.value === existVehicle[i]) {
					licenseInput.style.border = "2px solid red";
					licenseExist.style.display = "block";
					licenseExist.style.color = "red";
					licenseInput.focus();
					return false;
				}
				else {
					licenseExist.style.display = "none";
					licenseInput.style.border = "1px solid grey";
				}

				if (existSpace.length !== 0) {
					for (let i = 0; i < existVehicle.length; i++) {
						if (spaceInput.value === existVehicle[i]) {
							spaceInput.style.border = "2px solid red";
							spaceExist.style.display = "block";
							spaceExist.style.color = "red";
							spaceInput.focus();
							return false;
						}
						else {
							spaceExist.style.display = "none";
							spaceInput.style.border = "1px solid grey";
						}
					}

				}
				else {
					console.log("All the spaces are empty.");
				}

			}
		}
		else {
			console.log("There is no vehicle parking here now.");
		}
	}

	// stop the timer down clock
	function stopClock() {
		clearInterval(interval);
	}

	// Get time countdown for user after submitting the parking form
	function timeCountdown() {
		let secsTimer = 0;
		let minsTimer = 0;
		let hoursTimer = 0;

		getInitialTime();
		startClock();


		function getInitialTime() {
			switch (initialTime) {
				case radio1.value:
					hoursTimer = 0; minsTimer = 30; secsTimer = 0;
					break;
				case radio2.value:
					hoursTimer = 1; minsTimer = 0; secsTimer = 0;
					break;
				case radio3.value:
					hoursTimer = 1; minsTimer = 30; secsTimer = 0;
					break;
				case radio4.value:
					hoursTimer = 2; minsTimer = 0; secsTimer = 0;
					break;
				default:
					console.log("Invalid initial time");
			}
			console.log(hoursTimer);
			console.log(minsTimer);
			console.log(secsTimer);
			displayOutput();
		}

		//CREATE FUNCTION THAT DISPLAYS THE TIME
		function displayTime(timeNumber) {
			if (timeNumber < 10) {
				timeNumber = "0" + timeNumber;
			}
			//The user will always see two digits displayed for the minutes and seconds
			else {
				timeNumber = timeNumber.toString();
			}
			return timeNumber;
		}

		function displayOutput() {
			secsOut.innerHTML = displayTime(secsTimer);
			minsOut.innerHTML = displayTime(minsTimer) + ":";
			hoursOut.innerHTML = displayTime(hoursTimer) + ":";
		}

		//CREATE FUNCTION TO START THE CLOCK.	
		function startClock() {
			interval = window.setInterval(countDown, 1000);
		}

		//create function to count seconds;
		function countDown() {
			if (secsTimer === 0 && minsTimer === 0 && hoursTimer === 0) {
				clearInterval(interval);
			}
			if (secsTimer === 0) {
				secsTimer = 59;
				if (minsTimer === 0) {
					minsTimer = 59;
					hoursTimer--;
				}
				else {
					minsTimer--;
				}
			}
			else {
				secsTimer--;
			}
			// update Timer on the web page
			displayOutput();
		}
	}


	function getStartTime() {
		//event.preventDefault();
		let currentTime = new Date();
		let startTime = currentTime.toLocaleString();
		return startTime;
	}

	function getThanksMsg() {
		usernameMsg.innerHTML = visitorInput.value;
		licenseMsg.innerHTML = licenseInput.value;
		spaceMsg.innerHTML = spaceInput.value;
	}

	function pageToClock() {
		userForm.style.display = "none";
		thanksMsg.style.display = "block";
	}

	function pageToForm() {
		userForm.style.display = "block";
		thanksMsg.style.display = "none";
		stopClock();
	}

	function leaveInput(){
		stopClock();
	}

	// user form submission
	function onSubmit(event) {
		//console.log(licenseInput.value);
		//console.log(spaceInput.value);
		// prevent from default submission
		event.preventDefault();

		if (inputValidation()) {
			timeCountdown();
			console.log("Time counts down.");
			getThanksMsg();
			console.log("page has been changed.");
			pageToClock();
		}
		else {
			return false;
		}
		var vehicleInfo = {
			license: licenseInput.value,
			space: spaceInput.value,
			color: colorInput.value,
			brand: brandInput.value,
			type: typeInput.value,
		};
		console.log(vehicleInfo);

		var parkingTimer = {
			prepaidTime: initialTime,
			startTime: getStartTime(),
		};
		console.log(parkingTimer.prepaidTime);
		console.log(parkingTimer.startTime);

		var registrationInfo = {
			name: visitorInput.value,
			phone: phoneInput.value,
			vehicle: vehicleInfo,
			time: parkingTimer,
		};
		/* console.log(registrationInfo); */
		let arrNum = parseInt(vehicleInfo.space.substring(5)) - 1;
		/* console.log(arrNum); */
		spaces[arrNum] = registrationInfo;
		/* console.log(spaces); */
		deleteAllLocalStorage();
		saveLocalStorage(spaces);
		console.log(parkingStorage);
		getExistingParking();
		getStorageSummary();
		userForm.reset();
	}


	// after form submission, users can park more vehicles or go to the home page
	btnSubmit.onclick = onSubmit;
	btnToForm.onclick = pageToForm;
	btnToHome.onclick=leaveInput;

	// save local storage by using counter to allow multiple parking inputs
	function saveLocalStorage(info) {

		// JSON.stringify() to show the full string in console.log
		window.localStorage.setItem("parkingArr", JSON.stringify(info));
		parkingStorage = localStorage.getItem("parkingArr");
	}

	// If cancel or modify information, then use the below one
	function deleteLocalStorage(key) {
		window.localStorage.removeItem(key);
		parkingStorage = localStorage.getItem(key);
	}

	function deleteAllLocalStorage() {
		window.localStorage.clear();
	}


	// test phone input: 10 digital number
	function phoneRegEx(phoneInput) {
		let phoneRegEx = /^\d{10}$/;
		return phoneRegEx.test(phoneInput.value);
	}
	// test license number: at least 2 number, at least 2 letter
	function licenseRegEx(licenseInput) {
		let licenseRegEx = /^(?=(.*[0-9]){2,})(?=(.*[A-Za-z]){2,}).*$/;
		return licenseRegEx.test(licenseInput.value);
	}
	// form validation check
	function inputValidation() {
		console.log("run validation");
		// name is not empty.
		if (visitorInput.value === "") {
			visitorInput.style.border = "2px solid red";
			nameRequired.style.display = "block";
			nameRequired.style.color = "red";
			visitorInput.focus();
			return false;
		}
		else {
			visitorInput.style.border = "1px solid grey";
			nameRequired.style.display = "none";
		}
		// phone is not empty and is valid.
		if (phoneInput.value === "" || phoneRegEx(phoneInput) === false) {
			phoneInput.style.border = "2px solid red";
			phoneRequired.style.display = "block";
			phoneRequired.style.color = "red";
			phoneInput.focus();
			return false;
		}
		else {
			phoneInput.style.border = "1px solid grey";
			phoneRequired.style.display = "none";
		}
		// license is not empty and is valid.
		if (licenseInput.value === "" || licenseRegEx(licenseInput) === false) {
			licenseInput.style.border = "2px solid red";
			licenseRequired.style.display = "block";
			licenseRequired.style.color = "red";
			licenseInput.focus();
			return false;
		}
		else {
			licenseInput.style.border = "1px solid grey";
			licenseRequired.style.display = "none";
		}
		// space number is selected
		if (spaceInput.value === 'default') {
			spaceInput.style.border = "2px solid red";
			spaceRequired.style.display = "block";
			spaceRequired.style.color = "red";
			spaceInput.focus();
			return false;
		}
		else {
			spaceInput.style.border = "1px solid grey";
			spaceRequired.style.display = "none";
		}
		// prepaidtime is selected and get radio value to prepaidtime
		if (radio1.checked) {
			initialTime = radio1.value;
			prepaidTimeInput.style.border = "none";
			prepaidRequired.style.display = "none";
		}
		else if (radio2.checked) {
			initialTime = radio2.value;
			prepaidTimeInput.style.border = "none";
			prepaidRequired.style.display = "none";

		}
		else if (radio3.checked) {
			initialTime = radio3.value;
			prepaidTimeInput.style.border = "none";
			prepaidRequired.style.display = "none";
		}
		else if (radio4.checked) {
			initialTime = radio4.value;
			prepaidTimeInput.style.border = "none";
			prepaidRequired.style.display = "none";
		}
		else {
			prepaidTimeInput.style.border = "2px solid red";
			prepaidRequired.style.display = "block";
			prepaidRequired.style.color = "red";
			return false;
		}

		if (confidentality.checked) {
			confidentality.parentElement.style.border = "none";
			acceptanceRequired.style.display = "none";
		}
		else {
			confidentality.parentElement.style.border = "2px solid red";
			acceptanceRequired.style.display = "block";
			acceptanceRequired.style.color = "red";
			confidentality.focus();
			return false;
		}
		// check existing parking information to avoid duplicated input
		duplicatedParking();
		// check the form validation input
		console.log("Valid Input");
		return true;

	}

}


