import React, {useState} from 'react';
import './ProductListTwo.css';
import ProductItem from "../ProductItem/ProductItem";
import {useTelegram} from "../../hooks/useTelegram";
import {useCallback, useEffect} from "react";
import {v1} from "uuid"

const products = [
    {id: v1(), own: "Низ", title: 'Джинсы', price: 5000, description: 'Синего цвета, прямые'},
    {id: v1(), own: "Верх", title: 'Куртка', price: 12000, description: 'Зеленого цвета, теплая'},
    {id: v1(), own: "Низ", title: 'Джинсы 2', price: 5000, description: 'Синего цвета, прямые'},
    {id: v1(), own: "Верх", title: 'Куртка 8', price: 122, description: 'Зеленого цвета, теплая'},
    {id: v1(), own: "Низ", title: 'Джинсы 3', price: 5000, description: 'Синего цвета, прямые'},
    {id: v1(), own: "Верх", title: 'Куртка 7', price: 600, description: 'Зеленого цвета, теплая'},
    {id: v1(), own: "Низ", title: 'Джинсы 4', price: 5500, description: 'Синего цвета, прямые'},
    {id: v1(), own: "Верх", title: 'Куртка 5', price: 12000, description: 'Зеленого цвета, теплая'},
]

const getTotalPrice = (items = []) => {
    return items.reduce((acc, item) => {
        return acc += item.price
    }, 0)
}

const ProductListTwo = () => {
    const [addedItems, setAddedItems] = useState([]);
    const {tg, queryId} = useTelegram();
    const [own, setOwn] = useState(true)

    const onClickCatalog = () => {
        setOwn(false)
    }

    const onSendData = useCallback(() => {
        const data = {
            products: addedItems,
            totalPrice: getTotalPrice(addedItems),
            queryId,
        }
        fetch('/web-data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
    }, [addedItems])

    useEffect(() => {
        tg.onEvent('mainButtonClicked', onSendData)
        return () => {
            tg.offEvent('mainButtonClicked', onSendData)
        }
    }, [onSendData])

    const onAdd = (product) => {
        const alreadyAdded = addedItems.find(item => item.id === product.id);
        let newItems = [];

        if (alreadyAdded) {
            newItems = addedItems.filter(item => item.id !== product.id);
        } else {
            newItems = [...addedItems, product];
        }

        setAddedItems(newItems)

        if (newItems.length === 0) {
            tg.MainButton.hide();
        } else {
            tg.MainButton.show();
            tg.MainButton.setParams({
                text: `Купить ${getTotalPrice(newItems)}`
            })
        }
    }

    return (
        <>
            {own === true ?
                (<>
                        <div onClick={() => setOwn(false)}>Menu</div>
                        <div className={'list'}>
                            {products.map(item => (
                                <ProductItem
                                    key={item.id}
                                    product={item}
                                    onAdd={onAdd}
                                    className={'item'}
                                />
                            ))}
                        </div>
                    </>
                ) :
                (
                    <div
                        onClick={()=>setOwn(true)}
                    >
                        Catalog
                    </div>
                )
            }
        </>
    )
}

export default ProductListTwo;