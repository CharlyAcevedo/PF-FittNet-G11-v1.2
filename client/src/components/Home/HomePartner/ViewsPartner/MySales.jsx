import React from "react";
import IncomesGraph from "../../../Graphics/Incomes";
import { useSelector } from "react-redux";

export function MySales () {
    const user = useSelector((state)=>state.user)
    console.log(user, 'user de mysales')

    return (
        <div>
            <IncomesGraph />
        </div>
    )


}