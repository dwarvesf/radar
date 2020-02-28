// #region Local Imports
import { IAction, IDetails } from "@Interfaces";
import { ActionConsts } from "@Definitions";
import { DetailsReducer } from ".";
// #endregion Local Imports

describe("Details reducer", () => {
    it("should return the initial state", () => {
        expect(DetailsReducer(
            undefined,
            {} as IAction<IDetails.IStateProps>)
        ).toEqual({});
    });
});
