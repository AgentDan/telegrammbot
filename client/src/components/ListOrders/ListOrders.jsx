import axios from "axios";
import {useCallback, useEffect, useState} from "react";
import {useTelegram} from "../../hooks/useTelegram";

const ListOrders = () => {

    const {user} = useTelegram()
    const [list, setList] = useState([])

    const getPoints = useCallback(async () => {
        try {
            await axios.get('/api/points', {
                headers: {
                    'Content-Type': 'application/json'
                },
                // params: {user: user.username}
                params: {user: "danilravil"}
            })
                .then((response) => setList(response.data))
        } catch (error) {
            console.log(error)
        }
    }, [user])

    useEffect(() => {
        getPoints()
    }, [getPoints]);

    return (
        <>
            {
                list.map((item) => {
                        return (
                            <>
                                <div>
                                    <div
                                        className="font-semibold">{new Date(item.timestamp).toLocaleString().slice(0, 10)}
                                    </div>
                                    <div>
                                        {
                                            item.products.map((a) => {
                                                return (
                                                    <>
                                                        <div className='flex mx-2'>
                                                            <div className="mr-4 ">{a.title}</div>
                                                            <div className="mx-2 ">Цена: {a.price} din</div>
                                                        </div>
                                                    </>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            </>
                        )
                    }
                )
            }
        </>
    );
};

export default ListOrders;