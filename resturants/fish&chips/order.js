document.addEventListener('DOMContentLoaded', () => {
  // Code to handle login modal
  const viewOrdersBtn = document.getElementById('view-orders');
  const loginModal = document.getElementById('login-modal');
  const closeLoginBtn = document.getElementById('close-login');
  const loginForm = document.getElementById('login-form');

  // Show login modal
  viewOrdersBtn.addEventListener('click', () => {
      loginModal.style.display = 'block';
  });

  // Close login modal
  closeLoginBtn.addEventListener('click', () => {
      loginModal.style.display = 'none';
  });

  // Handle form submission
  loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const email = document.getElementById('email').value;
      const pin = document.getElementById('pin').value;
      const password = document.getElementById('password').value;

      // Perform validation (this is just a basic example)
      if (email === 'user@example.com' && pin === '1234' && password === 'password') {
          alert('Login successful!');
          loginModal.style.display = 'none';
          loadOrders(); // Load orders after successful login
      } else {
          alert('Invalid credentials. Please try again.');
      }
  });

  // Close modal when clicking outside of it
  window.addEventListener('click', (event) => {
      if (event.target === loginModal) {
          loginModal.style.display = 'none';
      }
  });

  // Back button functionality
  document.getElementById("back-restu").onclick = function() {
      window.location.href = "https://sunalgorithms.github.io/resturants/fish&chips/fish.html"; 
  };

  // Function to load orders
  function loadOrders() {
      const orderBody = document.getElementById('order-body');
      const orderData = JSON.parse(localStorage.getItem('orderData')) || [];

      if (orderData.length > 0) {
          orderData.forEach((order, index) => {
              const row = document.createElement('tr');
              row.innerHTML = `
                  <td>${index + 1}</td>
                  <td>${order.customerName}</td>
                  <td>${order.customerLocation}</td>
                  <td>${order.time}</td>
                  <td>R${order.total}</td>
                  <td>
                      <ul>
                          ${order.items.map(item => `<li>${item.name} - R${item.price}</li>`).join('')}
                      </ul>
                  </td>
                  <td><button class="done-button" data-id="${order.id}">Done</button></td>
              `;
              orderBody.appendChild(row);
          });

          // Add event listeners to "Done" buttons
          const doneButtons = document.querySelectorAll('.done-button');
          doneButtons.forEach(button => {
              button.addEventListener('click', (event) => {
                  const orderId = parseInt(event.target.getAttribute('data-id'), 10);
                  removeOrder(orderId);
              });
          });
      } else {
          const row = document.createElement('tr');
          row.innerHTML = `<td colspan="7">No orders found</td>`;
          orderBody.appendChild(row);
      }
  }

  function removeOrder(orderId) {
      const orderData = JSON.parse(localStorage.getItem('orderData')) || [];
      const updatedOrderData = orderData.filter(order => order.id !== orderId);
      localStorage.setItem('orderData', JSON.stringify(updatedOrderData));
      location.reload(); // Reload the page to update the order list
  }
});
