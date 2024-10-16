import { BindValue, EzComponent } from "@gsilber/webez";
import html from "./victory.component.html";
import css from "./victory.component.css";

function printVictory(color: string, clickNum: number): string {
    return "You won " + color + " with " + clickNum + " clicks";
}

export class VictoryComponent extends EzComponent {
    private clickNum: number = 0;
    private color: string = "";

    constructor(clickNum: number, color: string) {
        super(html, css);
        this.clickNum = clickNum;
        this.color = color;
    }

    @BindValue("victories")
    private victoryMessage: string = printVictory(this.color, this.clickNum);

    victory() {
        /*Prints a victory message of what color won and how many clicks it took */
        this.victoryMessage = printVictory(this.color, this.clickNum / 3);
    }
}
