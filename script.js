document.addEventListener("DOMContentLoaded", function() {
    const cart = [];
    const cartList = document.querySelector('.cart-list');
    const cartTotal = document.querySelector('.cart-total');
    const cartCounter = document.querySelector('.icon-cart span');

    function updateCart() {
        cartList.innerHTML = '';
        let total = 0;

        cart.forEach((item, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                <div class="cart-item-details">
                    ${item.name} - ₹${item.price} x ${item.quantity}
                    <button class="decrease-quantity" data-index="${index}">-</button>
                    <button class="increase-quantity" data-index="${index}">+</button>
                    <button class="remove-from-cart" data-index="${index}">&times;</button>
                </div>
            `;
            cartList.appendChild(li);
            total += item.price * item.quantity;
        });

        cartTotal.textContent = `₹${total}`;
        cartCounter.textContent = cart.length;
    }

    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            const name = this.getAttribute('data-name');
            const price = parseInt(this.getAttribute('data-price'));
            const image = this.closest('.item').querySelector('img').getAttribute('src');

            const existingItem = cart.find(item => item.name === name);

            if (existingItem) {
                existingItem.quantity++;
            } else {
                cart.push({ name, price, image, quantity: 1 });
            }
            updateCart();
        });
    });

    cartList.addEventListener('click', function(e) {
        const index = e.target.getAttribute('data-index');

        if (e.target.classList.contains('remove-from-cart')) {
            cart.splice(index, 1);
        } else if (e.target.classList.contains('increase-quantity')) {
            cart[index].quantity++;
        } else if (e.target.classList.contains('decrease-quantity')) {
            if (cart[index].quantity > 1) {
                cart[index].quantity--;
            } else {
                cart.splice(index, 1);
            }
        }
        updateCart();
    });

    document.querySelector('.close-cart').addEventListener('click', function() {
        document.querySelector('.cart').classList.toggle('active');
    });

    document.querySelector('.icon-cart').addEventListener('click', function() {
        document.querySelector('.cart').classList.toggle('active');
    });
});


// search box 
document.addEventListener("DOMContentLoaded", function() {
    const products = [
        { name: "Apple iPhone 11", type: "phone" },
        { name: "Apple iPhone 11 Pro", type: "phone" },
        { name: "Apple iPhone 12 Pro Max", type: "phone" },
        { name: "Apple iPhone 15 Pro Max", type: "phone" },
        { name: "Samsung Galaxy S21", type: "phone" },
        { name: "Sony WH-1000XM4", type: "headphones" },
        { name: "HP Laptop", type: "laptop" },
        { name: "ASUS Notebook", type: "laptop" },
        { name: "Apple Laptop", type: "laptop" },
        { name: "Micromax Canvas", type: "phone" },
        { name: "Dell XPS 13", type: "laptop" },
        { name: "Shoes", type: "footwear" },
        { name: "Black Shoes", type: "footwear" },
        { name: "Running Shoes", type: "footwear" },
        { name: "Nike Running Shoes", type: "footwear" },
        { name: "Casual Shoes", type: "footwear" }
    ];

    const searchInput = document.getElementById("search-input");
    const autocompleteList = document.getElementById("autocomplete-list");

    searchInput.addEventListener("input", function() {
        const value = this.value;
        closeAllLists();

        if (!value) return false;

        const matches = products.filter(product => product.name.toLowerCase().includes(value.toLowerCase()));

        if (matches.length === 0) return false;

        for (let i = 0; i < matches.length; i++) {
            const item = document.createElement("div");
            item.innerHTML = `<strong>${matches[i].name}</strong> <small>(${matches[i].type})</small>`;
            item.addEventListener("click", function() {
                searchInput.value = matches[i].name;
                closeAllLists();
            });
            autocompleteList.appendChild(item);
        }
    });

    searchInput.addEventListener("click", function() {
        const value = this.value;
        closeAllLists();

        const matches = products.filter(product => product.name.toLowerCase().includes(value.toLowerCase()));

        if (matches.length === 0) return false;

        for (let i = 0; i < matches.length; i++) {
            const item = document.createElement("div");
            item.innerHTML = `<strong>${matches[i].name}</strong> <small>(${matches[i].type})</small>`;
            item.addEventListener("click", function() {
                searchInput.value = matches[i].name;
                closeAllLists();
            });
            autocompleteList.appendChild(item);
        }
    });

    function closeAllLists() {
        while (autocompleteList.firstChild) {
            autocompleteList.removeChild(autocompleteList.firstChild);
        }
    }

    document.addEventListener("click", function(e) {
        if (e.target !== searchInput && e.target.parentNode !== autocompleteList) {
            closeAllLists();
        }
    });
});
