import html from "./main.component.html";
import css from "./main.component.css";
import { EzComponent } from "@gsilber/webez";
import { GridComponent } from "./grid/grid.component";

/**
 * @description MainComponent is the main component of the app
 * @extends EzComponent
 *
 */
export class MainComponent extends EzComponent {
    private grid: GridComponent;

    constructor() {
        super(html, css);

        this.grid = new GridComponent();
        this.addComponent(this.grid, "grid");
    }
}
