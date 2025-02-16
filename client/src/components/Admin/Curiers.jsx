import React, {useCallback, useEffect, useState} from 'react';
import axios from "axios";

const Couriers = () => {

    const [couriers, setCouriers] = useState([])
    const [cur, setCur] = useState("")
    const [nic, setNic] = useState("")
    const [telephone, setTelephone] = useState("")

    const getCouriers = async ()=>{
        try {
            await axios.get('api/couriers/all', {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then((response)=> setCouriers(response.data))
        }catch (error){
            console.log(error)
        }
    }

    const onChangeCur = (e)=>{setCur(e.target.value)}
    const onChangeNic = (e)=>{setNic(e.target.value)}
    const onChangeTelephone = (e)=>{setTelephone(e.target.value)}

    const onClickNewCourier = useCallback(async ()=> {
        if (!cur.trim() || !nic.trim() || !telephone.trim()) {
            alert("Все поля должны быть заполнены!");
            return;
        }
        try {
            await axios.post('/api/couriers/add',{cur, nic, telephone}, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(()=>{
                    setCur("")
                    setNic("")
                    setTelephone("")
                    getCouriers()
                })
        }catch (error){
            console.log(error)
        }
    })

    const onClickDeleteCourier = useCallback(async (id)=>{
        try {
            await axios.delete(`/api/couriers/delete/${id}`, {id}, {
                headers: {'Content-Type': 'application/json'}
            })
                .then(()=>getCouriers())
        }catch (error){
            console.log(error)
        }
    })

    useEffect(() => {
        getCouriers()
    }, [])

    return (
        <div className="min-h-0 max-h-fit min-w-[400px] max-w-[400px] bg-[#9abf9c] rounded-xl p-2">
            <div className="font-semibold text-center border-b-2">Курьеры</div>
            <div className="flex flex-col">
                <div className="font-semibold">Hoвый курьер: </div>
                <div className="ml-4">
                    <input
                        className="w-2/3 rounded mt-1"
                        type="text"
                        placeholder="Имя"
                        value={cur}
                        onChange={onChangeCur}
                    />
                    <input
                        className="w-2/3 rounded mt-1"
                        type="text"
                        placeholder="Ник в телеграме"
                        value={nic}
                        onChange={onChangeNic}
                    />
                    <input
                        className="w-2/3 rounded mt-1"
                        type="text"
                        placeholder="Телефон"
                        value={telephone}
                        onChange={onChangeTelephone}
                    />
                    <button
                        className="border-2 mt-2 bg-green-300 hover:bg-green-600 rounded-xl px-4"
                        onClick={onClickNewCourier}
                    >
                        Записать нового курьера
                    </button>
                </div>
            </div>
            <div>
                <div className="pb-2 mb mt-6 font-semibold border-b">Все курьеры:</div>
                {
                    couriers.map((item) => {
                        return (
                            <div className="flex gap-1 border-b" key={item._id}>
                                <div className="content-center">
                                    {item.cur}
                                </div>
                                <div className="content-center font-extralight text-sm">
                                    ( tel.: {item.telephone}
                                </div>
                                <div className="content-center font-extralight text-sm">
                                    nic : {item.nic} )
                                </div>
                                <div
                                    className='content-center text-sm bg-red-400 rounded-3xl font-extralight px-2 hover:bg-red-600 cursor-pointer ml-auto my-2'
                                    onClick={()=>onClickDeleteCourier(item._id)}
                                >
                                    удалить
                                </div>
                            </div>
                        )
                    })
                }

            </div>


        </div>
    );
};

export default Couriers;