import { describe, expect, test, beforeAll } from "@jest/globals";
import { SquareComponent } from "./square.component";
import { bootstrap } from "@gsilber/webez";

describe("SquareComponent", () => {
    let component: any = undefined;
    beforeAll(() => {
        const html: string = `<div>Testing Environment</div><div id='main-target'></div>`;
        component = bootstrap<SquareComponent>(SquareComponent, html);
    });
    describe("Constructor", () => {
        test("Create Instance", () => {
            expect(component).toBeInstanceOf(SquareComponent);
        });
    });
});
