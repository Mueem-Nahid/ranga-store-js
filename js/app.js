const loadProducts = () => {
    const url = `https://fakestoreapi.com/products`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => showProducts(data));
  };
  loadProducts();
  
  // show all product in UI 
  const showProducts = (products) => {
    const allProducts = products.map((pd) => pd);
    for (const product of allProducts) {
      const title = product.title;
      const image = product.image;
      const rating = product.rating.rate;
      const count = product.rating.count;
      const div = document.createElement("div");
      div.classList.add("col");
      div.innerHTML = `
        <div class="card text-center shadow-sm single-product bg-light">
            <img src="${image}" class="product-image p-2"></img>
            <div class="card-body">
                <h5 class="card-title">${title.slice(0,30)}</h5>
                <p class="card-text">${rating}<i class="fas fa-star icon"></i> Total Rating: ${count}</p>
                <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="buy-now btn btn-success">Add to cart</button>
                <button onclick="openModal(${product.id})" id="details-btn" class="btn btn-primary">Details</button>
            </div>
        </div>
        `;
      document.getElementById("all-products").appendChild(div);
    }
  };
  let count = 0;
  const addToCart = (id, price) => {
    count = count + 1;
    updatePrice("price", price);
  
    updateTaxAndCharge();
    document.getElementById("total-Products").innerText = count;
    updateTotal();
  };
  
  const getInputValue = (id) => {
    const element = document.getElementById(id).innerText;
    const converted = parseFloat(element);
    return converted;
  };

  //open modal
  const openModal = (id) => {
    var modal = document.getElementById("myModal");
    modal.style.display = "block";
    const url = `https://fakestoreapi.com/products/${id}`;
    fetch(url)
      .then(res=>res.json())
      .then(json=>showProductInModal(json))
  }

  //show item in modal
  const showProductInModal = (product) => {
    const imageUrl = product.image;
    document.getElementById('modal-img').setAttribute('src', imageUrl);
    document.getElementById('modal-title').innerText = product.title.slice(0,20);
    document.getElementById('modal-des').innerText = product.description.slice(0,200);
    document.getElementById('modal-price').innerText = product.price;
  }

  //close modal
  const closeModal = () => {
    var modal = document.getElementById("myModal");
    modal.style.display = "none";
  }
  
  // main price update function
  const updatePrice = (id, value) => {
    const convertedOldPrice = getInputValue(id);
    const convertPrice = parseFloat(value);
    const total = convertedOldPrice + convertPrice;
    document.getElementById(id).innerText = total.toFixed(2);
  };
  
  // set innerText function
  const setInnerText = (id, value) => {
    document.getElementById(id).innerText = value.toFixed(2);
  };
  
  // update delivery charge and total Tax
  const updateTaxAndCharge = () => {
    const priceConverted = getInputValue("price");
    if (priceConverted > 200) {
      setInnerText("delivery-charge", 30);
      setInnerText("total-tax", priceConverted * 0.2);
    }
    if (priceConverted > 400) {
      setInnerText("delivery-charge", 50);
      setInnerText("total-tax", priceConverted * 0.3);
    }
    if (priceConverted > 500) {
      setInnerText("delivery-charge", 60);
      setInnerText("total-tax", priceConverted * 0.4);
    }
  };
  
  //grandTotal update function
  const updateTotal = () => {
    const grandTotal =
      getInputValue("price") + getInputValue("delivery-charge") +
      getInputValue("total-tax");
    document.getElementById("total").innerText = grandTotal.toFixed(2);
  };