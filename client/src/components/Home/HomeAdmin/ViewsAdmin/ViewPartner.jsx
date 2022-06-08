import React from "react";
import Advertising from "../../../PartnerHomeComponents/Advertising";
import GeneralActions from "../../../PartnerHomeComponents/GeneralActions";
import ClientsGraph from "../../../Graphics/GraphClient";

export default function ViewPartner() {
    return (
        <div>
            <div style={{padding: "10px"}}>
                <a style={{padding: "10px", color: "#fff", fontSize:"18px" }} 
                href="/home/partner/tincho/eliddelusuario">Experiencia partner</a>
            </div>
            <Advertising/>
            <GeneralActions/>
            <ClientsGraph />
        </div>
    )

}