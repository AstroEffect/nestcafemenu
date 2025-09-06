import React, { useState } from 'react'
import Modal from './Modal'

import '../assets/styles/Card.css'

export default function Card({ title, sizes, price, description, image, tags }) {

    const [isModalOpen, setIsModalOpen] = useState(false)

    const openModalHandler = () => setIsModalOpen(true)
    const closeModalHandler = () => setIsModalOpen(false)

    return (
        <>
            <div className='card'>
                <div className='card__img'>
                    <img src={image} alt="img" />
                </div>
                <div className='card__info'>
                    <div className="card__info__title">
                        <p className='card__info__name'>{title}</p>
                        <p className='card__info__desc'>{description}</p>
                    </div>
                    {sizes?.length > 0 ? (
                        sizes.map(size => (
                            <div className='card__info__sizing__price' key={size.name}>
                                <span className='card__info__price'>{size.price.toLocaleString('fa-IR')}</span>
                                <span className='card__info__price'>{size.name}</span>
                            </div>
                        ))
                    ) : (
                        <span style={{ fontSize: 20, textAlign: 'center' }}>{price.toLocaleString('fa-IR')}T</span>
                    )}
                </div>
                <button className='card__btn' onClick={openModalHandler}>افزودن  به سبد خرید</button>
            </div>
            {isModalOpen && <Modal
                {...{ title, sizes, price, description, image, tags }}
                onClose={closeModalHandler}
            />}
        </>
    )
}
