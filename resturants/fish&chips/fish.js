let cart = [];
let totalPrice = 0;

document.addEventListener('DOMContentLoaded', () => {
  const addToCartButtons = document.querySelectorAll('.add-to-cart');
  const cartIcon = document.getElementById('cart');
  const cartModal = document.getElementById('cart-modal');
  const cartItemsList = document.getElementById('cart-items');
  const totalPriceElement = document.getElementById('total-price');
  const orderButton = document.getElementById('order-button');
  const viewOrdersButton = document.getElementById('view-orders');
  const customerNameInput = document.getElementById('customer-name');
  const customerLocationInput = document.getElementById('customer-location');

  addToCartButtons.forEach(button => {
    button.addEventListener('click', (event) => {
      event.preventDefault();
      const priceElement = button.previousElementSibling;
      const price = parseInt(priceElement.textContent, 10);
      const imageElement = button.closest('.box').querySelector('img');
      const nameElement = button.closest('.box').querySelector('h3');
      const name = nameElement ? nameElement.textContent : 'Unknown Item';
      
      if (isNaN(price)) {
        console.error('Invalid price');
        return;
      }

      if (imageElement) {
        const imageSrc = imageElement.src;
        console.log(`Adding item to cart: ${name}, ${imageSrc}, Price: R${price}`);
        addItemToCart(name, imageSrc, price);
        indicateItemAdded();
      } else {
        console.error('Image element not found');
      }
    });
  });

  cartIcon.addEventListener('click', (event) => {
    event.preventDefault();
    document.getElementById('cart-section').scrollIntoView({ behavior: 'smooth' });
  });

  orderButton.addEventListener('click', () => {
    handleOrder();
  });

  viewOrdersButton.addEventListener('click', () => {
    window.location.href = 'order.html';
  });

  function addItemToCart(name, image, price) {
    const itemId = Date.now(); // Unique ID for each item
    cart.push({ id: itemId, name, image, price });
    totalPrice += price;
    updateCartIcon();
    displayCart();
  }

  function removeItemFromCart(itemId) {
    const itemIndex = cart.findIndex(item => item.id === itemId);
    if (itemIndex !== -1) {
      totalPrice -= cart[itemIndex].price;
      cart.splice(itemIndex, 1);
      updateCartIcon();
      displayCart();
    }
  }

  function updateCartIcon() {
    cartIcon.setAttribute('data-total', totalPrice);
    console.log(`Total price updated to: R${totalPrice}`);
  }

  function displayCart() {
    cartItemsList.innerHTML = '';
    cart.forEach(item => {
      const li = document.createElement('li');
      li.innerHTML = `
        <img src="${item.image}" alt="Item Image" width="50"> - ${item.name} - R${item.price}
        <button class="remove-item" data-id="${item.id}">Remove</button>
      `;
      cartItemsList.appendChild(li);
    });
    totalPriceElement.textContent = `R${totalPrice}`;

    // Add event listeners to remove buttons
    const removeButtons = document.querySelectorAll('.remove-item');
    removeButtons.forEach(button => {
      button.addEventListener('click', (event) => {
        const itemId = parseInt(event.target.getAttribute('data-id'), 10);
        removeItemFromCart(itemId);
      });
    });
  }

  function indicateItemAdded() {
    cartIcon.classList.add('item-added');
    setTimeout(() => {
      cartIcon.classList.remove('item-added');
    }, 1000); // Remove the class after 1 second
  }

  function handleOrder() {
    const customerName = customerNameInput.value.trim();
    const customerLocation = customerLocationInput.value.trim();
  
    if (cart.length === 0) {
      alert('Your cart is empty!');
      return;
    }
  
    if (!customerName || !customerLocation) {
      alert('Please enter your name and location.');
      return;
    }
  
    let orderData = JSON.parse(localStorage.getItem('orderData')) || [];
    if (!Array.isArray(orderData)) {
      orderData = [];
    }
  
    const newOrder = {
      id: Date.now(),
      items: cart,
      total: totalPrice,
      time: new Date().toLocaleString(),
      customerName,
      customerLocation
    };
  
    orderData.push(newOrder);
    localStorage.setItem('orderData', JSON.stringify(orderData));
  
    cart = [];
    totalPrice = 0;
    updateCartIcon();
    displayCart();
    alert('Order placed successfully!');
  }
  
});

document.getElementById("back-restu").onclick = function() {
    window.location.href = "http://127.0.0.1:5500/resturants/restu.html"; 
};
