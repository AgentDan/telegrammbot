import React from 'react';
import Button from "../Button/Button";
import {useTelegram} from "../../hooks/useTelegram";
import './Header.css';

const Header = () => {
    const {user, onClose} = useTelegram();

    return (
        <div className={'header'}>
            <div className="cursor-pointer hover:bg-gray-300 w-[100px] text-center ml-6 rounded-[5px] bg-[#30A3E6]">Закрыть<div/>
            {/*<Button>Закрыть</Button>*/}
            <span className="ml-0">
                {user?.username}
            </span>
        </div>
    );
};

export default Header;