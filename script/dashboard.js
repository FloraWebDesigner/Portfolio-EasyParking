window.onload = pageReady;

function pageReady() {

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
    let spaces = [space01, space02, space03, space04, space05, space06, space07, space08, space09, space10, space11, space12, space13, space14, space15, space16, space17, space18, space19, space20, space21, space22, space23, space24, space25, space26, space27, space28];

    // dashboard elements
    let visitor = document.getElementById("visitor");
    let type = document.getElementById("type");
    let staTime = document.getElementById("start-time");
    let phone = document.getElementById("phone");
    let parkspace = document.getElementById("park-space");
    let prepaidHr = document.getElementById("prepaid-time");
    let license = document.getElementById("license");
    let colorShown = document.getElementById("rectangle");
    let card = document.getElementById("card");
    let brand = document.getElementById("brand");

    // search session
    let parkingSearch = window.document.getElementById("parkingSearch");
    let btnSearch = window.document.getElementById("btnSearch");
    let errorMsg = window.document.getElementById("errorMsg");
    let errorMsgBox = window.document.querySelector(".errorMsgBox");

    // delete session
    let deleteParking = window.document.getElementById("deleteParking");
    let deleteAlert = window.document.getElementById("deleteAlert");

    // COUNTUP: show park time
    let parkingTimer = document.getElementById("parkingTimer");
    let resTimer = document.getElementById("resTimer");
    let timeoutTimer = document.getElementById("timeoutTimer");

    // timeout alert
    let timeoutMsg = document.getElementById("timeoutMsg");
    // delete box
    let msgbox = document.querySelector(".msg");
    let overlay = document.querySelector(".overlay");
    let delbox = document.querySelector(".delbox");
    let deleteConfirmY = document.getElementById("deleteConfirmY");
    let deleteConfirmN = document.getElementById("deleteConfirmN");
    let afterDelete = document.getElementById("afterDelete");

    // add audio element;
    let alarmAudio=document.getElementById("alarmAudio");

    // most recent parking showing on the web page
    let defaultParking = {};
    let timerStorage = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}];


    getStorageSummary();
    console.log(spaces);
    console.log(timerStorage);
    function getStorageSummary() {
        let tempParking = localStorage.getItem("parkingArr");
        console.log(tempParking);
        // temParking has value;
        // initialization
        if (tempParking === null) {
            spaces = [space01, space02, space03, space04, space05, space06, space07, space08, space09, space10, space11, space12, space13, space14, space15, space16, space17, space18, space19, space20, space21, space22, space23, space24, space25, space26, space27, space28];
            saveLocalStorage(spaces);
            tempParking = localStorage.getItem("parkingArr");
        }
        spaces = JSON.parse(tempParking);
        console.log(spaces);
        let notNull = spaces.some(obj => Object.keys(obj).length > 0);
        console.log(notNull);
        if (notNull) {
            let validParking = getValidData();
            console.log(validParking);
            defaultParking = getDefaultParking(validParking);
            console.log(defaultParking);
            showIndividualData(defaultParking);
            // clear previous animation
            errorMsg.style.animation = "none";
            errorMsg.style.display = "none";
        }

        else {
            getOriginalHTML();
            errorMsgBox.style.display = "flex";
            errorMsg.style.color = "white";
            errorMsgBox.style.backgroundColor = "#1E1E1E";
            errorMsg.innerHTML = "Parking system has been reset. Users can submit parking information through 'Parking a Vehicle' on the menu.";
            startAlertErrorAnimation();
        }

    }

    function getOriginalHTML() {
        visitor.innerHTML = "username";
        type.innerHTML = "Mini";
        staTime.innerHTML = "1/1/2024, 12:00:00 AM";
        phone.innerHTML = "6475555555";
        parkspace.innerHTML = "00";
        prepaidHr.innerHTML = "1hr";
        license.innerHTML = "EH5876";
        colorShown.style.backgroundColor = "#000000";
        parkingTimer.innerHTML = "00:00:00";
        resTimer.innerHTML = "00:00:00";
        brand.innerHTML = "Toyota";
        timeoutMsg, innerHTML = "";
        timeoutTimer.innerHTML = "";
        msgbox.style.display = "none";
    }


    // DELETE one vehicle: 
    // localstorage: 
    // 1. get individual parking information(user form) from localstorage
    // 2. update parking summary
    // 3. clear localstorage
    // 4. store parking information into localstorage with array
    deleteParking.onclick = deleteConfirm;
    //deleteAlert.innerHTML = "Are you sure you want delete " + license.innerHTML + " ? The action cannot be undone.";
    function deleteConfirm() {
        let tempVehicle = license.innerHTML;
        console.log(tempVehicle);
        if (tempVehicle === "EH5876" || tempVehicle === "undefined") {
            console.log("about to process defalut process");
            // Question here-----0815
            delbox.style.display = "flex";
            overlay.style.display = "block";
            deleteAlert.innerHTML = "Cannot delete invalid data.";
            afterDelete.style.display = "block";
        }
        else {
            delbox.style.display = "flex";
            overlay.style.display = "block";
            deleteConfirmY.style.display = "block";
            deleteConfirmN.style.display = "block";
            deleteAlert.innerHTML = "Are you sure you want remove " + tempVehicle + " ? The action cannot be undone.";
        }
    }

    deleteConfirmY.onclick = function () {
        let tempVehicle = license.innerHTML;
        console.log(tempVehicle);
        deleteAlert.innerHTML = tempVehicle + " has been removed in the system";
        delParkingArr();
        deleteAllLocalStorage();
        saveLocalStorage(spaces);
        // re-get the value from updated localstorage
        getStorageSummary();
        deleteConfirmY.style.display = "none";
        deleteConfirmN.style.display = "none";
        afterDelete.style.display = "block";
    }


    function startAlertErrorAnimation() {
        errorMsgBox.style.display = "flex";
        errorMsg.classList.add('getAlertEmpty');
    }

    function stopAlertErrorAnimation() {
        errorMsg.classList.remove('getAlertEmpty');
        errorMsgBox.style.display = "none";
    }

    afterDelete.onclick = function () {
        deleteAlert.innerHTML = "";
        delbox.style.display = "none";
        overlay.style.display = "none";
        afterDelete.style.display = "none";
    }

    deleteConfirmN.onclick = function () {
        deleteAlert.innerHTML = "";
        delbox.style.display = "none";
        overlay.style.display = "none";
    }

    function delParkingArr() {
        let validParking = getValidData();
        let target = license.innerHTML;
        let tempSpace = "";
        let tempSpaceNum = 0;
        console.log(target);
        for (let i = 0; i < validParking.length; i++) {
            if (validParking[i].vehicle.license === target) {
                tempSpace = validParking[i].vehicle.space;
                tempSpaceNum = parseInt(tempSpace.substring(5));
                // clear the parking info in the stored array
                //deleteAlert.innerHTML = validParking[i].vehicle.license + " has been removed in the system";
                spaces[tempSpaceNum - 1] = {};
                validParking.splice(i, 1);
                break;
            }
        }
        console.log(validParking);
        console.log(spaces);
        let notNull = spaces.some(obj => Object.keys(obj).length > 0);
        if (notNull) {
            defaultParking = getDefaultParking(validParking);
            console.log(defaultParking);
            showIndividualData(defaultParking);
        }

    }


    /*     function hideDefaultParking(){
            defaultParking ={};
            showIndividualData(defaultParking);
        } */

    function getDefaultParking(validParking) {
        if (validParking) {
            let maxTime = 0;
            let maxParking = "";
            for (let i = 0; i < validParking.length; i++) {
                let tempTime = Date.parse(validParking[i].time.startTime);
                console.log(tempTime);
                if (tempTime > maxTime) {
                    maxTime = tempTime;
                    maxParking = validParking[i];
                }
            }
            return maxParking;
        }

    }



    // SEARCH FUNCTION
    // 1. get search value
    // 2. identify the search value(space# or vehicle#), error alert if not found
    // 3. create a not-null array from all the spaces[] to store valid parkings
    // 4. get parking details by space# or vehicle# - output the dashboard
    // get individual parking info(space number or parking license); output all parking info in webpage
    function getValidData() {
        let validParking = [];
        let tempParking = localStorage.getItem("parkingArr");
        // can find parkingArr;
        if (tempParking !== null && tempParking !== '""') {
            let arrParking = JSON.parse(tempParking);
            for (let key in arrParking) {
                if (typeof arrParking[key] === 'object' && Object.keys(arrParking[key]).length !== 0) {
                    validParking.push(arrParking[key]);
                }
            }
            console.log(validParking);
            return validParking;
        }
        else {
            errorMsgBox.style.display = "flex";
            errorMsg.innerHTML = "Parking system data has been reset.";
            errorMsg.style.color = "white";
            errorMsg.style.backgroundColor = "red";
            return false;
        }
    }

    // resetElementInSpace(''); ------  for test
    function resetElementInSpace(element) {
        const valueToRemove = element;
        let index = spaces.indexOf(valueToRemove);
        while (index !== -1) {
            spaces[index] = {};
            index = spaces.indexOf(valueToRemove, index + 1);
        }
        console.log(spaces);
    }


    function getResultBySpace(spaceNum) {
        console.log("run search result.");
        let validParking = getValidData();
        let arrNum = -1;
        console.log(validParking);
        if (validParking) {
            for (let i = 0; i < validParking.length; i++) {
                if (spaceNum === validParking[i].vehicle.space) {
                    arrNum = i;
                    break;
                }
            }
            console.log(arrNum);
            if (arrNum !== -1) {
                console.log(validParking[arrNum]);
                errorMsgBox.style.display = "none";
                errorMsg.innerHTML = "";
                parkingSearch.style.border = "2px solid grey";
                if (validParking[arrNum].vehicle.license === license.innerHTML) {
                    return;
                }
                else {

                    showIndividualData(validParking[arrNum]);
                    errorMsgBox.style.display = "none";
                    errorMsg.innerHTML = "";
                    parkingSearch.style.border = "2px solid grey";
                }
            }
            else {
                errorMsgBox.style.display = "flex";
                errorMsg.innerHTML = "Fail to get parking data by searching space number.";
                errorMsg.style.color = "white";
                errorMsg.style.backgroundColor = "red";
                parkingSearch.focus();
                parkingSearch.style.border = "2px solid red";
            }
        }
        else {
            errorMessage();
        }
    }

    function getResultByLisence(vehiclelNum) {
        console.log("run search result.");
        let validParking = getValidData();
        let arrNum = -1;
        console.log(validParking);
        if (validParking) {
            for (let i = 0; i < validParking.length; i++) {
                if (vehiclelNum === validParking[i].vehicle.license) {
                    arrNum = i;
                    break;
                }
            }
            console.log(arrNum);
            if (arrNum !== -1) {
                console.log(validParking[arrNum]);
                errorMsgBox.style.display = "none";
                errorMsg.innerHTML = "";
                parkingSearch.style.border = "2px solid grey";
                if (validParking[arrNum].vehicle.license === license.innerHTML) {
                    return;
                }
                else {
                    errorMsgBox.style.display = "none";
                    showIndividualData(validParking[arrNum]);
                    errorMsg.innerHTML = "";
                    parkingSearch.style.border = "2px solid grey";
                }
            }
            else {
                errorMsgBox.style.display = "flex";
                errorMsg.innerHTML = "Fail to get parking data by searching vehicle license.";
                errorMsg.style.color = "white";
                errorMsg.style.backgroundColor = "red";
                parkingSearch.focus();
                parkingSearch.style.border = "2px solid red";
            }
        }
        else {
            errorMessage();

        }
    }

    // ERROR output
    function errorMessage() {
        errorMsgBox.style.display = "flex";
        errorMsg.style.display = "block";
        errorMsg.innerHTML = "**The information you entered does not exist. Please re-enter.";
        parkingSearch.focus();
        parkingSearch.style.border = "2px solid red";
        errorMsg.style.color = "white";
        errorMsg.style.backgroundColor = "red";
    }

    // Search parking number or parking space
    btnSearch.onclick = userSearch;

    function userSearch(event) {
        event.preventDefault();
        pauseAudio();
        let searchValue = parkingSearch.value.trim();
        //console.log(searchValue);
        getSearchResult(searchValue);
        console.log("Access the search function!");
        parkingSearch.value = "";
    }


    function getSearchResult(searchValue) {
        let licenseRegEx = /^(?=(.*[0-9]){2,})(?=(.*[A-Za-z]){2,}).*$/;
        console.log(searchValue.substring(0, 5));
        if (searchValue.substring(0, 5) === "space") {
            console.log("valid space search.")
            let tempSpaceNumber = parseInt(searchValue.substring(5));
            if (tempSpaceNumber >= 1 && tempSpaceNumber <= 28) {
                console.log(tempSpaceNumber);
                console.log("will find " + searchValue);
                getResultBySpace(searchValue);
                //errorMsg.innerHTML ="";
                card.focus();
            }
            else {
                errorMessage();
            }
        }
        else if (licenseRegEx.test(searchValue)) {
            //console.log(searchValue);
            getResultByLisence(searchValue);
            //errorMsg.innerHTML ="";
            card.focus();
        }
        else {
            console.log("Error has occured");
            errorMessage();
        }
    }

    /* Object structure for reference
    {"name":"Mathew",
    "phone":"1234567890",
    "vehicle":{"license":"123VVV",
                "space":"space04",
                "color":"#000000",
                "brand":"",
                "type":""},
    "time":{"prepaidTime":"1hr",
            "startTime":"Thu, 25 Jul 2024 15:29:19 GMT"}}
    */

    // Dashboard Output
    function timeCal(individualParking) {
        let now = new Date();
        let tempStaTime = individualParking.time.startTime;
        //console.log(tempStaTime);
        tempStaTime = new Date(tempStaTime);
        staTime.innerHTML = tempStaTime.toLocaleString();
        //console.log(tempStaTime.toLocaleString());
        let parkTime = now - tempStaTime;
        console.log(parkTime);
        individualParking.clock = {};
        let timerId = parkspace.innerHTML;
        if (timerId >= 1 && timerId <= 28) {
            console.log("Get Timer Storage");
        }
        else {
            console.log("Timer is wrong, please check.");
        }
        // set time for parking time
        if (parkTime) {
            individualParking.clock.parkingClock = {
                dayTimer: Math.floor(parkTime / (1000 * 60 * 60 * 24)),
                hoursTimer: Math.floor((parkTime / 1000 / 60 / 60) % 24),
                minsTimer: Math.floor((parkTime / 1000 / 60) % 60),
                secsTimer: Math.floor((parkTime / 1000) % 60)
            }
            console.log(individualParking.clock.parkingClock);
            parkingTimer.innerHTML = formatClock(individualParking.clock.parkingClock);
            console.log(formatClock(individualParking.clock.parkingClock));
            // set time for part time
            let timerParkingClock = timeCountUp(individualParking.clock.parkingClock, parkingTimer);
            timerParkingClock.start();
            timerStorage[timerId - 1].timerParkingClock = timerParkingClock;

        }
        let tempPrepaidHr = individualParking.time.prepaidTime;
        console.log(tempPrepaidHr);
        prepaidHr.innerHTML = tempPrepaidHr;
        let tempPrepaidMs = getPrepaidMilliseconds(tempPrepaidHr);
        console.log(tempPrepaidMs);
        // compare rest time and prepaid time to decide if time outs.

        let resTime = tempPrepaidMs - parkTime;

        // get initial hour, min and second.
        individualParking.clock.resTimeClock = {
            dayTimer: Math.floor(resTime / (1000 * 60 * 60 * 24)),
            hoursTimer: Math.floor((resTime / 1000 / 60 / 60) % 24),
            minsTimer: Math.floor((resTime / 1000 / 60) % 60),
            secsTimer: Math.floor((resTime / 1000) % 60)
        }
        console.log(individualParking.clock.resTimeClock);
        let timerResTimeClock = timeCountDown(individualParking.clock.resTimeClock, resTimer);
        resTimer.innerHTML = formatClock(individualParking.clock.resTimeClock);
        console.log(formatClock(individualParking.clock.resTimeClock));
        if (parkTime < tempPrepaidMs)
        // rest time count down        
        {
            timerResTimeClock.start();
            timerStorage[timerId - 1].timerResTimeClock = timerResTimeClock;
            timeoutMsg.style.display = "none";
            timeoutTimer.style.display = "none";
        }
        else {
            timerResTimeClock.stop();
            timeoutMsg.innerHTML = "The vehicle has been parked overtime:";
            playAudio();
            console.log("running alarm");
            // add alarm sound here.
            resTimer.innerHTML = "Park Overtime";
            resTimer.style.color = "red";
            // calculate time outs
            let timeoutMs = parkTime - tempPrepaidMs;
            console.log(timeoutMs);
            // get initial hour, min and second.
            individualParking.clock.timeoutClock = {
                dayTimer: Math.floor(timeoutMs / (1000 * 60 * 60 * 24)),
                hoursTimer: Math.floor((timeoutMs / 1000 / 60 / 60) % 24),
                minsTimer: Math.floor((timeoutMs / 1000 / 60) % 60),
                secsTimer: Math.floor((timeoutMs / 1000) % 60)
            }
            console.log(individualParking.clock.timeoutClock);
            timeoutTimer.innerHTML = formatClock(individualParking.clock.timeoutClock);
            console.log(formatClock(individualParking.clock.timeoutClock));
            // set timer for time out
            let timerTimeOutClock = timeCountUp(individualParking.clock.timeoutClock, timeoutTimer);
            timerTimeOutClock.start();
            timerStorage[timerId - 1].timerTimeOutClock = timerTimeOutClock;
        }

    }




