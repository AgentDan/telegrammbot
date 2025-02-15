import React, {useCallback, useEffect, useState} from 'react';
import axios from "axios";

const Admin = () => {
    const timestamp = "2025-02-13T21:07:45.731Z"
    const [date, setDate] = useState(new Date().toISOString().slice(0, 10))
    const [list, setList] = useState([])

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

    useEffect(() => {
        getData()
    }, [date]);

    console.log(list)

    return (
        <div className="m-1">
            <div className="w-1/3 h-auto bg-[#9abf9c] rounded-xl p-2">
                <div className="font-semibold text-center border-b-2">Заказаы на :
                    <input className=" bg-[#9abf9c]" type="date" value={date}
                           onChange={(e) => setDate(e.target.value)}/>
                </div>
                {
                    list.map((item) => {
                        return (
                            <>
                                {
                                    date === item.timestamp.slice(0, 10)
                                    &&
                                    <div className="my-4">
                                        <div className="border-b">{item.owner}</div>
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

export default Admin;