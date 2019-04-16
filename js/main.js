class Device {

	checkIfMobile() {

		let _mobile = false;

		if (getComputedStyle(document.querySelector(".main-nav__hamburger")).getPropertyValue("display") === "none") {

			_mobile = false;

		} else {

			_mobile = true;
		}

		return _mobile;
	};
}

// hamburger menu
class MobileMenu {

	constructor() {

		this.hamburgerButton = document.querySelector(".main-nav__hamburger");
		this.menu = document.querySelector(".main-nav__list");
		this.device = new Device();

		this.hamburgerButton.addEventListener("click", this.toggleMenu.bind(this));

		window.addEventListener("resize", () => {
			if (!this.device.checkIfMobile() && this.menu.classList.contains("main-nav__list--active")) {
				document.body.style.overflow = "scroll";
				this.menu.classList.remove("main-nav__list--active");

			}
		});
	}

	toggleScroll() {

		if (this.menu.classList.contains("main-nav__list--active")) {

			document.body.style.overflow = "hidden";

		} else {

			document.body.style.overflow = "scroll";
		}
	}

	toggleMenu() {
		if (this.device.checkIfMobile()) {
			this.menu.classList.toggle("main-nav__list--active");
			this.toggleScroll();
		}
	}
}

const menuMobile = new MobileMenu();

////zmiana "Maison"(h1) na logo w rozdzielczości desktopowej

class LogoDesctop {

	constructor() {

		this.h1 = document.querySelector(".header__heading");
		this.hamburgerButton = document.querySelector(".main-nav__hamburger");
		this.device = new Device();
		this.showLogo = this.toggleLogo();

		window.addEventListener("resize", this.toggleLogo.bind(this));
	}

	toggleLogo() {

		if (!this.device.checkIfMobile()) {

			this.h1.innerHTML = '<img src="./assets/logotype.svg">';

		} else {

			this.h1.innerHTML = "MAISON";
		}
	}
}

const logoDesctop = new LogoDesctop();

////obsługa slider(header)
//
///1.klasa drukująca nr slajdu
class PrintNumber {

	constructor(activeIndex = 0) {

		this.numbers = [1, 2, 3];
		this.activeIndex = activeIndex;
	}

	printNumberNext() {

		this.activeIndex++;

		if (this.activeIndex >= this.numbers.length) {

			this.activeIndex = 0;
		}

		return this.numbers[this.activeIndex] + " ";
	}

	printNumberBack() {

		this.activeIndex--;

		if (this.activeIndex < 0) {

			this.activeIndex = this.numbers.length - 1;
		}

		return this.numbers[this.activeIndex] + " ";
	}
}

//nr aktywnego slajdu
class SlideNumber {

	constructor() {

		this.activeSlide = [0, 1, 2];
		this.active = 0;
	}

	slideNext() {

		this.active++;

		if (this.active >= this.activeSlide.length) {

			this.active = 0;
		}

		return this.activeSlide[this.active];
	}

	slideBack() {

		this.active--;

		if (this.active < 0) {

			this.active = this.activeSlide.length - 1;
		}

		return this.activeSlide[this.active];
	}
}

//6.glowna klasa obslugujaca slider, wyswietlaca
class Slider {

	constructor() {

		this.urlMobile = ["url(./assets/slide1.jpg)", "url(./assets/slide2.jpg)", "url(./assets/slide3.jpg)"];
		this.urlDesctop = ["url(./assets/slide1-2x.jpg)", "url(./assets/slide2-2x.jpg)", "url(./assets/slide3-2x.jpg)"];
		this.carusel = document.querySelector(".carousel__bg");
		this.slideNumber = document.querySelector(".carousel__slide");
		this.slide = new SlideNumber();
		this.number = new PrintNumber();
		this.device = new Device();
		this.indexInterval = setInterval(this.changeSlideAuto.bind(this), 5000);
		this.arrowBack = document.querySelector(".carousel__arrow--back");
		this.arrowNext = document.querySelector(".carousel__arrow--next");
		this.arrowBack.addEventListener("click", this.changeSlideBack.bind(this));
		this.arrowNext.addEventListener("click", this.changeSlideNext.bind(this));

		this.dots = [...document.querySelectorAll(".carousel__dot")];
		this.dots.forEach((dot) => {

			dot.addEventListener("click", this.changeSlidesWithDots.bind(this));
		}, this);

		this.slideEffect();
	}

