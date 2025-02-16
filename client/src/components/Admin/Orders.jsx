import React, {useCallback, useEffect, useState} from 'react';
import axios from "axios";

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

    const kitchenData = () => {
        const a = list
            .filter(item => date === item.timestamp.slice(0,10))
            .flatMap(item => item.products)
        setKitchen(a)
    }

    useEffect(() => {
        kitchenData()
    }, [list]);

    console.log(kitchen)

    useEffect(() => {
        getData()
        getCouriers()
    }, [date, getCouriers]);

    return (
        <div className="m-2 w-[400px] h-auto bg-[#9abf9c] rounded-xl p-2">
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
                                <div key={itemproducts.id} className="flex">
                                    <div className="">{itemproducts.title}</div>
                                </div>
                            )
                        })
                        }
                    </div>
                )
            }

            <div className="font-semibold text-center border-b-2">
                Кухня
            </div>
            {
                list.map((item) => date === item.timestamp.slice(0, 10)
                    &&
                    <div key={item._id}>
                        {/*{console.log(item.products)}*/}
                    </div>
                )
            }
        </div>
    );
};

export default Orders;