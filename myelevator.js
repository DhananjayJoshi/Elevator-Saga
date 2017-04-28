{
    init: function(elevators, floors) {
        var countPasedFloor = 0;
        var count = 0;

        /* Checks if the floorNum is in the destinationQueue of the elevator. */
        function inDestinationQ(elevator, floorNum) {
            if (elevator.destinationQueue.indexOf(floorNum) != -1) {
                return true;
            } else {
                return false;
            }
        }

        // Check for each floor    
        floors.forEach(function(floor) {
            // console.log("******* in foreach of floor : ",  floor.floorNum());

            /* If any of the elevator has this floor in its destination queue then don`t do anything. 
               Else, put the floor in the destination queue of the elevator with less work. */

            floor.on("up_button_pressed down_button_pressed", function() {
                if (elevators.some(function(e) {
                    return inDestinationQ(e, floor.floorNum());
                })) {
                    return;
                }

                var elevator = elevators[0];

                for (var i = 0; i < elevators.length; i++) {
                    if (elevators[i].destinationQueue.length < elevator.destinationQueue.length) {
                        elevator = elevators[i];
                    }
                }

                if (!inDestinationQ(elevator, floor.floorNum())) {
                    elevator.goToFloor(floor.floorNum());
                    //console.log("Queue : ", elevator.destinationQueue);
                }
            });
        });

                //Check for each elevator
        elevators.forEach(function(elevator) {
            // console.log("======= in foreach of elevator :", elevators.indexOf(elevator));

            /* Before pasing each floor check whether it is in the destination queue of the current elevator, 
               go to that floor before any other floor in that queue.
               This event is not supposed to fire if the floor number is in the destination queue as per documentation, 
               but it still get fires on some such situations, thus handled to optimize time.  */

            elevator.on("passing_floor", function(floorNum, direction) {
                countPasedFloor++;
                // console.log("Count : ", countPasedFloor);
                if (inDestinationQ(elevator, floorNum)) {
                    count++;
                    // console.log("Count in if: ", count);
                    elevator.destinationQueue = elevator.destinationQueue.filter(function(f) {
                        if (f != floorNum) {
                            return true;
                        } else {
                            return false;
                        }
                    });
                    elevator.goToFloor(floorNum, true);
                }
            });

            /* If the floor button is pressed and, it is not in the destination queue of the elevator, 
               add that floor into the destination Q of the same elevator at the end. */

            elevator.on("floor_button_pressed", function(floorNum) {
                if (!inDestinationQ(elevator, floorNum))
                    elevator.goToFloor(floorNum);
                    //console.log("Queue : ", elevator.destinationQueue);
            });
        });
    },
    update: function(dt, elevators, floor_button_pressed) {}
}
