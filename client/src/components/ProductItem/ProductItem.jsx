import React from 'react';
import Button from "../Button/Button";
import './ProductItem.css';

const ProductItem = ({product, className, onAdd}) => {

    const onAddHandler = () => {
        onAdd(product);
    }

    return (
        <>
            <div className={'product rounded-2xl' + className}>
                <img
                    src={"./img/"+product.img}
                    alt={product.title}
                    className="w-auto h-[150px] object-contain"
                />
                <div className={'title'}>{product.title}</div>
                <div className={'description'}>{product.description}</div>
                <div className={'cat'}>{product.own}</div>
                <div className={'price'}>
                    <span>Стоимость: <b>{product.price}</b></span>
                </div>
                <Button className={'add-btn rounded-[5px]'} onClick={onAddHandler}>
                    Добавить в корзину
                </Button>
            </div>
        </>
    );
};

export default ProductItem;