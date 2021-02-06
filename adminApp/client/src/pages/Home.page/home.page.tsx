import React, {useState} from 'react';
import OrderList from "../../components/MaterialUi.component/OrdersList.component/OrdersList.component";

function HomePage() {
    const detailsUSer = JSON.parse(localStorage.getItem('user') as string);

    return (
        <div>
            <p>Welcome {detailsUSer.email}</p>
            <p>Orders</p>
            <OrderList/>
        </div>
    );
}

export default HomePage;
