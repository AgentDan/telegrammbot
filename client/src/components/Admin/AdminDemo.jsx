import React, {useCallback, useEffect, useState} from 'react';
import axios from "axios";

const AdminDemo = () => {
    const timestamp = "2025-02-13T21:07:45.731Z"
    const [date, setDate] = useState(new Date().toISOString().slice(0, 10))
    const [list, setList] = useState([])
    const [selectedOption, setSelectedOption] = useState('');

    const [curier, setCurier] = useState([
        {cur: "Ivan", telephone: "23323523523"},
        {cur: "Stepan", telephone: "23323523523"},
        {cur: "Bob", telephone: "23323523523"}
    ])

    const getData = useCallback(async () => {
        try {
            await axios.get('api/points/all', {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then((response) => setList(response.data))
        } catch (error) {
            console.log(error)
        }
    })

    const onchangeCourier = useCallback(async (id, e) => {
        const name = e.target.value
        console.log("id: ",id)
        console.log("name: ", name)
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
        getData()
    }, [date]);

    console.log(list)

    return (
        <div className="m-1">
            <div className="w-1/3 h-auto bg-[#9abf9c] rounded-xl p-2">
                <div className="font-semibold text-center border-b-2">Заказаы на :
                    <input className=" bg-[#9abf9c]"
                           type="date"
                           value={date}
                           onChange={(e) => setDate(e.target.value)}
                    />
                </div>
                {
                    list.map((item) => {
                        return (
                            <>
                                {
                                    date === item.timestamp.slice(0, 10)
                                    &&
                                    <div className="my-4">
                                        <div className="border-b flex">
                                            {item.nameSurname && <div>{item.nameSurname}</div>}
                                            <div>( {item.owner} )</div>
                                        </div>
                                        <div className="flex">
                                            <div>Доставка : &nbsp;</div>
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
                                            <div className="flex">
                                                <label htmlFor="delivery" className="block font-semibold mb-1">
                                                    &nbsp;Курьер:&nbsp;
                                                </label>
                                                <select
                                                    id="delivery"
                                                    value={item.courier}
                                                    onChange={(e) => onchangeCourier(item._id, e)}
                                                    className="border rounded-md w-full"
                                                >
                                                    <option>{item.courier}</option>

                                                    {
                                                        curier.map((itemCur) => {
                                                            return (
                                                                <>
                                                                    <option
                                                                        // value={itemCur.cur}
                                                                        // onChange={(e) => onchangeCourierTTT(e.target.value)}
                                                                    >
                                                                        {itemCur.cur}
                                                                    </option>
                                                                </>
                                                            )
                                                        })
                                                    }
                                                    {/*<option value="physical">Самовывоз</option>*/}
                                                    {/*<option value="courier">Курьер</option>*/}
                                                    {/*<option value="post">Почта</option>*/}
                                                </select>

                                                {selectedOption && (
                                                    <p className="mt-2">Вы выбрали: <strong>{selectedOption}</strong>
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                        {item.products.map((itemproducts) => {
                                            return (
                                                <div className="flex">
                                                    <div className="">{itemproducts.title}</div>
                                                </div>
                                            )
                                        })
                                        }
                                    </div>
                                }
                            </>
                        )
                    })
                }
            </div>
        </div>
    );
};

export default AdminDemo;