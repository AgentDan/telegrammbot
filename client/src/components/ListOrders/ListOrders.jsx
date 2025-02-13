import axios from "axios";
import {useCallback, useEffect, useState} from "react";
import {useTelegram} from "../../hooks/useTelegram";

const ListOrders = () => {

    const {user} = useTelegram()
    // const user = "danilravil"
    const [list, setList] = useState([])
    const us = user?.username
    console.log(us)

    const getPoints = useCallback(async () => {
        try {
            // await axios.get('https://localhost:5000/api/points', {
            await axios.get('/api/points', {
                headers: {
                    'Content-Type': 'application/json'
                },
                params: {us}
            })
                .then((response) => setList(response.data))
            // .then((response)=> console.log(response.data))
        } catch (error) {
            console.log(error)
        }
    }, [user])

    useEffect(() => {
        getPoints()
    }, [getPoints]);

    return (
        <>
            {us && <h1>us: {us}</h1>}
            {user && <h1>user: {user}</h1>}
            {user.username && <h1>user?.username: {user?.username}</h1>}
            {user.username && <h1>user.username: {user.username}</h1>}
            {
                list.map((item) => {
                        return (
                            <>
                                <div className="flex">
                                    {
                                        item.products.map((a) => {
                                            return (
                                                <>
                                                    <div className="mx-2">{a.title}</div>
                                                    <div className="mx-2">{a.price}</div>
                                                </>
                                            )
                                        })
                                    }
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