import { describe, expect, test, beforeAll } from "@jest/globals";
import { RowComponent } from "./row.component";
import { bootstrap } from "@gsilber/webez";

describe("RowComponent", () => {
    let component: any = undefined;
    beforeAll(() => {
        const html: string = `<div>Testing Environment</div><div id='main-target'></div>`;
        component = bootstrap<RowComponent>(RowComponent, html);
    });
    describe("Constructor", () => {
        test("Create Instance", () => {
            expect(component).toBeInstanceOf(RowComponent);
        });
    });
});
