const toggleMenu = document.querySelector('.toggle-menu');
const menuPopup = document.querySelector('.menu__popup');
const headerElement = document.querySelector('#header');

const getProducts = async () => {
  try {
    const response = await axios.get('https://shop.cyberlearn.vn/api/Product');
    const data = response.data.content;
    renderProduct(data);
  } catch (error) {
    console.error(error);
  }
};

const renderProduct = (products) => {
  const html = products
    .map((product) => {
      return `<div class="col-12 col-sm-6 col-lg-4 d-flex justify-content-center">
              <div class="card d-flex align-items-center flex-column">
                <a href="./pages/detail.html?productid=${product.id}" class="product__link w-100 text-center">
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

toggleMenu.addEventListener('click', () => {
  document.querySelector('.menu__popup').classList.toggle('show-menu');
})

document.onclick = function (e) {
  if (!toggleMenu.contains(e.target) && !menuPopup.contains(e.target)) {
    document.querySelector('.menu__popup').classList.remove('show-menu');
  } 
};

window.addEventListener('load', () => {
  getProducts();
});
window.addEventListener('scroll', () => {
  if (window.scrollY > 0) {
    headerElement.classList.add('fixed-header');
  } else {
    headerElement.classList.remove('fixed-header');
  }
});