	slideEffect() {

		if (this.carusel.classList.contains("carousel__effect")) {

			this.carusel.classList.remove("carousel__effect");
		}

		const that = this;

		setTimeout(() => {

			that.carusel.classList.add("carousel__effect");
		}, 500);
	}

	changeAppearanceDots(indexDot) {

		let indexActive = this.dots.findIndex(dot =>

			dot.classList.contains("carousel__dot--active")
		);

		this.dots[indexActive].classList.remove("carousel__dot--active");
		this.dots[indexDot].classList.add("carousel__dot--active");
	}

	changeSlideAuto() {

		this.slideEffect();
		let currentSlide = this.slide.slideNext();

		if (this.device.checkIfMobile()) {

			this.changeAppearanceDots(currentSlide);
			this.carusel.style.backgroundImage = this.urlMobile[currentSlide];

		} else {

			this.carusel.style.backgroundImage = this.urlDesctop[currentSlide];
		}
		this.slideNumber.innerHTML = this.number.numbers[currentSlide] + " ";
	}

	changeSlideBack() {

		this.slideEffect();

		clearInterval(this.indexInterval);

		let currentSlide = this.slide.slideBack();
		this.carusel.style.backgroundImage = this.urlDesctop[currentSlide];
		this.slideNumber.innerHTML = this.number.numbers[currentSlide] + " ";
		this.indexInterval = setInterval(this.changeSlideAuto.bind(this), 5000);
	}

	changeSlideNext() {

		this.slideEffect();

		clearInterval(this.indexInterval);

		let currentSlide = this.slide.slideNext();
		this.carusel.style.backgroundImage = this.urlDesctop[currentSlide];
		this.slideNumber.innerHTML = this.number.numbers[currentSlide] + " ";
		this.indexInterval = setInterval(this.changeSlideAuto.bind(this), 5000);
	}

	changeSlidesWithDots(e) {

		this.slideEffect();

		clearInterval(this.indexInterval);

		const indexDot = this.dots.indexOf(e.target);
		this.slide.active = indexDot;
		this.changeAppearanceDots(indexDot);
		this.carusel.style.backgroundImage = this.urlMobile[indexDot];
		this.slideNumber.innerHTML = this.number.numbers[indexDot] + " ";
		this.indexInterval = setInterval(this.changeSlideAuto.bind(this), 5000);
	}
}

const slider = new Slider();

////lista rozwijana: categories/filter
class DropdownList {

	constructor() {

		this.headings = [...document.querySelectorAll(".popup-show")];
		this.popups = [...document.querySelectorAll(".popup")];
		this.device = new Device();
		this.self = this;
		this.checkCanShow();

		window.addEventListener("resize", this.checkCanShow.bind(this));
	}

	checkIfActive() {

		const result = this.popups.findIndex(popup => {

			return popup.classList.contains("popup--active");
		});

		//        console.log(result);
		return result;
	}

	checkCanShow() {

		if (this.device.checkIfMobile()) {

			this.headings.forEach(heading => {

				heading.addEventListener("click", this.showList.bind(this));
			});
			//zamykanie aktywnych okien po przejściu z rozdzielczośći mobile na dectop    
		} else if (!this.device.checkIfMobile() && this.checkIfActive.bind(this) && this.checkIfActive !== "undefined") {

			if (this.checkIfActive() >= 0) {

				const index = this.checkIfActive();
				const element = this.popups[index];
				const xCurrent = element.querySelector(".popup__close");
				this.closeLists(xCurrent, element);

			} else {

				return;
			}

		} else {

			this.headings.forEach(heading => {

				heading.removeEventListener("click", function () {});
			});

			return;
		}
	}

	closeLists(xCurrent, ulCurrent) {

		const that = this;

		setTimeout(() => {

			ulCurrent.classList.remove("popup--active");
			xCurrent.classList.remove("active");
			document.body.style.overflow = "scroll";
		}, 200);
	}

	showX(duration, that, ulCurrent, self) {

		const xCurrent = that.parentNode.querySelector(".popup__close");

		xCurrent.classList.add("active");

		xCurrent.addEventListener("click", function () {

			this.animate([{
					transform: "scale(1)",
					opacity: 1
				},
				{
					transform: "scale(0)",
					opacity: 0
				}
			], {
				duration: duration,
				easing: "ease-out"
			});

			self.closeLists(xCurrent, ulCurrent);
		});
	}

