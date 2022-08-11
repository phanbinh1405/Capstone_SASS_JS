const toggleMenu = document.querySelector('.toggle-menu');
const menuPopup = document.querySelector('.menu__popup');
const headerElement = document.querySelector('#header');

const getDetail = async () => {
  try {
    const result = await axios.get('https://shop.cyberlearn.vn/api/Product/getbyid?id=1');
    const data = result.data.content;
    renderDetail(data);
    renderRealateProducts(data);
  }catch(err) {
    console.error(err);
  } 
};

      
const renderDetail = (detailProd) =>{
  const htmlDetail = detailProd.map((detail) =>{
      return `<div class="col-6">
            <img class="detail__img" src="${detail.image}" alt=".."/>
          </div>
          <div class="col-6" style="width: 50%;">
            <h4 class="detail__title">${detail.name}</h4>
            <p class="detail__text">${detail.description}</p>
            <div class="detail__size">
              <p>availavle size</p>
              <div class="row d-flex justify-content-between">
                <div class="col-6 button-size">
                  <button>${detail.size}</button>
                </div>
              </div>
            </div>
            <p class="detail__price pt-2">${detail.price}$</p>
            <div class="detail__amount">
              <div class="row d-flex justify-content-between">
                <div class="col-4 d-flex">
                  <button>+</button>
                  <p>1</p>
                  <button>-</button>
                </div>
              </div>
            </div>
            <div class="detail__add">
              <a class="detail__button" href="#">Add to cart</a>
            </div>
            `
        }).join('');
    document.querySelector('#detail__container').innerHTML = htmlDetail;
}

const renderRealateProducts = (realatedProd) => {
  const html = realatedProd.map((realated) => {
      return `<div class="col-12 col-sm-6 col-lg-4 d-flex justify-content-center">
              <div class="card d-flex align-items-center flex-column">
                <a href="../pages/detail.html?productid=${realated.id}" class="realated__link w-100 text-center">
                  <img class="card-img-top" src="${realated.image}" alt="Title" />
                  <div class="card-body">
                    <h4 class="card-title text-start">${realated.name}</h4>
                    <p class="card-text text-start">${realated.shortDescription}</p>
                  </div>
                </a>
                <div class="card-footer mt-auto d-flex align-items-strech w-100 p-0">
                  <a class="card-button" href="#" style="width: 50%">Buy now</a>
                  <p class="m-0 text-center card-price" style="width: 50%">${realated.price}$</p>
                </div>
              </div>
            </div>`;
    }).join('');

  document.querySelector('#realated__container').innerHTML = html;
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
getDetail();
});
window.addEventListener('scroll', () => {
  if (window.scrollY > 0) {
    headerElement.classList.add('fixed-header');
  } else {
    headerElement.classList.remove('fixed-header');
  }
});
