import axios from "axios";
import {useCallback, useEffect, useState} from "react";
import {useTelegram} from "../../hooks/useTelegram";


const ListOrders = () => {

    // const {user} = useTelegram()
    const user = "danilravil"
    const [list, setList] = useState([])

    // const demolist = [
    //     {id: 1, name: "asdffasdf", surname: "asdfsdfdsfsdf"},
    //     {id: 1, name: "asdffasdf", surname: "asdfsdfdsfsdf"},
    //     {id: 1, name: "asdffasdf", surname: "asdfsdfdsfsdf"},
    //     {id: 1, name: "asdffasdf", surname: "asdfsdfdsfsdf"},
    //     {id: 1, name: "asdffasdf", surname: "asdfsdfdsfsdf"},
    //     {id: 1, name: "asdffasdf", surname: "asdfsdfdsfsdf"},
    // ]

    const getPoints = useCallback(async () => {
        try {
            await axios.get('https://web3ddd.com/api/points', {
                headers: {
                    'Content-Type': 'application/json'
                },
                params: {user}
            })
                .then((response)=> console.log(response.data))
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
                list.map((item, index)=>{
                        return(
                            <>
                                <div className="flex">
                                    <div className="mx-2">{item.id}</div>
                                    <div className="mx-2">{item.name}</div>
                                    <div className="mx-2">{item.surname}</div>
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