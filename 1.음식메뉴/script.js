/**
 * create document element
 * @param {String} menuCtg 
 * @param {String} menuImg 
 * @param {String} menuName 
 * @param {Number} menuPrice 
 * @param {String} menuDesc 
 * @returns {Element} article element
 */
function createArticle(menuCtg, menuImg, menuName, menuPrice, menuDesc) {

  const article = document.createElement('article');
  article.className = `ctg-${menuCtg}`;

  const img = document.createElement('img');
  img.src = `./images/${menuImg}`;

  const div = document.createElement('div');
  div.className = 'menu-desc';

  const name = document.createElement('h3');
  name.innerText = menuName;

  const price = document.createElement('p');
  price.innerText = `${menuPrice.toLocaleString()}원`;

  const hr = document.createElement('hr');

  const desc = document.createElement('p');
  desc.innerText = menuDesc;

  div.append(name, price, hr, desc);
  article.append(img, div);

  return article;
}

/**
 * get json file contents
 * (*json 문서 참조 - https://developer.mozilla.org/ko/docs/Web/API/Fetch_API/Using_Fetch)
 * @returns {Object} foodMenu object
 */
async function getJson() {
  const res = await fetch('foodMenu.json');
  const foodMenu = await res.json();
  return foodMenu;
}

/**
 * main에 있는 elements 전부 초기화 후 해당 카테고리만 다시 main doc에 추가
 * @param {Element[]} articles 
 * @param {String} ctg 
 */
function filterMenu(articles, ctg) {
  const main = document.querySelector('main');
  main.innerHTML = '';

  articles.forEach(article => {
    if(ctg === 'all' || article.classList.contains(`ctg-${ctg}`)) {
      main.appendChild(article);
    }
  });
}

/**
 * change active button 
 * @param {Element[]} btns 
 * @param {Element} targetBtn
 */
function changeActiveBtn(btns, targetBtn) {
  btns.forEach(btn => btn.classList.remove('btn-active'));
  targetBtn.classList.add('btn-active');
}


let articles = [];
window.onload = () => {
  getJson()
  .then(foodMenu => {
    foodMenu.forEach(menu => {
      let article = createArticle(menu.category, menu.image, menu.foodName, menu.price, menu.description);
      articles.push(article);
      document.querySelector('main').appendChild(article);
    });
  })

  // 카테고리 버튼 클릭 이벤트리스너 등록
  const ctgBtns = document.querySelectorAll('.btn-ctg');
  ctgBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      changeActiveBtn(ctgBtns, e.target);
      filterMenu(articles, e.target.textContent);
    });
  });
}