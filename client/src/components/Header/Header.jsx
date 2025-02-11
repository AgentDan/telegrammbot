import React from 'react';
import Button from "../Button/Button";
import {useTelegram} from "../../hooks/useTelegram";
import './Header.css';
import {Link} from "react-router-dom";

const Header = () => {
    const {user, onClose} = useTelegram();

    return (
        <div className={'header border-b-2 border-b-[#2AABEE] gap-1'}>
            <Link to={"/"}>
                <div
                    className="cursor-pointer hover:bg-gray-200 hover:border-b-gray-200 w-[70px] text-center rounded-tl-[5px] rounded-tr-[5px] bg-[#2AABEE] border-2 border-b-[#2AABEE] border-t-[#2AABEE] border-l-[#2AABEE] border-r-[#2AABEE]"
                >
                    Меню
                </div>
            </Link>
            <Link to={"/orders"}>
                <div
                    className="cursor-pointer hover:bg-gray-200 hover:border-b-gray-200 w-[70px] text-center rounded-tl-[5px] rounded-tr-[5px] bg-[#2AABEE] border-2 border-b-[#2AABEE] border-t-[#2AABEE] border-l-[#2AABEE] border-r-[#2AABEE]"
                >
                    Заказы
                </div>
            </Link>
            <div
                className="cursor-pointer hover:bg-gray-200 hover:border-b-gray-200 w-[70px] text-center rounded-tl-[5px] rounded-tr-[5px] bg-[#2AABEE] border-2 border-b-[#2AABEE] border-t-[#2AABEE] border-l-[#2AABEE] border-r-[#2AABEE]"
                onClick={onClose}
            >
                Закрыть
            </div>
            {/*<span className="ml-0">*/}
            {/*    {user?.username}*/}
            {/*</span>*/}
        </div>
    );
};

export default Header;