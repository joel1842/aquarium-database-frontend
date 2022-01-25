import React from "react";
import "./TankCardExpanded.css";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import Loading from "../../../routes/Loading";
import { StandardNavBar } from "../../../components/Bars/StandardNavBar";
import { OnTimeCard } from "./OnTimeCard"
import { TankCardMain } from "./TankCardMain"
import { MyFish } from "./MyFish"
import { TankJournal } from "./TankJournal"
import Footer from "../../Bars/Footer"

const TankCardExpanded = ({tank, deleteSwitch}) => {

    return(
        <div>
            <StandardNavBar />

            <div className="tankCardContainer">

                <TankCardMain tank={tank} deleteSwitch={deleteSwitch}/>

                <MyFish tank={tank}/>

                <TankJournal tank={tank}/>

                <OnTimeCard />

            </div>

            <Footer />
        </div>
    )
}

export default withAuthenticationRequired(TankCardExpanded, {
    onRedirecting: () => <Loading />,
  });