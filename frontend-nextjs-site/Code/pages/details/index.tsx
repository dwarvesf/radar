// #region Global Imports
import React, { useState, useEffect } from "react";
import { NextPage } from "next";
// #endregion Global Imports

// #region Local Imports
import { withTranslation } from "@Server/i18n";
import { BeerDetailsService } from "@Services/API/BeerDetails";
import { Container } from "@Styled/Home";
import { useRouter } from "next/router";
import { Layout } from "@Components";
import "./style.scss";
// #endregion Local Imports

// #region Interface Imports
import { ReduxNextPageContext, IDetails } from "@Interfaces";
// #endregion Interface Imports

export const Details: NextPage<IDetails.IProps, IDetails.InitialProps> = () => {
    const [detail, setDetail]: any[] = useState([]);
    const router = useRouter();
    const {
        query: { id, random },
    } = useRouter();

    useEffect(() => {
        if (random === "true") {
            BeerDetailsService.GetRandomBeer().then(r => {
                setDetail(r);
            });
        } else {
            BeerDetailsService.GetBeerById(id).then(r => {
                setDetail(r);
            });
        }
    }, [id, random, router.query]);

    return (
        <Container>
            <Layout>
                {detail.map((d: any) => {
                    return (
                        <div key="d.id">
                            <div className="details">
                                <div className="titles">
                                    <h1>{d.name}</h1>
                                    <h2>{d.tagline}</h2>
                                </div>
                                <div className="img-container">
                                    <img
                                        src={
                                            d.image_url
                                                ? d.image_url
                                                : "https://stamandtrade.com/wp-content/uploads/2017/03/no-image-available.jpg"
                                        }
                                    />
                                </div>
                            </div>
                            <div className="description">
                                <div className="ingredients">
                                    <div id="desc">{d.description}</div>
                                    <h5>Malts</h5>
                                    {d.ingredients.malt.map(
                                        (m: any, index: any) => {
                                            return (
                                                <span key={index}>
                                                    {(index ? ", " : "") +
                                                        m.name}
                                                </span>
                                            );
                                        }
                                    )}
                                    <h5>Hops</h5>
                                    {d.ingredients.hops.map(
                                        (h: any, index: any) => {
                                            return (
                                                <span key={index}>
                                                    {(index ? ", " : "") +
                                                        h.name}
                                                </span>
                                            );
                                        }
                                    )}
                                    <h5>Recommended Pairings</h5>
                                    <ul>
                                        {d.food_pairing.map(
                                            (f: any, index: any) => {
                                                return <li key={index}>{f}</li>;
                                            }
                                        )}
                                    </ul>
                                </div>
                                <div className="vital-stats">
                                    <div className="ibu">
                                        {d.ibu}
                                        <span>IBU</span>
                                    </div>
                                    <div className="abv">
                                        {d.abv}
                                        <span>ABV</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </Layout>
        </Container>
    );
};

Details.getInitialProps = async (
    ctx: ReduxNextPageContext
): Promise<IDetails.InitialProps> => {
    return { namespacesRequired: ["common"] };
};

export default withTranslation("common")(Details);
