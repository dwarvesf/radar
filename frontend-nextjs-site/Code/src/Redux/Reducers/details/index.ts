// #region Local Imports
import { ActionConsts } from "@Definitions";
// #endregion Local Imports

// #region Interface Imports
import { IAction, IDetails } from "@Interfaces";
// #endregion Interface Imports

const INITIAL_STATE: IDetails.IStateProps = { };

type IMapPayload = IDetails.Actions.IMapPayload;

export const DetailsReducer = (state = INITIAL_STATE, action: IAction<IMapPayload>) => {
    switch (action.type) {
        case ActionConsts.Details.SetReducer:
            return {
                ...state,
                ...action.payload
            };

        case ActionConsts.Details.ResetReducer:
            return INITIAL_STATE;

        default:
            return state;
    }
};
