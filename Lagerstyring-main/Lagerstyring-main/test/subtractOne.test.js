import { describe } from "mocha";

import { assert } from "chai";
import Controller from "../controllers/controller.js";

let controller = new Controller();

describe("When incrementing lagertal", () => {
  it("Should return correct result", async () => {
    //

    const productID = "1017059098";

    const current = await controller.adjustProductAmount(productID, 0); // ændrer med 0 for at få nuværende værdi

    const amountToChange = -1;

    const resultIsNegative = current + amountToChange < 0;

    const expected = resultIsNegative ? 0 : current + amountToChange;

    const actual = await controller.adjustProductAmount(
      productID,
      amountToChange
    );

    console.log(
      "current: ",
      current,
      "\namount to change: ",
      amountToChange,
      "\nactual: ",
      actual,
      "\nexpected: ",
      expected
    );

    assert.equal(actual, expected);
  });
});
