import { Click, EzComponent, Input, ValueEvent } from "@gsilber/webez";
import html from "./grid.component.html";
import css from "./grid.component.css";
import { RowComponent } from "../row/row.component";
import { VictoryComponent } from "../victory/victory.component";

export class GridComponent extends EzComponent {
    private rows: RowComponent[] = [];
    public height: number = 3;
    public width: number = 3;
    private clickNum: number = 0;
    private victories: VictoryComponent[] = [];
    private latestRowId: number = 0;
    private variant: string = "rowAndColumn";
    private clickedRowId: number = 0;
    private latestSquareId: number = 0;

    constructor() {
        super(html, css);
    }

    /*Getting height input*/
    @Input("height")
    setHeight(evt: ValueEvent) {
        this.height = parseInt(evt.value);
    }

    /*Getting width input*/
    @Input("width")
    setWidth(evt: ValueEvent) {
        this.width = parseInt(evt.value);
    }

    /*Getting the variant type for game*/
    @Input("variant")
    setVariant(evt: ValueEvent) {
        this.variant = evt.value;
    }

    @Click("new-game")
    createGrid() {
        /*Creates the grid*/
        console.log(this.variant);
        this.latestRowId = 0;
        this.latestSquareId = 1;
        /*Resets values for victory component, row component, and the squares in a row component*/
        for (let victory of this.victories) {
            this.removeComponent(victory);
            this.victories = [];
        }
        for (let row of this.rows) {
            row.removeAllSquares();
            this.removeComponent(row);
            this.rows = [];
        }
        for (let i = 0; i < this.height; i++) {
            const newRow = new RowComponent(
                this.width,
                this.latestRowId,
                this.latestSquareId,
            );
            this.latestSquareId = this.latestSquareId + this.width;
            newRow.createRow(this.width);
            this.addComponent(newRow, "rows");
            this.rows.push(newRow);
            this.latestRowId++;
        }

        for (let row of this.rows) {
            row.clickRowEventSquare.subscribe((square_id: number) => {
                //When a square is clicked checks for victory

                //Determines which variant to use
                if (this.variant == "rowAndColumn") {
                    this.rowAndColumn(square_id);
                }

                if (this.variant == "cardinalNeighbors") {
                    this.cardinalNeighbors(square_id);
                }

                if (this.variant == "diagonalNeighbors") {
                    this.diagonalNeighbors(square_id);
                }
                if (this.variant == "simpleClick") {
                    this.simpleClick();
                }
            });
        }
    }

    rowAndColumn(square_id: number) {
        for (let row of this.rows) {
            for (let i = 1; i < this.height; i++) {
                row.changeSquareById(square_id + this.width * i);
                row.changeSquareById(square_id - this.width * i);
                //for the entire column
            }
            /* BETA FOR ROW
            for (let i = 1; i < this.width; ) {
                if (
                    (square_id + i) % this.width !== 0 &&
                    square_id + i <= this.width
                ) {
                    //if not at end
                    row.changeSquareById(square_id + i);
                    i++;
                }
            }
            for (let i = 1; i < this.width; i++) {
                if (
                    (square_id - i) % this.width !== 1 &&
                    (square_id - i) % this.width !== 0
                ) {
                    //not at start of row
                    row.changeSquareById(square_id + i);
                }

                //row.changeSquareById(square_id + this.height * i);
                //row.changeSquareById(square_id - this.height * i);
                //for the entire column
            }*/
        }
        this.checkVictory();
    }

    simpleClick() {
        this.checkVictory();
    }

    cardinalNeighbors(square_id: number) {
        /*Cardinal Neighbors, '+' shape, takes the square_id of the square clicked*/
        for (let row of this.rows) {
            //horizontal
            if (square_id % this.width == 1) {
                //if at start
                row.changeSquareById(square_id + 1);
            }
            if (square_id % this.width == 0) {
                //if at end of the row
                row.changeSquareById(square_id - 1);
            }
            if (
                square_id % this.width !== 0 &&
                square_id % this.width !== 1 &&
                square_id % this.width !== 0
            ) {
                //if not at start or end
                row.changeSquareById(square_id - 1);
                row.changeSquareById(square_id + 1);
            }

            //vertical
            if (square_id < this.width) {
                //if top row
                row.changeSquareById(square_id + this.width);
            }
            if (square_id > this.width * this.height - this.width) {
                //if bottom row
                row.changeSquareById(square_id - this.width);
            }
            if (
                (square_id > this.width &&
                    square_id < this.width * this.height - this.width) ||
                square_id == this.width * this.height - this.width
            ) {
                //if not bottom or top row
                row.changeSquareById(square_id - this.width);
                row.changeSquareById(square_id + this.width);
            }
        }
        this.checkVictory();
    }

    diagonalNeighbors(square_id: number) {
        //x shape

        for (let row of this.rows) {
            row.changeSquareById(square_id - this.width - 1);
            row.changeSquareById(square_id - this.width + 1);
            row.changeSquareById(square_id + this.width - 1);
            row.changeSquareById(square_id + this.width + 1);
        }
        this.checkVictory();
    }

    getClickNum() {
        /*Gets the number of clicks from the rows */
        for (let row of this.rows) {
            this.clickNum += row.countClicks();
        }
        return this.clickNum;
    }

    resetClickNum() {
        /*Resets the number of clicks, called after victory */
        for (let row of this.rows) {
            row.resetClicks();
        }
        this.clickNum = 0;
    }

    victoryWhite() {
        /*Used after victory of all white squares, to display type of victory and clicks, then resets click num */
        console.log(
            "You win all white! with " + this.getClickNum() + " clicks!",
        );
        const newVictory = new VictoryComponent(this.getClickNum(), "white");
        this.addComponent(newVictory, "victories");
        newVictory.victory();
        this.victories.push(newVictory);
        this.resetClickNum();
    }

    victoryBlack() {
        /*Used after victory of all black squares, to display type of victory and clicks, then resets click num */
        console.log(
            "You win all black! with " + this.getClickNum() + " clicks!",
        );
        const newVictory = new VictoryComponent(this.getClickNum(), "black");
        this.addComponent(newVictory, "victories");
        newVictory.victory();
        this.victories.push(newVictory);
        this.resetClickNum();
    }

    checkVictory() {
        /*Checks if all the rows are the same color and calls the correct victory type method*/
        let rowColorTracker: number = 0;
        for (let row of this.rows) {
            if (row.checkSameColor() == 0) {
                return;
            }
            if (row.checkSameColor() == 1) {
                //if row white
                rowColorTracker++;
            }
            if (row.checkSameColor() == -1) {
                //if row black
                rowColorTracker--;
            }
        }
        if (rowColorTracker == this.rows.length) {
            //all rows are white
            this.victoryWhite();
            return;
        }
        if (rowColorTracker == this.rows.length - this.rows.length * 2) {
            //all rows are black
            this.victoryBlack();
            return;
        } else {
            return;
        }
    }
}