	showList(e) {
		if (this.device.checkIfMobile()) {
			const self = this;
			const that = e.target;

			const ulCurrent = that.parentNode.querySelector(".popup");

			ulCurrent.classList.add("popup--active");
			document.body.style.overflow = "hidden";

			this.showX(250, that, ulCurrent, self);
		}

	}
}

const dropdown = new DropdownList();

////zaznaczenie koloru(filter)
class ColorFilter {

	constructor() {

		this.items = [...document.querySelectorAll(".filter__color")];
		this.items.forEach(item => {

			item.addEventListener("click", this.checkColor.bind(this));
		});
	}

	checkColor(e) {

		const indexActive = this.items.findIndex(elem => {

			return elem.classList.contains("filter__color--active");
		});

		this.items[indexActive].classList.remove("filter__color--active");
		e.target.classList.add("filter__color--active");
	}
}

const colorFilter = new ColorFilter();


////plugin rangeSlider-implementacja
const getValueRange = () => {

	const val1 = document.getElementById("from");
	const val2 = document.getElementById("to");

	$(".js-range-slider").ionRangeSlider({
		type: "double",
		min: 0,
		max: 1000,
		from: 200,
		to: 500,
		skin: "round",
		onStart: function (data) {
			val1.setAttribute("value", data.from);
			val2.setAttribute("value", data.to);

			val1.addEventListener("input", function () {
				let start = this.value;
				//                console.log(start);
				val1.setAttribute("value", start);
			});
		},

		onChange: function (data) {
			val1.setAttribute("value", data.from);
			val2.setAttribute("value", data.to);

			val1.addEventListener("input", function () {
				let start = this.value;
				//                console.log(start);
				val1.setAttribute("value", start);
			});
		}
	});
};
//
getValueRange();

const productsCollection = [];
//koszyk
class Cart {
	constructor() {
		this.countInCart = document.querySelector(".cart__count");
		this.products = [];
		this.count = this.getCount();
		let _money = 0;
		this.getMoneyValue = () => {
			return _money;
		}
		this.clearMoney = () => {
			return _money = 0;
		}
		this.setMoneyValue = (val, removeEl) => {

			if (val === "add") {
				this.products.forEach(product => {
					_money += product.getPrice();
				});
			} else if (val === "minus") {
				_money -= removeEl.getPrice();
			}
			console.log(_money);
			return _money;
		}
		this.btn = document.querySelector(".cart");
		this.dropdown = document.querySelector(".cart__dropdown");
		this.content = document.querySelector(".cart__dropdown-text");
		this.device = new Device();
		this.cartContainer = document.querySelector(".cart__container");
		this.cartBtn = document.querySelector(".cart__btn");
		this.btnAdd = document.querySelector(".product__bag");
		this.btnAddHtml = this.btnAdd.outerHTML;


		window.addEventListener("resize", () => {
			this.btn.addEventListener("mouseenter", this.showCart.bind(this));

			this.btn.addEventListener("mouseleave", this.hideCart.bind(this));
		});

		this.btn.addEventListener("mouseenter", this.showCart.bind(this));
		this.btn.addEventListener("mouseleave", this.hideCart.bind(this));
	}

	addToCart(e) {
		const articleCurrent = e.currentTarget.closest(".product");
		this.countInCart.classList.add("active");

		if (!this.cartContainer.querySelector("ul")) {
			const productAddedList = document.createElement("ul");
			this.cartContainer.insertBefore(productAddedList, this.cartBtn);
			productAddedList.classList.add("cart__list");
			const hr = document.createElement("hr");
			this.cartContainer.insertBefore(hr, this.cartBtn);
			hr.classList.add("cart__line");

			const money = document.createElement("p");
			this.cartContainer.insertBefore(money, this.cartBtn);
			money.classList.add("cart__pay");
		}

		if (e.currentTarget.style.color == "") {
			const cartUl = this.cartContainer.querySelector("ul");
			const toPay = this.cartContainer.querySelector(".cart__pay");
			e.currentTarget.textContent = "Added to Cart";
			e.currentTarget.style.color = "green";
			const productId = articleCurrent.dataset.id;

			const productCheck = productsCollection.find(product => {
				return product.id == productId;
			});
			this.products.push(productCheck);

			this.countInCart.innerHTML = this.getCount();
			this.content.innerHTML = "";
			cartUl.innerHTML = "";
			this.cartBtn.textContent = "Go to Cart";

			const productName = this.products.forEach(product => {
				const li = document.createElement("li");
				cartUl.appendChild(li);
				li.setAttribute('data-id', `${ product.getId()}`);
				li.classList.add("cart__list-item");

				const x = document.createElement("p");
				li.appendChild(x);
				x.innerHTML = "x";

				const img = document.createElement("img");
				li.appendChild(img);
				img.src = `./assets/${product.getImage()}.jpg`;
				img.classList.add("cart__list-img");

				const pName = document.createElement("p");
				li.appendChild(pName);
				pName.innerHTML += product.getName();


				const pPrice = document.createElement("p");
				li.appendChild(pPrice);
				pPrice.innerHTML += product.getPrice() + "$";
				this.clearMoney();
				toPay.innerHTML = this.setMoneyValue("add") + "$";

				x.addEventListener("click", this.removeProduct.bind(this));

			});
			console.log(this.products)

		}
	}

