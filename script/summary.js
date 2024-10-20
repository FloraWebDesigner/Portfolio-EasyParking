window.onload = pageReady;

function pageReady() {
    let validArr = [];
    let parkSecsOut = "";
    let parkMinsOut = "";
    let parkHoursOut = "";
    let parkDaysOut = "";
    let timeUpdated=document.querySelector(".timeNow");
    let summaryReport=document.querySelector(".summaryReport");
    let totalParking=0;
    let totalTimeOuts=0;

    getExistingParking();
    getRefreshTime();

    function getRefreshTime(){
        let currentTime=new Date();
        timeUpdated.innerHTML="Last refreshed: "+currentTime.toLocaleString();
    }

    function getParkingInfo(){
        summaryReport.innerHTML="Total Parking Vehicles: "+totalParking+" ; TimeOut Vehicles : "+totalTimeOuts;
    }
    

    function getExistingParking() {
        let tempParking = localStorage.getItem("parkingArr");
        // can find parkingArr;
        if (tempParking !== null&&tempParking!=='""') {
            let arrParking = JSON.parse(tempParking);
            console.log(arrParking);
            validArr = getValidData(arrParking);
            console.log(validArr);
            console.log(validArr.length);
            formatArr(validArr);
            getParkingInfo();
            writeTable(validArr);
        }
        else {
            console.log("There is no vehicle parking in the parking lot.");
        }
    }

    // get an parking array without null value
    function getValidData(arrParking) {
        for (let key in arrParking) {
            if (typeof arrParking[key] === 'object' && Object.keys(arrParking[key]).length !== 0) {
                validArr.push(arrParking[key]);
            }
        }
        console.log(validArr);
        totalParking=validArr.length;
        return validArr;
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

    function formatArr(validArr) {
        if (validArr) {
            for (let i = 0; i < validArr.length; i++) {
                let tempStaTime = "";
                let now = new Date();
                // format start time
                tempStaTime = validArr[i].time.startTime;
                tempStaTime = new Date(tempStaTime);
                let parkTime = now - tempStaTime;

                let tempPrepaidHr = validArr[i].time.prepaidTime;
                console.log(tempPrepaidHr);
                let tempPrepaidMs = getPrepaidMilliseconds(tempPrepaidHr);
                console.log(tempPrepaidMs);
        // compare rest time and prepaid time to decide if time outs.        
               let resTime = tempPrepaidMs - parkTime;
                if(resTime<0){totalTimeOuts++;}
                validArr[i].clock = {
                    dayTimer: Math.floor(parkTime / (1000 * 60 * 60 * 24)),
                    hoursTimer: Math.floor((parkTime / 1000 / 60 / 60) % 24),
                    minsTimer: Math.floor((parkTime / 1000 / 60) % 60),
                    secsTimer: Math.floor((parkTime / 1000) % 60)
                }
                validArr[i].time.startTime = tempStaTime.toLocaleString();
                // calculate time
                console.log(parkTime);
                // initial parktime into the object
                validArr[i].parktime = formatPartTime(validArr[i].clock);
                parkingTimeCountUp(validArr[i].clock, i);
            }
                console.log(totalTimeOuts);
        }
        else {
            console.log("No vehicle parks in the parking lot.");
        }
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

    function formatPartTime(clock) {
        parkSecsOut = displayTime(clock.secsTimer);
        parkMinsOut = displayTime(clock.minsTimer) + ":";
        parkHoursOut = displayTime(clock.hoursTimer) + ":";
        parkDaysOut = displayDay(clock.dayTimer);
        /*      console.log(parkDaysOut);
                console.log(parkMinsOut);
                console.log(parkSecsOut);
                console.log(parkHoursOut); */
        return parkDaysOut + " " + parkHoursOut + parkMinsOut + parkSecsOut;
    }

    function displayDay(dayTimer) {
        if (dayTimer >= 1) {
            parkDaysOut = "D" + dayTimer;
        }
        else if (dayTimer === 0) {
            parkDaysOut = "";
        }
        else {
            parkDaysOut = "Rest parking time is wrong, please check!";
        }
        return parkDaysOut;
    }


    function parkingTimeCountUp(clock, index) {
        let interval;
        startClock();
        //CREATE FUNCTION TO START THE CLOCK.	
        function startClock() {
            interval = window.setInterval(timeCount, 1000);
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
            displayTimer();
        }

        function displayTimer() {
            if (interval) {
                parkSecsOut = displayTime(clock.secsTimer);
                parkMinsOut = displayTime(clock.minsTimer) + ":";
                parkHoursOut = displayTime(clock.hoursTimer) + ":";
                parkDaysOut = displayDay(clock.dayTimer);
                let timerUpdate = parkDaysOut + " " + parkHoursOut + parkMinsOut + parkSecsOut;
                document.querySelector(".parkingTable tbody").rows[index].cells[4].textContent = timerUpdate;
            }
        }
    }


}

// https://www.w3schools.com/jsref/jsref_foreach.asp
//https://www.w3schools.com/jsref/met_tablerow_insertcell.asp
//https://www.w3schools.com/jsref/met_node_appendchild.asp
function writeTable(data) {
    let tableBody = document.querySelector(".parkingTable tbody");
    tableBody.innerHTML = "";

    data.forEach(function (obj) {
        let row = tableBody.insertRow();
        let col1 = row.insertCell(0);
        let col2 = row.insertCell(1);
        let col3 = row.insertCell(2);
        let col4 = row.insertCell(3);
        let col5 = row.insertCell(4);
        let col6 = row.insertCell(5);
        let col7 = row.insertCell(6);
        let col8 = row.insertCell(7);
        let col9 = row.insertCell(8);


        col1.textContent = obj.vehicle.space;
        col2.textContent = obj.vehicle.license;
        col3.textContent = obj.time.startTime;
        col4.textContent = obj.time.prepaidTime;
        col5.textContent = obj.parktime;
        col6.textContent = obj.name;
        col7.textContent = obj.phone;
        col8.textContent = obj.vehicle.brand;
        col9.textContent = obj.vehicle.type;


    })

    /* object output as a reference to get properties
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


}
