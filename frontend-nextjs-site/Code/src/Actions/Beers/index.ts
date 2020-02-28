// #region Global Imports
import { Dispatch } from "redux";
// #endregion Global Imports

// #region Local Imports
import { BeersService } from "@Services/API/Beers";
import { Http } from "@Services";
import { ActionConsts } from "@Definitions";
// #endregion Local Imports

export const Beers = {
    Map: (payload: {}) => {
        return {
            payload,
            type: ActionConsts.Home.SetReducer,
        };
    },

    Reset: () => ({
        type: ActionConsts.Home.ResetReducer,
    }),

    GetBeers: async () => {
        let response;
        try {
            response = await BeersService.GetBeers();
        } catch (error) {
            response = [];
        }

        return response;
    },
};
