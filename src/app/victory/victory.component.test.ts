import { describe, expect, test, beforeAll } from "@jest/globals";
import { VictoryComponent } from "./victory.component";
import { bootstrap } from "@gsilber/webez";

describe("VictoryComponent", () => {
    let component: any = undefined;
    beforeAll(() => {
        const html: string = `<div>Testing Environment</div><div id='main-target'></div>`;
        component = bootstrap<VictoryComponent>(VictoryComponent, html);
    });
    describe("Constructor", () => {
        test("Create Instance", () => {
            expect(component).toBeInstanceOf(VictoryComponent);
        });
    });
});
