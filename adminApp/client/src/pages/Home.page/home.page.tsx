import React, {useState} from 'react';
import OrderList from "../../components/MaterialUi.component/OrdersList.component/OrdersList.component";

function HomePage() {

    return (
        <div>
            <p>Welcome Admin</p>
            <p>Orders</p>
            <OrderList/>
        </div>
    );
}

export default HomePage;