function playAudio() { 
  alarmAudio.play(); 
} 

function pauseAudio() { 
  alarmAudio.pause(); 
} 

    /*  // flexibly stop the rest time clock
        function stopResTimer(index) {
            let timers = timerStorage[index];
            let timerSpace = "";
            if (timers.timerParkingClock && timers.timerResTimeClock && timers.timerTimeOutClock) {
                timers.timerParkingClock.stop();
                timers.timerResTimeClock.stop();
                timers.timerTimeOutClock.stop();
                timers = {};
                timerSpace = displayTime(index);
                console.log("Clear parking timers for space" + timerSpace);
            }
        } */

    console.log(timerStorage);
    function stopAllTimer() {
        let timerSpace = "";
        console.log(timerStorage);
        for (let key in timerStorage) {
            if (typeof timerStorage[key] === 'object' && Object.keys(timerStorage[key]).length !== 0) {
                if (timerStorage[key].timerParkingClock) {
                    console.log(timerStorage[key].timerParkingClock);
                    timerStorage[key].timerParkingClock.stop();
                }
                if (timerStorage[key].timerTimeOutClock) {
                    console.log(timerStorage[key].timerTimeOutClock);
                    timerStorage[key].timerTimeOutClock.stop();
                }
                if (timerStorage[key].timerResTimeClock) {
                    console.log(timerStorage[key].timerResTimeClock);
                    timerStorage[key].timerResTimeClock.stop();
                }
                timerStorage[key] = {};
                timerSpace = displayTime(key);
                console.log("Clear parking timers for space" + timerSpace);
            }
        }
    }


    // TIMER
    // CREATE FUNCTION THAT DISPLAYS THE TIME
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


    function formatClock(clock) {
        let secOut = displayTime(clock.secsTimer);
        let minOut = displayTime(clock.minsTimer) + ":";
        let hourOut = displayTime(clock.hoursTimer) + ":";
        let dayOut = "";
        if (clock.dayTimer >= 1) {
            dayOut = "D" + clock.dayTimer + " ";
        }
        let timerUpdate = dayOut + hourOut + minOut + secOut;
        return timerUpdate;
    }

    function displayClock(clock, element) {
        element.innerHTML = formatClock(clock);
    }



    function timeCountUp(clock, element) {
        let interval;
        //CREATE FUNCTION TO START THE CLOCK.	
        function startClock() {
            interval = window.setInterval(timeCount, 1000);
        }
        //CLEAR INTERVAL
        function stopClock() {
            clearInterval(interval);
        }
        //create function to count seconds;
        function timeCount() {
            clock.secsTimer++;
            if (clock.secsTimer === 60) {
                clock.secsTimer = 0;
                clock.minsTimer++;
                if (clock.minsTimer === 60) {
                    clock.minsTimer = 0;
                    clock.hoursTimer++;
                    if (clock.hoursTimer === 24) {
                        clock.hoursTimer = 0;
                        clock.dayTimer++;
                    }
                }
            }
            //use displayTime function to format the seconds;
            displayClock(clock, element);
        }
        return {
            start: startClock,
            stop: stopClock
        };
    }



    function timeCountDown(clock, element) {
        let interval;
        /*         startClock(); */
        //CREATE FUNCTION TO START THE CLOCK.	
        function startClock() {
            interval = window.setInterval(timeCount, 1000);
        }
        //CLEAR INTERVAL
        function stopClock() {
            clearInterval(interval);
        }
        //create function to count seconds;
        function timeCount() {
            if (clock.secsTimer === 0 && clock.minsTimer === 0 && clock.hoursTimer === 0) {
                clearInterval(interval);
            }
            if (clock.secsTimer === 0) {
                clock.secsTimer = 59;
                if (clock.minsTimer === 0) {
                    clock.minsTimer = 59;
                    clock.hoursTimer--;
                }
                else {
                    clock.minsTimer--;
                }
            } else {
                clock.secsTimer--;
            }
            displayClock(clock, element);
        }
        return {
            start: startClock,
            stop: stopClock
        };
    }


    function getPrepaidMilliseconds(prepaidHr) {
        let prepaidMilliseconds = 0;
        switch (prepaidHr) {
            case "2hr":
                prepaidMilliseconds = 2 * 60 * 60 * 1000;
                break;
            case "1.5hr":
                prepaidMilliseconds = 1.5 * 60 * 60 * 1000;
                break;
            case "1hr":
                prepaidMilliseconds = 1 * 60 * 60 * 1000;
                break;
            case "0.5hr":
                prepaidMilliseconds = 0.5 * 60 * 60 * 1000;
                break;
            default:
                console.error("Invalid prepaid time value");
        }
        return prepaidMilliseconds;
    }


    function formatEmpty(input) {
        if (input === "" || input === undefined) {
            return "Unknown";
        }
        else { return input; }
    }

    // test to stop timer on the web page ------------  doesn't work for timer
    /*     function clearIndividualData(){
            type.innerHTML="";
            brand.innerHTML="";
            visitor.innerHTML="";
            phone.innerHTML="";
            license.innerHTML="";
            parkspace.innerHTML="";
            colorShown.style.backgroundColor="#000000";
            parkingTimer.innerHTML="";
            resTimer.innerHTML="";
            timeoutTimer.innerHTML="";
            prepaidHr.innerHTML="";
        } */


    // show individual data on dashboard
    function showIndividualData(individualParking) {
        stopAllTimer();
        if (individualParking) {
            let tempType = individualParking.vehicle.type;
            tempType = formatEmpty(tempType);
            let tempBrand = individualParking.vehicle.brand;
            tempBrand = formatEmpty(tempBrand);
            type.innerHTML = tempType;
            brand.innerHTML = tempBrand;
            visitor.innerHTML = individualParking.name;
            phone.innerHTML = individualParking.phone;
            license.innerHTML = individualParking.vehicle.license;
            parkspace.innerHTML = parseInt(individualParking.vehicle.space.substring(5));
            colorShown.style.backgroundColor = individualParking.vehicle.color;
            timeCal(individualParking);
        }
    }

    function deleteAllLocalStorage() {
        window.localStorage.clear();
    }

    function saveLocalStorage(info) {
        // JSON.stringify() to show the full string in console.log
        window.localStorage.setItem("parkingArr", JSON.stringify(info));
        let parkingStorage = localStorage.getItem("parkingArr");
        console.log(parkingStorage);
    }



}