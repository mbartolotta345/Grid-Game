import { EzComponent, EventSubject } from "@gsilber/webez";
import html from "./row.component.html";
import css from "./row.component.css";
import { SquareComponent } from "../square/square.component";

export class RowComponent extends EzComponent {
    private squares: SquareComponent[] = [];
    private latestSquareId = 0;
    private width: number = 0;
    private clickNum: number = 0;
    private row_id: number = 0;

    //sends the square_id
    clickRowEventSquare: EventSubject<number> = new EventSubject<number>();

    constructor(width: number, row_id: number, latestSquareId: number) {
        super(html, css);
        this.width = width;
        this.row_id = row_id;
        this.latestSquareId = latestSquareId;
    }

    getId() {
        /*Returns the row's id */
        return this.row_id;
    }

    addSquare() {
        /*Adds a square component to this.squares*/
        const newSquare = new SquareComponent(this.latestSquareId);
        this.addComponent(newSquare, "squares");
        this.squares.push(newSquare);
        this.latestSquareId++;

        /*Event subscriber for grid to know how when to check for a victory, this is when a square is clicked*/
        newSquare.clickEvent.subscribe((square_id: number) => {
            this.clickRowEventSquare.next(square_id);
            console.log("square id is " + square_id);
        });
    }

    removeSquare(target: number) {
        /*Takes a target number and removes a square based on id*/
        for (let i = 0; i < this.squares.length; i++) {
            if (this.squares[i].getId() === target) {
                const removedElements = this.squares.splice(i, 1);
                this.removeComponent(removedElements[0]);
                return;
            }
        }
    }

    createRow(width: number) {
        /*Creates a row using addSquare method */
        for (let i = 0; i < width; i++) {
            this.addSquare();
        }
    }

    removeAllSquares() {
        /*Removes all squares in the row component */
        this.squares.splice(0, this.squares.length);
        for (let square of this.squares) {
            this.removeComponent(square);
        }
    }

    countClicks() {
        /*Counts all the clicks from each square component in this.squares */
        for (let square of this.squares) {
            this.clickNum += square.getClicks();
        }
        return this.clickNum;
    }

    resetClicks() {
        /*Resets the click counter for each square component */
        for (let square of this.squares) {
            square.resetClick();
        }
        this.clickNum = 0;
    }

    checkSameColor() {
        /*Checks if all the squares in the row component are white or black */
        let colorLength: number = 0;
        //If colorLength is the length of squares then it is white, if it is the negative of the length of squares it is black

        for (let square of this.squares) {
            if (square.getColor() == "⬜") {
                colorLength++;
            }
            if (square.getColor() == "⬛") {
                colorLength--;
            }
        }

        if (colorLength === this.squares.length) {
            //white victory
            return 1;
        }
        if (colorLength == this.squares.length - this.squares.length * 2) {
            //black victory
            return -1;
        } else {
            return 0;
        }
    }

    changeSquareById(given_id: number) {
        /*Takes a given id of a square and swap's its color */
        for (let square of this.squares) {
            if (square.getId() == given_id) {
                square.swapColor();
            }
        }
    }

    getSquareId() {
        /*Returns a square's id*/
        for (let square of this.squares) {
            square.getId();
        }
    }
}
