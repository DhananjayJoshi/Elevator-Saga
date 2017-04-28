# Elevator-Saga
The elevator programming game. Solved for level #4
@author Dhananjay Joshi
-----------------------------------------------
Factors considered:
1. All the elevators and floors given.
2. The number of destination floors at any point in time for each of the elevator.
3. The passing_floor event of each elevator.
4. The floor_button_pressed event of each elevator.
5. The up_button_pressed and the down_button_pressed event of each floor. 

Algorithm:
1. Initialize all the floor objects to listen to the up_button_pressed & down_button_pressed events.
2. To optimally choose the elevator for the floor from which the above event is triggered, consider the elevator having minimum stops.
3. Initialize all the elevator objects to listen to the passing_floor and the floor_button_pressed event.
4. If the floor_button_pressed event is fired from elevator object, then add it to the destination queue of the elevator.
5. If the some floor is going to pass, make the elevator stop to that floor if it is in the destination queue of that elevator.
