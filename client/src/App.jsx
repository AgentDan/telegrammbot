import './App.css';
import {useEffect} from "react";
import {useTelegram} from "./hooks/useTelegram";
import Header from "./components/Header/Header";
import {Route, Routes} from 'react-router-dom'
import Form from "./components/Form/Form";
import ProductListTwo from "./components/ProductListTwo/ProductListTwo.jsx";
import ListOrders from "./components/ListOrders/ListOrders.jsx";
import Admin from "./components/Admin/Admin.jsx";

function App() {
    const {onToggleButton, tg} = useTelegram();

    useEffect(() => {
        tg.ready();
    }, [])

    return (
        <div className="App">
            {location.pathname !== "/admin" && <Header />}
            <Routes>
                <Route index element={<ProductListTwo />}/>
                {/*<Route index element={<ProductList />}/>*/}
                <Route path={'form'} element={<Form />}/>
                <Route path={'orders'} element={<ListOrders />}/>
                <Route path={'admin'} element={<Admin/>}/>
            </Routes>
        </div>
    );
}

export default App;