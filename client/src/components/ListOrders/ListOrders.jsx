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
                params: {user: user.username}
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
            <div>USERNAME : {user?.username}</div>
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