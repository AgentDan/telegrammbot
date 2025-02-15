import React, {useState} from 'react';
import './ProductListTwo.css';
import ProductItem from "../ProductItem/ProductItem";
import {useTelegram} from "../../hooks/useTelegram";
import {useCallback, useEffect} from "react";
import {state} from './../State/state.js'

const products = state

const categories = ["суп", "лапша", "картошка", "горячие блюда", "салат"]

const getTotalPrice = (items = []) => {
    return items.reduce((acc, item) => {
        return acc += item.price
    }, 0)
}

const ProductListTwo = () => {
    const [addedItems, setAddedItems] = useState([]);
    const {tg, queryId, user} = useTelegram();
    const [own, setOwn] = useState("")
    const [adress, setAdress] = useState(false)
    const [delivery, setDelivery] = useState('legal');
    const [street, setStreet] = useState('');
    const [house, setHouse] = useState('');
    const [note, setNote] = useState('');
    const [nameSurname, setNameSurname] = useState('')

    const onClickCat = (itemcat) => {
        setOwn(itemcat)
    }

    const onChangeDelivery = (e) => {
        setDelivery(e.target.value)
    }

    const onChangeNameSurname = (e) => {
        setNameSurname(e.target.value)
    }

    const onChangeStreet = (e) => {
        setStreet(e.target.value)
    }

    const onChangeHouse = (e) => {
        setHouse(e.target.value)
    }

    const onChangNote = (e) => {
        setNote(e.target.value)
    }

    const onSendData = useCallback(() => {
        const data = {
            products: addedItems,
            totalPrice: getTotalPrice(addedItems),
            queryId,
            user: user.username,
            del: delivery,
            street: street,
            house: house,
            note: note,
            nameSurname: nameSurname
        }
        fetch('/api/bot/web-data', {
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
            {adress === true ? (

                    own ?
                        (
                            <>
                                <div
                                    className=" cursor-pointer hover:bg-gray-300 w-[100px] text-center m-4 rounded-[5px] bg-[#2AABEE]"
                                    onClick={() => setOwn("")}
                                >
                                    назад
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
                                className={'list flex flex-col mt-4'}
                            >
                                {
                                    categories.map((itemcat, index) => (
                                        <div
                                            key={index}
                                            className={'item cursor-pointer hover:bg-gray-300 rounded-[5px] bg-yellow-300 px-2 w-1/3 ml-4'}
                                            onClick={() => onClickCat(itemcat)}
                                        >{itemcat}</div>
                                    ))
                                }
                            </div>
                        )
                ) :
                (
                    <>
                        <div className={"form"}>
                            <input
                                className={'w-[100%] p-[10px] mt-[15px] border-2'}
                                type="text"
                                placeholder={'Как к вам обращаться'}
                                value={nameSurname}
                                onChange={onChangeNameSurname}
                            />
                            <h3>Введите адрес доставки или укажите "Самовывоз": </h3>
                            <select value={delivery} onChange={onChangeDelivery}
                                    className={'border-2 p-[10px] mt-[15px] cursor-pointer'}>
                                <option value={'physical'} className="p-[10px] mt-[15px]">Самовывоз</option>
                                <option value={'legal'} className="p-[10px] mt-[15px]">Доставка</option>
                            </select>
                            {delivery === "legal" &&
                                <>
                                    <input
                                        className={'w-[100%] p-[10px] mt-[15px] border-2'}
                                        type="text"
                                        placeholder={'Улица'}
                                        value={street}
                                        onChange={onChangeStreet}
                                    />
                                    <input
                                        className={'w-[100%] p-[10px] mt-[15px] border-2'}
                                        type="text"
                                        placeholder={'Дом'}
                                        value={house}
                                        onChange={onChangeHouse}
                                    />
                                    <input
                                        className={'w-[100%] p-[10px] mt-[15px] border-2'}
                                        type="text"
                                        placeholder={'Примечание'}
                                        value={note}
                                        onChange={onChangNote}
                                    />
                                </>
                            }
                        </div>
                        <div
                            className="cursor-pointer hover:bg-gray-200 w-1/3 h-[40px] bg-[#2AABEE] rounded-br-xl rounded-tr-xl content-center text-center "
                            onClick={() => setAdress(true)}
                        >
                            Готово
                        </div>
                    </>
                )
            }
        </>
    )
}

export default ProductListTwo;