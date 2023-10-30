import React from "react";
import {CartCotnent} from "@/components/Contents/CartCotnent";
import {CreateOrderContent} from "@/components/Contents/CreateOrderContent";


export default  async function CreateOrder () {
    return <div className={"pb-20"}>
        <CreateOrderContent/>
    </div>
}