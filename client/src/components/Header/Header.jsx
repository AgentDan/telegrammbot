import React from 'react';
import Button from "../Button/Button";
import {useTelegram} from "../../hooks/useTelegram";
import './Header.css';
import {Link} from "react-router-dom";

const Header = () => {
    const {user, onClose} = useTelegram();

    return (
        <div className={'header'}>
            <Link to={"/"}>
                <div
                    className="cursor-pointer hover:bg-gray-300 w-[100px] text-center m-4 rounded-[5px] bg-[#2AABEE]"
                >
                    Меню
                </div>
            </Link>
            <Link to={"/form"}>
                <div
                    className="cursor-pointer hover:bg-gray-300 w-[100px] text-center m-4 rounded-[5px] bg-[#2AABEE]"
                >
                    Форма
                </div>
            </Link>
            <Link to={"/orders"}>
                <div
                    className="cursor-pointer hover:bg-gray-300 w-[100px] text-center m-4 rounded-[5px] bg-[#2AABEE]"
                >
                    Заказы
                </div>
            </Link>
            <div
                className="cursor-pointer hover:bg-gray-300 w-[100px] text-center m-4 rounded-[5px] bg-[#2AABEE]"
                onClick={onClose}
            >
                Закрыть
            </div>
            <span className="ml-0">
                {user?.username}
            </span>
        </div>
    );
};

export default Header;