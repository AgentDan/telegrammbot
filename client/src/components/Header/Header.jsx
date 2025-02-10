import React from 'react';
import Button from "../Button/Button";
import {useTelegram} from "../../hooks/useTelegram";
import './Header.css';
import {Link} from "react-router-dom";

const Header = () => {
    const {user, onClose} = useTelegram();

    return (
        <div className={'header'}>
            <div
                className="cursor-pointer hover:bg-gray-300 w-[100px] text-center m-4 rounded-[5px] bg-[#2AABEE]"
                onClick={onClose}
            >
                Закрыть
            </div>
            <Link to={"/form"}>
                <div
                    className="cursor-pointer hover:bg-gray-300 w-[100px] text-center m-4 rounded-[5px] bg-[#2AABEE]"
                >
                    Форма
                </div>
            </Link>
            <span className="ml-0">
                {user?.username}
            </span>
        </div>
    );
};

export default Header;