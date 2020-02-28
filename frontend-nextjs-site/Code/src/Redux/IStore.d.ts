// #region Interface Imports
import { IHomePage, IDetails } from "@Interfaces";
// #endregion Interface Imports

export interface IStore {
    details: IDetails.IStateProps;
    home: IHomePage.IStateProps;
}
