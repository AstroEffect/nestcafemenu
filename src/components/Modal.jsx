import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from "swiper/modules";
import Chip from './Chip';
import addToCart from '../utils/addToCart';
import { ToastContainer, Bounce, toast } from 'react-toastify';

import { MdOutlineClose } from "react-icons/md";
import { CiCoffeeCup } from "react-icons/ci";
import { TbCup } from "react-icons/tb";
import { BsCupHot } from "react-icons/bs";

import '../assets/styles/Modal.css'
import "swiper/css";
import "swiper/css/pagination";

export default function Modal({ onClose, title, sizes, price, description, image, tags }) {

    const [selectedSize, setSelectedSize] = useState(sizes?.[0].name || null);
    const [selectedPrice, setSelectedPrice] = useState(sizes?.[0].price || price || null)

    useEffect(() => {
        document.body.style.overflow = 'hidden'
        return () => {
            document.body.style.overflow = 'unset'
        }
    }, [])

    return (
        <div className='modal'>
            <div className='modal__content'>
                <button className='modal__close__btn' onClick={onClose}><MdOutlineClose /></button>
                <div className='modal__img'>
                    <img src={image} alt="img" />
                </div>
                <div className='modal__info'>
                    <p className='modal__info__name'>{title}</p>
                    <p className='modal__info__desc'>{description}</p>
                    <div className='modal__info__tags'>
                        {tags?.map((tag, index) => <Chip name={tag} key={index} />)}
                    </div>
                    <Swiper
                        slidesPerView={'auto'}
                        loop={true}
                        centeredSlides
                        pagination={{ clickable: true }}
                        modules={[Pagination]}
                        className="sizeSwiper"
                        onSlideChangeTransitionEnd={(swiper) => {
                            const currentSlide = swiper.realIndex;
                            setSelectedSize(sizes[currentSlide].name)
                            setSelectedPrice(sizes[currentSlide].price)
                        }}
                    >
                        {sizes?.length > 0 ? (
                            sizes.map(size => (
                                <SwiperSlide>
                                    <div className='modal__info__sizing'>
                                        {size.name === 'بزرگ' ? <CiCoffeeCup className='modal__icon' /> : size.name === 'متوسط' ? <TbCup className='modal__icon' /> : <BsCupHot className='modal__icon' />}
                                        <span className='modal__info__price'>{size.name}</span>
                                        <span className='modal__info__price'><sup>تومان</sup>{size.price.toLocaleString('fa-IR')}</span>
                                        <small>جهت انتخاب سایز به سمت راست بکشید</small>
                                    </div>
                                </SwiperSlide>
                            ))
                        ) : (
                            <span style={{ fontSize: 20, textAlign: 'center' }}><sup>تومان</sup>{price.toLocaleString('fa-IR')}</span>
                        )}
                    </Swiper>
                    <button
                        className='card__btn'
                        onClick={() => {
                            addToCart(title, selectedSize, selectedPrice, image)
                            toast.success(`${title} ${selectedSize ? selectedSize : ''} به سبد خرید اضافه شد`)
                        }}
                    >افزودن  به سبد خرید</button>
                </div>
            </div>
            <ToastContainer
                position="top-right"
                autoClose={1500}
                newestOnTop={true}
                rtl
                theme="colored"
                transition={Bounce}
            />
        </div>
    )
}