	showCart() {

		if (!this.device.checkIfMobile()) {

			this.dropdown.classList.add("cart__dropdown--active");
		}

	}

	hideCart() {
		if (!this.device.checkIfMobile()) {
			this.dropdown.classList.remove("cart__dropdown--active");
		}
	}

	removeProduct(e) {
		const product = e.currentTarget.closest(".cart__list");
		const productId = e.currentTarget.parentNode.getAttribute("data-id");
		const articles = [...document.querySelectorAll(".product")];
		const articleCurrent = articles.find(product => product.dataset.id === productId);

		const currentBtn = articleCurrent.querySelector(".product__bag");
		console.log(this.btnAddHtml);
		currentBtn.outerHTML = this.btnAddHtml;
		currentBtn.style.color = "";

		product.removeChild(e.currentTarget.parentNode);
		const index = this.products.findIndex(product => product.getId() == productId);

		const toPay = this.cartContainer.querySelector(".cart__pay");
		toPay.innerHTML = this.setMoneyValue("minus", this.products[index]) + "$";
		this.products.splice(index, 1);

		this.countInCart.innerHTML = this.getCount();


		if (!this.products.length) {
			this.countInCart.classList.remove("active");
			this.cartContainer.removeChild(document.querySelector(".cart__list"));
			this.cartContainer.removeChild(document.querySelector(".cart__line"));
			this.cartContainer.removeChild(document.querySelector(".cart__pay"));

			this.content.innerHTML = "Your cart is empty";
			this.cartBtn.textContent = "Keep shopping";

		}

	}
	getCount() {
		return this.products.length;
	}
}


//stan hover produktu

class ProductAppearance {

	constructor() {

		this.imgs = document.querySelectorAll(".product");
		this.bagBtns = document.querySelectorAll(".product__bag");
		this.likes = document.querySelectorAll(".product__like");
		this.cart = new Cart();

		this.device = new Device();

		this.checkCanShow();

		window.addEventListener("resize", this.checkCanShow.bind(this));

		this.likes.forEach(like => {

			like.addEventListener("click", this.addToFavorites);
		});
		this.bagBtns.forEach(btn => {

			btn.addEventListener("click", this.cart.addToCart.bind(this.cart));
		});



	}

	checkCanShow() {

		this.imgs.forEach(img => {

			img.addEventListener("mouseover", this.mouseOver.bind(this));
			img.addEventListener("mouseleave", this.mouseLeave.bind(this));
		});

	}

	mouseOver(e) {

		if (!this.device.checkIfMobile()) {
			const like = e.currentTarget.querySelector(".product__like");
			const bagBtn = e.currentTarget.querySelector(".product__bag");

			e.currentTarget.querySelector(".product__img-hover").classList.add("product__img-hover--active");

			like.classList.add("active");
			bagBtn.classList.add("active");


		} else return;

	}

	mouseLeave(e) {

		if (!this.device.checkIfMobile()) {
			const like = e.currentTarget.querySelector(".product__like");
			const btnBag = e.currentTarget.querySelector(".product__bag");

			if (!(like.classList.contains("product__like--active"))) {

				like.classList.remove("active");
			}

			e.currentTarget.querySelector(".product__img-hover").classList.remove("product__img-hover--active");
			//			
			if (btnBag.style.color !== "") {

				btnBag.classList.add("active");

			} else if (btnBag.style.color === "") {

				btnBag.classList.remove("active");
			}
		} else return;

	}

