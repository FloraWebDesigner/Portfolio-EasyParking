window.onload = getPageReady;
function getPageReady() {
    let space01 = document.getElementById("space01");
    let space02 = document.getElementById("space02");
    let space03 = document.getElementById("space03");
    let space04 = document.getElementById("space04");
    let space05 = document.getElementById("space05");
    let space06 = document.getElementById("space06");
    let space07 = document.getElementById("space07");
    let space08 = document.getElementById("space08");
    let space09 = document.getElementById("space09");
    let space10 = document.getElementById("space10");
    let space11 = document.getElementById("space11");
    let space12 = document.getElementById("space12");
    let space13 = document.getElementById("space13");
    let space14 = document.getElementById("space14");
    let space15 = document.getElementById("space15");
    let space16 = document.getElementById("space16");
    let space17 = document.getElementById("space17");
    let space18 = document.getElementById("space18");
    let space19 = document.getElementById("space19");
    let space20 = document.getElementById("space20");
    let space21 = document.getElementById("space21");
    let space22 = document.getElementById("space22");
    let space23 = document.getElementById("space23");
    let space24 = document.getElementById("space24");
    let space25 = document.getElementById("space25");
    let space26 = document.getElementById("space26");
    let space27 = document.getElementById("space27");
    let space28 = document.getElementById("space28");
    let spaces = [space01, space02, space03, space04, space05, space06, space07, space08, space09, space10, space11, space12, space13, space14, space15, space16, space17, space18, space19, space20, space21, space22, space23, space24, space25, space26, space27, space28];
    let space = [];

    getFloorView();

    function getFloorView() {
        space = getStorageSummary();
        createdImg(space);
    }

    function getStorageSummary() {
        let tempParking = localStorage.getItem("parkingArr");
        /* 		console.log(tempParking);
            console.log('Length of tempParking:', tempParking.length); */
        if (tempParking !== null && tempParking.trim() !== '""') {
            console.log("parking is not null.")
            space = JSON.parse(tempParking);
            console.log(space);

        }
        else {
            console.log("Parking system data has been reset.");
        }
        return space;

    }


    function createdImg(space) {
        let verticleCar = [1, 2, 3, 4, 5, 6, 7, 8];
        let leftCar = [9, 11, 13, 15, 17, 19, 21, 23, 25, 26, 27, 28];
        let rightCar = [10, 12, 14, 16, 18, 20, 22, 24];
        for (let i = 0; i < space.length; i++) {
            // get valid data of the full array instead of running much null value
            if (space[i] && typeof space[i] === 'object' && space[i].vehicle) {
                let vehicleNum = space[i].vehicle.license;
                let spaceElem = space[i].vehicle.space;
                let spaceNum = parseInt(spaceElem.substring(5));
                console.log(vehicleNum);
                console.log(spaceElem);
                console.log(spaceNum);
                // double check DOM space element before getting the value and img
                let spaceDom = spaces[spaceNum - 1];
                if (spaceDom) {
                    spaceDom.innerHTML = '';
                }
                else {
                    console.log("DOM space is invalid.")
                }
                // varify space number before write data into the DOM spaces
                if (spaceNum < 1 || spaceNum > 28) {
                    console.log("Fail to insert img.");
                }
                else {
                    const img = document.createElement('img');
                    // verticleSpace 
                    if (verticleCar.includes(spaceNum)) {
                        img.width = 60;
                        img.height = 110;
                        img.src = "../img/car-verticle.svg";
                    }
                    // verticle faces left
                    else if (leftCar.includes(spaceNum)) {
                        img.width = 120;
                        img.height = 60;
                        img.src = "../img/car-face-left.svg";
                    }
                    // verticle faces right: /* if (rightCar.includes(spaceNum))  */
                    else if (rightCar.includes(spaceNum)) {
                        img.width = 120;
                        img.height = 60;
                        img.src = "../img/car-face-right.svg";
                    }
                    img.alt = 'vehicle img';
                    spaceDom.appendChild(img);
                    let vehicleInfo = document.createElement('span');
                    vehicleInfo.textContent = vehicleNum; // Example text
                    spaceDom.appendChild(vehicleInfo);

                }

            }
        }

    }
}