import React, { useState } from 'react'
import Modal from './Modal'

import '../assets/styles/DailyHighlight.css'

export default function DailyHighlight({ item }) {

    const [isModalOpen, setIsModalOpen] = useState(false)

    const openModalHandler = () => setIsModalOpen(true)
    const closeModalHandler = () => setIsModalOpen(false)

    return (
        <>
            <section className='highlight__section'>
                <div className='highlight__card__img'>
                    <img src={item.image} alt="img" />
                </div>
                <div className='highlight__card__info'>
                    <p className='highlight__card__name'>{item.title}</p>
                    <p className='highlight__card__desc'>{item.description}</p>
                    <span className='highlight__card__price'>{item.price?.toLocaleString('fa-IR') || item.sizes[0].price?.toLocaleString('fa-IR')}T</span>
                    <button className='highlight__card__btn' onClick={openModalHandler}>افزودن به سبد خرید</button>
                </div>
            </section>
            {isModalOpen && <Modal
                onClose={closeModalHandler}
                {...item}
            />}
        </>
    )
}
