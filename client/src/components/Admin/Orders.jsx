import React, {useCallback, useEffect, useState} from 'react';
import axios from "axios";
import {v4} from "uuid";

const Orders = () => {
    const timestamp = "2025-02-13T21:07:45.731Z"
    const [date, setDate] = useState(new Date().toISOString().slice(0, 10))
    const [list, setList] = useState([])
    const [selectedOption, setSelectedOption] = useState('');
    const [kitchen, setKitchen] = useState([])

    const [curier, setCurier] = useState([])

    const getCouriers = useCallback(async () => {
        try {
            await axios.get('/api/couriers/all', {
                headers: {'Content-Type': 'application/json'}
            })
                .then((response) => setCurier(response.data))
        } catch (error) {
            console.log(error)
        }
    }, [])

    const getData = useCallback(async () => {
        try {
            await axios.get('api/points/all', {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then((response) => {
                        setList(response.data)
                    }
                )
        } catch (error) {
            console.log(error)
        }
    })

    const onchangeCourier = useCallback(async (id, e) => {
        const name = e.target.value
        try {
            await axios.put(`/api/points/courier/${id}`, {id, name}, {
                headers: {'Content-Type': 'application/json'}
            })
                .then(response => getData())
        } catch (error) {
            console.log(error)
        }
    })

    useEffect(() => {
        const a = list
            .filter(item => date === item.timestamp.slice(0, 10))
            .flatMap(item => item.products)
            .reduce((acc, product) => {
                const existingProduct = acc.find(p => p.title === product.title);
                if (existingProduct) {
                    existingProduct.count += 1; // Увеличиваем количество, если товар уже есть
                } else {
                    acc.push({...product, count: 1}); // Добавляем новый товар
                }
                return acc;
            }, []);
        setKitchen(a)
    }, [list]);

    useEffect(() => {
        getData()
        getCouriers()
    }, [date, getCouriers]);

    return (
        <div className=" min-w-[400px] max-w-[400px] h-auto bg-[#9abf9c] rounded-xl p-2">
            <div className="font-semibold text-center border-b-2">Заказаы на :
                <input className=" bg-[#9abf9c]"
                       type="date"
                       value={date}
                       onChange={(e) => setDate(e.target.value)}
                />
            </div>
            {
                list.map((item) =>
                    date === item.timestamp.slice(0, 10)
                    &&
                    <div key={item._id} className="my-4">
                        <div className="border-b flex font-semibold">
                            {item.nameSurname && <div>{item.nameSurname}</div>}
                            <div>( {item.owner} )</div>
                        </div>
                        <div className="flex">
                            <div className="font-semibold">Доставка : &nbsp;</div>
                            <div>
                                {
                                    item.del === "physical" ? (
                                        <div>
                                            Самовывоз
                                        </div>
                                    ) : (
                                        <div>
                                            {item.street}
                                            {item.house}
                                        </div>
                                    )
                                }
                            </div>
                            {item.del === "legal" &&
                                <div className="flex">
                                    <label htmlFor="delivery" className="block font-semibold">
                                        &nbsp;Курьер:&nbsp;
                                    </label>
                                    <select
                                        value={item.courier}
                                        onChange={(e) => onchangeCourier(item._id, e)}
                                        className="border rounded-md bg-[#9abf9c]"
                                    >
                                        <option>{item.courier}</option>
                                        {
                                            curier.map((itemCur, index) => {
                                                return (
                                                    <option key={itemCur.cur}>
                                                        {itemCur.cur}
                                                    </option>
                                                )
                                            })
                                        }
                                    </select>

                                    {selectedOption && (
                                        <p className="mt-2">
                                            Вы выбрали:
                                            <strong>{selectedOption}</strong>
                                        </p>
                                    )}
                                </div>
                            }
                        </div>

                        {item.products.map((itemproducts) => {
                                return (
                                    <div key={itemproducts.title} className="flex">
                                        <div className="">{itemproducts.title}</div>
                                    </div>
                                )
                            }
                        )}
                    </div>
                )
            }
            <div className="font-semibold text-center border-b-2">
                Кухня
            </div>
            <div className="grid grid-cols-3 gap-2 mt-2 text-sm font-medium border-b">
                <div>Блюдо</div>
                <div className="text-center">Количество</div>
                <div className="text-center">Вес</div>
            </div>
            {
                kitchen.map((item) =>
                    <div key={item.title} className="grid grid-cols-3 gap-2 border-b py-1">
                        <div>
                            {item.title}
                        </div>
                        <div className="text-center">
                            {item.count}шт. x {item.weight}гр.
                        </div>
                        <div className="text-center">
                            Всего: {item.count * item.weight}гр.
                        </div>
                    </div>
                )
            }
        </div>
    );
};

export default Orders;