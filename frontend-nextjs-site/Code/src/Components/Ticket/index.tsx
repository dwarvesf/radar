// #region Global Imports
import * as React from "react";
// #endregion Global Imports
import { useRouter } from "next/router";

// #region Local Imports
import "./style.scss";
// #endregion Local Imports

// #region Interdace Imports
import { ITicket } from "./Ticket";
// #endregion Interdace Imports

const Ticket: React.FunctionComponent<ITicket.IProps> = (
    props
): JSX.Element => {
    const router = useRouter();
    const { beer }: any = props;
    const { name, image_url: imageUrl, id } = beer;
    const handleClick = () => {
        router.push({ pathname: `/beer`, query: { id } });
    };
    return (
        <div className="card" onClick={handleClick} role="button">
            <h3 className="title">{name}</h3>
            <div className="bar">
                <div className="emptybar" />
                <div className="filledbar" />
            </div>
            <div className="beer-image">
                <img data-loading="lazy" src={imageUrl} alt="beer-image" />
            </div>
        </div>
    );
};

export { Ticket };
