import React from "react";
import Advertising from "../../../PartnerHomeComponents/Advertising";
import GeneralActions from "../../../PartnerHomeComponents/GeneralActions";
import ClientsGraph from "../../../Graphics/GraphClient";

export default function ViewPartner() {
    return (
        <div>
            <Advertising/>
            <GeneralActions/>
            <ClientsGraph />
        </div>
    )

}