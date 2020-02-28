// #region Global Imports
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
// #endregion Global Imports

// #region Local Imports
import { DetailsActions } from "./";
import { ActionConsts } from "@Definitions";
// #endregion Local Imports

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("Details action tests", () => {
    test("Map test", () => {
        const store = mockStore();

        const expectedActions = [
            {
                payload: { version: 2 },
                type: ActionConsts.Details.SetReducer
            },
        ];

        store.dispatch(DetailsActions.Map({ version: 2 }));

        expect(store.getActions()).toEqual(expectedActions);
    });

    test("Reset test", async () => {
        const store = mockStore({
            details: {
                version: 1
            },
        });

        const expectedActions = [
            {
                type: ActionConsts.Details.ResetReducer
            },
        ];

        store.dispatch(DetailsActions.Reset());

        expect(store.getActions()).toEqual(expectedActions);
    });
});
