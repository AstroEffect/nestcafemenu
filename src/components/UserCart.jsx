import React, { useEffect, useState } from 'react'
import { ToastContainer, Bounce, toast } from 'react-toastify';

import { MdOutlineClose } from "react-icons/md";

import '../assets/styles/userCart.css'

export default function UserCart({ onClose }) {

    const [userOrders, setUserOrders] = useState(null)

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        setUserOrders(cart.map(item => ({
            ...item,
            quantity: item.quantity || 1,
            totalPrice: item.price * (item.quantity || 1)
        })));
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);

    const increment = (index) => {
        const updatedOrders = [...userOrders];
        const unitPrice = updatedOrders[index].price / updatedOrders[index].quantity; // قیمت واحد فعلی
        updatedOrders[index].quantity += 1;
        updatedOrders[index].price = unitPrice * updatedOrders[index].quantity; // آپدیت قیمت
        setUserOrders(updatedOrders);
        localStorage.setItem('cart', JSON.stringify(updatedOrders));
    }

    const decrement = (index) => {
        const updatedOrders = [...userOrders];
        const unitPrice = updatedOrders[index].price / updatedOrders[index].quantity;

        if (updatedOrders[index].quantity > 1) { // حداقل 1
            updatedOrders[index].quantity -= 1;
            updatedOrders[index].price = unitPrice * updatedOrders[index].quantity;
            setUserOrders(updatedOrders);
            localStorage.setItem('cart', JSON.stringify(updatedOrders));
        }
        else {
            updatedOrders.splice(index, 1); // حذف آیتم از آرایه
            setUserOrders(updatedOrders);
            toast.success('محصول از سبد خرید حذف شد')
            if (updatedOrders.length === 0) {
                localStorage.removeItem('cart');
            } else {
                localStorage.setItem('cart', JSON.stringify(updatedOrders));
            }
        }
    }

    const getTotalPrice = () => {
        return (userOrders || []).reduce((sum, item) => sum + item.price, 0).toLocaleString('fa-IR');
    }

    return (
        <div className='drawer__wrapper'>
            <div className='drawer'>
                <div className='drawer__header'>
                    <button className='drawer__close__btn' onClick={onClose}><MdOutlineClose /></button>
                    <p>سفارش ها</p>
                </div>
                <div className='drawer__content'>
                    {userOrders && userOrders.length > 0 ? userOrders.map((userOrder, index) => (
                        <div key={index} className='drawer__content__card'>
                            <img src={userOrders[index].image} alt={userOrder.title} />
                            <div className='drawer__content__card__info'>
                                <p style={{ fontSize: '1.1rem' }}>{userOrder.title} {userOrder.size}</p>
                                <div className='drawer__content__footer'>
                                    <div className='drawer__content__card__info__btn__group'>
                                        <button
                                            className='drawer__content__card__info__btn'
                                            onClick={() => increment(index)}
                                        > + </button>
                                        <button
                                            className='drawer__content__card__info__btn'
                                            disabled
                                        > {userOrder.quantity || 0} </button>
                                        <button
                                            className='drawer__content__card__info__btn'
                                            onClick={() => decrement(index)}
                                        > - </button>
                                    </div>
                                    <p style={{ fontSize: '1.1rem' }}>{userOrder.price.toLocaleString('fa-IR')}</p>
                                </div>
                            </div>
                        </div>
                    )) : <p className='empty__cart'>سفارشی وجود ندارد</p>}
                </div>
                <div className='drawer__footer'>
                    <p><sup>تومان</sup>{getTotalPrice()}</p>
                    <p>:مبلغ کل</p>
                </div>
            </div>
            <ToastContainer
                position="top-right"
                autoClose={1500}
                theme="colored"
                rtl
                stacked
                transition={Bounce}
            />
        </div>
    )
}
