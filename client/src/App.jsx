import './App.css';
import {useEffect} from "react";
import {useTelegram} from "./hooks/useTelegram";
import Header from "./components/Header/Header";
import {Route, Routes} from 'react-router-dom'
import ProductList from "./components/ProductList/Productlist.jsx";
import Form from "./components/Form/Form";
import ProductListTwo from "./components/ProductListTwo/ProductListTwo.jsx";

function App() {
    const {onToggleButton, tg} = useTelegram();

    useEffect(() => {
        tg.ready();
    }, [])

    return (
        <div className="App">
            <Header />
            <Routes>
                <Route index element={<ProductListTwo />}/>
                {/*<Route index element={<ProductList />}/>*/}
                <Route path={'form'} element={<Form />}/>
            </Routes>
        </div>
    );
}

export default App;