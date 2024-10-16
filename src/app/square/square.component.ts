import {
    BindAttribute,
    BindValue,
    EzComponent,
    Click,
    EventSubject,
} from "@gsilber/webez";
import html from "./square.component.html";
import css from "./square.component.css";

const SQUARES = ["⬛", "⬜"];
function makeSquare(): string {
    return SQUARES[Math.floor(Math.random() * SQUARES.length)];
}

export class SquareComponent extends EzComponent {
    @BindValue("pic")
    private picture: string = makeSquare();

    @BindAttribute("pic", "title", (id: number) => id.toString())
    private id: number;

    /*to remove a specific square */
    removeEvent: EventSubject<number> = new EventSubject<number>();

    private click_num: number = 0;

    constructor(id: number) {
        super(html, css);

        this.id = id;
    }

    clickEvent: EventSubject<number> = new EventSubject<number>();

    @Click("pic")
    clickedSquare() {
        this.swapColor();
        this.addClick();
        this.clickEvent.next(this.id);
    }

    swapColor() {
        /*Swaps the color of a square*/
        if (this.picture == "⬛") {
            this.picture = "⬜";
        } else {
            this.picture = "⬛";
        }
    }

    getId() {
        /*Returns the square's id */
        return this.id;
    }

    resetClick() {
        /*Resets square's click count */
        this.click_num = 0;
    }

    addClick() {
        /*adds to click count */
        this.click_num++;
    }

    getClicks() {
        /*sends click count to row when counting how many counts during victory */
        return this.click_num;
    }

    getColor() {
        /*returns the square color */
        return this.picture;
    }
}
