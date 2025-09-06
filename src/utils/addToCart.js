function addToCart(title, selectedSize, price, image) {
    const newCartItemObj = {
        id: Date.now(),
        title,
        image,
        price,
        size: selectedSize,
        quantity: 1
    };

    let existingCart = JSON.parse(localStorage.getItem('cart'));
    if (!Array.isArray(existingCart)) existingCart = [];

    const existingItem = existingCart.find(item => item.title === title && item.size === selectedSize);

    if (existingItem) {
        existingItem.quantity += 1;
        existingItem.price += price;
    } else {
        existingCart.push(newCartItemObj);
    }

    localStorage.setItem('cart', JSON.stringify(existingCart));
}

export default addToCart