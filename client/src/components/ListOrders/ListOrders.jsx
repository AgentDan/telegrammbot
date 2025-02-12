import axios from "axios";
import {useCallback} from "react";
import {useTelegram} from "../../hooks/useTelegram";


const ListOrders = () => {

    const {user} = useTelegram()

    const demolist = [
        {id: 1, name: "asdffasdf", surname: "asdfsdfdsfsdf"},
        {id: 1, name: "asdffasdf", surname: "asdfsdfdsfsdf"},
        {id: 1, name: "asdffasdf", surname: "asdfsdfdsfsdf"},
        {id: 1, name: "asdffasdf", surname: "asdfsdfdsfsdf"},
        {id: 1, name: "asdffasdf", surname: "asdfsdfdsfsdf"},
        {id: 1, name: "asdffasdf", surname: "asdfsdfdsfsdf"},
    ]

    const getPoints = useCallback(async () => {
        try {
            await axios.get('/api/points', {
                headers: {
                    'Content-Type': 'application/json'
                },
                params: {user: user.username}
            })
        } catch (error) {
            console.log(error)
        }
    }, [user.username])

    return (
        <>
            {
                demolist.map((item, index)=>{
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