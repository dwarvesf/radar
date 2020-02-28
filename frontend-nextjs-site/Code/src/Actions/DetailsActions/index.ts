// #region Local Imports
import { BeerDetailsService } from "@Services/API/BeerDetails";
import { ActionConsts } from "@Definitions";
// #endregion Local Imports

export const DetailsActions = {
    Map: (payload: {}) => {
        return {
            payload,
            type: ActionConsts.Details.SetReducer,
        };
    },

    Reset: () => ({
        type: ActionConsts.Details.ResetReducer,
    }),

    GetRandomBeer: async () => {
        let res;
        try {
            res = await BeerDetailsService.GetRandomBeer();
        } catch (error) {
            res = [];
        }
        return res;
    },
};
