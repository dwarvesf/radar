// #region Global Imports
import React, { useState, useEffect } from "react";
import { NextPage } from "next";
import { useSelector, useDispatch } from "react-redux";
// #endregion Global Imports
import { useRouter } from "next/router";

// #region Local Imports
import { withTranslation } from "@Server/i18n";
import { Container, BeerButton, HeaderWrapper } from "@Styled/Home";
import { IStore } from "@Redux/IStore";
import { BeersService } from "@Services/API/Beers";
import { HomeActions } from "@Actions";
import { Ticket, Layout, Heading } from "@Components";

// #endregion Local Imports

// #region Interface Imports
import { IHomePage, ReduxNextPageContext } from "@Interfaces";
// #endregion Interface Imports

const Home: NextPage<IHomePage.IProps, IHomePage.InitialProps> = () => {
    const home = useSelector((state: IStore) => state.home);
    const [beers, setBeers]: any[] = useState([]);
    const router = useRouter();

    useEffect(() => {
        BeersService.GetBeers().then(res => {
            setBeers(res);
        });
    }, []);
    const handleClick = () => {
        router.push({ pathname: `/beer`, query: { random: "true" } });
    };
    return (
        <Container>
            <Heading text="Beer craft" />
            <Layout>
                <HeaderWrapper>
                    <BeerButton onClick={handleClick}>
                        <img
                            title="grab random beer"
                            alt="beer"
                            src="static/images/beer.png"
                        />
                    </BeerButton>
                </HeaderWrapper>
                {beers.map((beer: any) => {
                    return <Ticket key={beer.id} beer={beer} />;
                })}
            </Layout>
        </Container>
    );
};

Home.getInitialProps = async (
    ctx: ReduxNextPageContext
): Promise<IHomePage.InitialProps> => {
    await ctx.store.dispatch(
        HomeActions.GetApod({
            params: { hd: true },
        })
    );
    return { namespacesRequired: ["common"] };
};

const Extended = withTranslation("common")(Home);

export default Extended;
