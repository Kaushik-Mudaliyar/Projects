document.addEventListener("DOMContentLoaded", () => {
  const productList = document.getElementById("products");
  const cartItems = document.getElementById("cart-items");
  const emptyCartMessage = document.getElementById("empty-cart");
  const cartTotalMessage = document.getElementById("cart-total");
  const totalPriceDisplay = document.getElementById("total-price");
  const checkOutBtn = document.getElementById("checkout-btn");

  const products = [
    { id: 1, name: "Product 1", price: 30.99 },
    { id: 2, name: "Product 2", price: 20.99 },
    { id: 3, name: "Product 3", price: 150.99 },
  ];

  // we are applying or operation,first it will check the local if there is already some items added in the cart so it will render it first and display in the website itself
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  renderCart();
  // It is to display the products in the website
  products.forEach((product) => {
    const productDiv = document.createElement("div");
    productDiv.innerHTML = `
                <span>${product.name} - ${product.price.toFixed(2)}</span>
                <button data-id=${
                  product.id
                } class="add-to-cart-btn">Add to Cart</button>
                `;
    productList.appendChild(productDiv);
  });

  productList.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
      // we are targetting the clicked product using data-id which we are giving to each and every product
      const productid = parseInt(e.target.getAttribute("data-id"));
      //   console.log(productid);
      // Now using find we are finding that particular product and can access all the property as well.
      const product = products.find((p) => p.id === productid);
      //   console.log(product);

      // it is a function used to add the product to cart
      addToCart(product);
    }
  });

  function addToCart(product) {
    // we are pushing the product in the cart array
    cart.push(product);
    // console.log(cart);
    saveToLocal();
    // we are calling this method to render all the items on the shopping cart
    renderCart();
  }
  function renderCart() {
    // we are clearing out all the html written inside the cartItems
    cartItems.innerHTML = "";
    // It is for calculating the totalPrice and after calculating we are passing it to the totalpriceDisplay to display it on the website.
    let totalPrice = 0;

    // When the cart is greater than 0 it means the cart need to have 1 product such that the if block will be executed.
    if (cart.length > 0) {
      // so we need to add the hidden class to the empty-cart such that it will not visible.
      // we need to remove the hidden class from the cartItems and cartTotalMessage when the cart have product inside it.

      // Here we are just making the cartItems and cartTotal message visible.
      emptyCartMessage.classList.add("hidden");
      cartItems.classList.remove("hidden");
      cartTotalMessage.classList.remove("hidden");

      // we are using the forEach loop to calculate the total price and to display each item on the website as well
      cart.forEach((item, index) => {
        totalPrice += item.price;

        const cartItem = document.createElement("div");
        cartItem.innerHTML = `
          <span>${item.name} - $${item.price.toFixed(2)}</span>
          <button data-id = ${item.id} class="remove-btn">Remove</button>
        `;

        // after that we need to append it to the cartItems
        cartItems.appendChild(cartItem);
        // and also we need to add the text content to the totalPriceDisplay to display the total price
        totalPriceDisplay.textContent = `${totalPrice.toFixed(2)}`;
        saveToLocal();
      });
    } else {
      // when there is no product added to the cart then the emptycartmessage will need to be visible so we are removing hidden and also we are manually changing the totalPriceDisplay as well
      emptyCartMessage.classList.remove("hidden");
      totalPriceDisplay.textContent = `$0.00`;
      saveToLocal();
    }

    cartItems.addEventListener("click", (e) => {
      if (e.target.tagName === "BUTTON") {
        // it will stop the propogation of the click event immediately
        e.stopImmediatePropagation();
        // console.log(e.target);

        const productid = parseInt(e.target.getAttribute("data-id"));
        // console.log(productid);

        for (i = 0; i < cart.length; i++) {
          // here i am checking whether the productid is equal to the carts particular data id or not
          if (productid === cart[i].id) {
            cart.splice(i, 1);
            renderCart();
            saveToLocal();
            // console.log(cart);
          }
        }
      }
    });
  }

  function saveToLocal() {
    // it was for setting up the cart
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  checkOutBtn.addEventListener("click", () => {
    cart.length = 0;
    alert("Checkout Successfully");
    renderCart();
  });
});
