// create document element
function createArticle(menuCtg, menuImg, menuName, menuPrice, menuDesc) {

  const article = document.createElement('article');
  article.className = `ctg-${menuCtg}`;

  const img = document.createElement('img');
  img.src = `./images/${menuImg}`;
  // img.src = 'images/main-menu01.png';

  const div = document.createElement('div');
  div.className = 'menu-desc';

  const name = document.createElement('h3');
  name.innerText = menuName;

  const price = document.createElement('p');
  price.innerText = `${menuPrice.toLocaleString()}원`;
  // 세자리수 콤마(,) 뒤에 원 붙이기

  const hr = document.createElement('hr');

  const desc = document.createElement('p');
  desc.innerText = menuDesc;

  div.append(name, price, hr, desc);
  article.append(img, div);

  return article;
}

// json 가져와서 for문으로 json 객체 수만큼 article 만들기
// json 문서 참조 - https://developer.mozilla.org/ko/docs/Web/API/Fetch_API/Using_Fetch
async function getJson() {
  const res = await fetch('foodMenu.json');
  const foodMenu = await res.json();
  return foodMenu;
}

// main에 있는 elements 전부 초기화 후 해당 카테고리만 다시 main에 추가
function filterMenu(articles, ctg) {
  const main = document.querySelector('main');
  main.innerHTML = '';

  articles.forEach(article => {
    if(ctg === 'all' || article.classList.contains(`ctg-${ctg}`)) {
      main.appendChild(article);
    }
  });
}

// remove button style
function removeActiveBtn(btns) {
  btns.forEach(btn => {
    if(btn.classList.contains('btn-active')){
      btn.classList.remove('btn-active');
    }
  })
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
      // change button style
      removeActiveBtn(ctgBtns);
      e.target.classList.add('btn-active');

      // filter menu
      filterMenu(articles, e.target.textContent);
    });
  });
}