const renderProductList = (products) => {
  const html = products
    .map((product) => {
      return `<div class="col-12 col-sm-6 col-lg-4 d-flex justify-content-center">
              <div class="card d-flex align-items-center flex-column">
                <a href="./detail.html?productid=${product.id}" class="product__link w-100 text-center">
                  <img class="card-img-top" src="${product.image}" alt="Title" />
                  <div class="card-body">
                    <h4 class="card-title text-start">${product.name}</h4>
                    <p class="card-text text-start">${product.shortDescription}</p>
                  </div>
                </a>
                <div class="card-footer mt-auto d-flex align-items-strech w-100 p-0">
                  <a class="card-button" href="#" style="width: 50%">Buy now</a>
                  <p class="m-0 text-center card-price" style="width: 50%">${product.price}$</p>
                </div>
              </div>
            </div>`;
    })
    .join('');

  document.querySelector('#product__container').innerHTML = html;
};

const getProductById = async () => {
  let params = new URLSearchParams(document.location.search);
  const productid = params.get('productid');
  try {
    const response = await axios.get(
      `https://shop.cyberlearn.vn/api/Product/getbyid?id=${productid}`
    );
    if (response) {
      const { relatedProducts } = response.data.content;
      const productInfo = {
        name: response.data.content.name,
        price: response.data.content.price,
        description: response.data.content.description,
        size: response.data.content.size,
        image: response.data.content.image,
        quantity: 1
      };
      
      renderProductById(productInfo)
      renderProductList(relatedProducts);
    }
  } catch (error) {
    console.log(error);
  }
};




const renderProductById = (product) => {
  
  const html = `<div class="row justify-content-between align-items-center">
  <div class="col-12 col-sm-6 col-lg-4 ms-xl-3">
    <img src="${product.image}" alt="..." class="w-100 bg-light"/>
  </div>
  <div class="col-12 col-sm-6 col-lg-7">
    <div class="ms-sm-auto ms-lg-0 w-sm-75">
      <h3 class="product__title">${product.name}</h3>
      <p class="product__description">
        ${product.description}
      </p>
      <div class="product__size">
        <h4>Available size</h4>
        <div class="size-list d-flex my-3">
          ${product.size.map(s => `<div class="box"><span>${s}</span></div>`).join('')}
        </div>
      </div>
      <p class="product__price">${product.price}$</p>
      <div class="product__action">
        <div class="product__add d-flex align-items-center">
          <button class="btn btn-primary">+</button>
          <span class="product__quantity" id='product__quantity'>${product.quantity}</span>
          <button class="btn btn-primary">-</button>
        </div>
        <div class="mt-2">
          <button class="product__btn-cart">Add to cart</button>
        </div>
      </div>
    </div>
  </div>
</div>`;



document.querySelector('#product-detail').innerHTML = html;
};

window.onload = function () {
  getProductById();
};
