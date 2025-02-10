import React, {useState} from 'react';
import './ProductListTwo.css';
import ProductItem from "../ProductItem/ProductItem";
import {useTelegram} from "../../hooks/useTelegram";
import {useCallback, useEffect} from "react";
import {v4 as uuidv4} from "uuid";

const products = [
    {id: uuidv4(), own: "суп", img: "sup1.jpeg", title: 'рассол', price: 5000, description: 'Синего цвета, прямые'},
    {id: uuidv4(), own: "суп", img: "sup2.jpg", title: 'Куртка', price: 12000, description: 'Зеленого цвета, теплая'},
    {id: uuidv4(), own: "суп", img: "sup3.jpg", title: 'Джинсы 2', price: 5000, description: 'Синего цвета, прямые'},
    {id: uuidv4(), own: "суп", img: "sup4.jpg", title: 'Куртка 8', price: 122, description: 'Зеленого цвета, теплая'},
    {
        id: uuidv4(),
        own: "лапша",
        img: "lapsha1.jpg",
        title: 'Ремень',
        price: 1322,
        description: 'Зеленого цвета, теплая'
    },
    {id: uuidv4(), own: "лапша", img: "lapsha2.jpg", title: 'Пряжка', price: 22, description: 'Зеленого цвета, теплая'},
    {
        id: uuidv4(),
        own: "лапша",
        img: "lapsha3.jpg",
        title: 'Джинсы 3',
        price: 5000,
        description: 'Синего цвета, прямые'
    },
    {
        id: uuidv4(),
        own: "лапша",
        img: "lapsha4.jpeg",
        title: 'Куртка 7',
        price: 600,
        description: 'Зеленого цвета, теплая'
    },
    {
        id: uuidv4(),
        own: "картошка",
        img: "potato1.jpg",
        title: 'Джинсы 4',
        price: 5500,
        description: 'Синего цвета, прямые'
    },
    {
        id: uuidv4(),
        own: "картошка",
        img: "potato2.jpg",
        title: 'Куртка 5',
        price: 12000,
        description: 'Зеленого цвета, теплая'
    },
]

const categories = ["суп", "лапша", "картошка"]

const getTotalPrice = (items = []) => {
    return items.reduce((acc, item) => {
        return acc += item.price
    }, 0)
}

const ProductListTwo = () => {
    const [addedItems, setAddedItems] = useState([]);
    const {tg, queryId, user} = useTelegram();
    const [own, setOwn] = useState("")

    const onClickCat = (itemcat) => {
        setOwn(itemcat)
    }

    const onSendData = useCallback(() => {
        const data = {
            products: addedItems,
            totalPrice: getTotalPrice(addedItems),
            queryId,
            user: user.username
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
            {own ?
                (
                    <>
                        <div className="cursor-pointer hover:bg-gray-300 border-2 px-2 "
                             onClick={() => setOwn("")}
                        >
                            Menu!!!
                        </div>
                        <div
                            className={'list'}>
                            {products.map(item => (
                                item.own === own &&
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
                        className={'list flex flex-col'}
                    >
                        {
                            categories.map((itemcat, index) => (
                                <div
                                    key={index}
                                    className={'item cursor-pointer hover:bg-gray-300 border-2 px-2 '}
                                    onClick={() => onClickCat(itemcat)}
                                >{itemcat}</div>
                            ))
                        }
                    </div>
                )
            }
        </>
    )
}

export default ProductListTwo;