	addToFavorites() {

		this.classList.toggle("product__like--active");
		this.innerHTML = '<i class="fas fa-heart"></i>';

		if (!(this.classList.contains("product__like--active"))) {

			this.innerHTML = '<i class="far fa-heart"></i>';
		}
	}
}

//const productAppearance = new ProductAppearance();
class Product {
	constructor(id) {
		this.id = parseInt(id);
		this.name = "";
		this.price = 0;
		this.image = "";
	}
	getId() {

		return this.id;
	}

	getName() {

		return this.name;
	}

	getPrice() {

		return this.price;
	}

	getImage() {

		return this.image;
	}

	setName(name) {

		this.name = name;
	}

	setPrice(price) {

		this.price = price;
	}

	setImage(image) {

		this.image = image;
	}

}


const loadAjaxProduct = function (response) {
	let count = 0;

	const mainGrid = document.querySelector(".main__grid");

	if (response.error !== undefined && response.error === false && response.products && response.products !== undefined) {

		const products = response.products;


		products.forEach(productRaw => {
			if (count > 7) {
				count = 0;
			}

			count++;
			console.log(count);
			const product = new Product(productRaw.id);
			product.setName(productRaw.name);
			product.setPrice(productRaw.price);
			product.setImage(productRaw.image);


			const clone = document.querySelector("#clone").cloneNode(true);

			clone.removeAttribute("id");
			clone.removeAttribute("style");
			const cloneHtml = clone.outerHTML;
			let cloneReplace = cloneHtml.toString();


			cloneReplace = cloneReplace.replace("{id}", product.getId());
			cloneReplace = cloneReplace.replace("{name}", product.getName());
			cloneReplace = cloneReplace.replace("{price}", product.getPrice());
			cloneReplace = cloneReplace.replace("{image}", product.getImage());
			cloneReplace = cloneReplace.replace("{image}", product.getImage());
			cloneReplace = cloneReplace.replace("{image}", product.getImage());
			cloneReplace = cloneReplace.replace("{count}", count);

			const insert = document.createElement("article");

			mainGrid.appendChild(insert);


			insert.outerHTML = cloneReplace;

			productsCollection.push(product);
		});
		const productAppearance = new ProductAppearance();

		const product3 = document.querySelector(".main__product-3");
		const product3Img = [...product3.querySelectorAll(".product__img")];
		product3Img.forEach(img => img.classList.add("product__img--big"));
	} else if (response.error !== undefined && response.error === true && response.message !== undefined) {

		mainGrid.innerHTML = "An error occurred while loading.<br> Please try again";
	} else mainGrid.innerHTML = "No products";


}
class Ajax {
	constructor(url, data, callback, method = "GET", async = "true") {
		this.url = url;
		this.data = data;
		this.callback = callback;
		this.method = method;
		this.async = async;
		this.done = false;
		this.response = null;
		this.send();
	}

	send() {
		const that = this;
		const xhr = new XMLHttpRequest();
		xhr.open(this.method, this.url, this.async);

		if (this.data.length > 0) {
			this.send(JSON.stringify(this.data));
		} else {
			xhr.send();
		}


		xhr.addEventListener("load", function (e) {
			that.done = true;
			that.response = JSON.parse(this.response);
			that.callback(that.response);


		}, false);
	}

	getIsDone() {

		return this.done;
	}

	getResponse() {

		return this.response;
	}

}
const ajaxProduct = new Ajax("https://makuchdesign.pl/justyna/sky_planet/ajax.php", [], loadAjaxProduct);



////zmiana układu elementów w foooter
class ChangeOrderInFooter {

	constructor() {

		this.social = document.querySelector(".social");
		this.links = document.querySelector(".footer__links");
		this.line = document.querySelector(".footer__line");
		this.socialHtml = this.social.innerHTML;
		this.linksHtml = this.links.innerHTML;
		this.device = new Device();

		window.addEventListener("resize", function () {

			if (this.device.checkIfMobile()) {

				this.changeOrder();

			} else {

				this.restoreTheOrder();
			}
		}.bind(this));
	}

	changeOrder() {

		this.social.innerHTML = this.linksHtml;
		this.social.classList.add("footer__links");
		this.links.style.display = "none";
	}

	restoreTheOrder() {

		this.social.innerHTML = this.socialHtml;
		this.social.classList.remove("footer__links");
		this.links.style.display = "flex";
	}
}

const changeOrderInFooter = new ChangeOrderInFooter();
