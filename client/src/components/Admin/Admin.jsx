import React from 'react';
import Couriers from "./Curiers.jsx";
import Orders from "./Orders.jsx";

const Admin = () => {
    return (
        <div className="flex flex-wrap gap-2">
            <Orders/>
            <Couriers/>
        </div>
    );
};

export default Admin;