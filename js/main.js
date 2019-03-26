class Device{
	constructor(){
		let _mobile = false;
		
		this.checkIfMobile = function(){
			console.log(this);
		if(getComputedStyle(document.querySelector(".main-nav__hamburger")).getPropertyValue("display") === "none"){
			 _mobile = false;			
			}
		else {
			_mobile = true;
		}
//		console.log(_mobile);
		return _mobile;
			
		}	
		window.addEventListener("resize", this.checkIfMobile.bind(this));
	}	
}

//// hamburger menu
class MobileMenu{
	constructor(){
		this.hamburgerButton = document.querySelector(".main-nav__hamburger");
		this.menu = document.querySelector(".main-nav__list");	
		this.hamburgerButton.addEventListener("click", this.toggleMenu.bind(this));	
	}
	toggleScroll(){
		if(this.menu.classList.contains("main-nav__list--active")){
			 document.body.style.overflow = "hidden";
		}
		else{
			 document.body.style.overflow = "scroll";
		}
	}
	toggleMenu(){
		this.menu.classList.toggle("main-nav__list--active");
		this.toggleScroll();
	}
}
const menuMobile = new MobileMenu();

////zmiana "Maison"(h1) na logo w rozdzielczości desktopowej

class LogoDesctop{
	constructor(){
		this.h1 =  document.querySelector(".header__heading");	
		this.hamburgerButton = document.querySelector(".main-nav__hamburger");
		this.device = new Device();
		this.showLogo = this.toggleLogo();
		window.addEventListener("resize", this.toggleLogo.bind(this));	}
		
		toggleLogo(){
			if(!this.device.checkIfMobile()){
				this.h1.innerHTML = '<img src="./assets/logotype.svg">';
			}
			else{
				this.h1.innerHTML ="MAISON";
			}
		}
}
const logoDesctop = new LogoDesctop();

////obsługa slider(header)
//
///1.klasa drukująca nr slajdu 
class PrintNumber{
	constructor(){
		this.numbers = [1,2,3];
		this.activeIndex = 0;		
	}
	printNumberNext(){
		this.activeIndex++;
		if(this.activeIndex >= this.numbers.length) this.activeIndex = 0;
		return this.numbers[this.activeIndex] + " ";
	}
	printNumberBack(){
		this.activeIndex--;
		if(this.activeIndex < 0) this.activeIndex = this.numbers.length - 1;
		return this.numbers[this.activeIndex] + " ";
	}
}
//nr aktywnego slajdu
class SlideNumber{
	constructor(){
		this.activeSlide = [0,1,2];
		this.active = 0;		
		
		
	}
	slideNext(){
		this.active++;
		if(this.active >= this.activeSlide.length) this.active = 0;	
		return this.activeSlide[this.active];
	}
		
	slideBack(){
		this.active--;
		if(this.active <= 0) this.active = this.activeSlide.length;
		return this.activeSlide[this.active];	
	}
	
}


//6.glowna klasa obslugujaca slider, wyswietlaca
class Slider{
	constructor(){
		this.urlMobile = ["url(./assets/slide1.jpg)","url(./assets/slide2.jpg)","url(./assets/slide3.jpg)"];
		this.urlDesctop =["url(./assets/slide1-2x.jpg)","url(./assets/slide2-2x.jpg)","url(./assets/slide3-2x.jpg)"];
		this.carusel = document.querySelector(".carousel__bg");
		this.slideNumber = document.querySelector(".carousel__slide");
		this.slide = new SlideNumber();
		this.number = new PrintNumber();
		this.device = new Device();
		this.indexInterval = setInterval(this.changeSlideAuto.bind(this),5000);
		this.arrowBack = document.querySelector(".carousel__arrow--back");
		this.arrowNext = document.querySelector(".carousel__arrow--next");
		this.arrowBack.addEventListener("click",this.changeSlideBack.bind(this));
		this.arrowNext.addEventListener("click",this.changeSlideNext.bind(this));	
		
		this.dots = [...document.querySelectorAll(".carousel__dot")];
		this.dots.forEach((dot)=>{
		dot.addEventListener("click",this.changeSlidesWithDots.bind(this));
		},this);
		this.slideEffect();
		
//		window.addEventListener("resize", this.device.checkIfMobile.bind(this).bind(this));
	}
	slideEffect(){
		if(this.carusel.classList.contains("carousel__effect")){
			this.carusel.classList.remove("carousel__effect");	
		}		
		const that = this;
		setTimeout(()=>{
			that.carusel.classList.add("carousel__effect");	
		},500);	  
	}
	changeAppearanceDots(indexDot){
		let indexActive = this.dots.findIndex(dot =>
			dot.classList.contains("carousel__dot--active")
		);
		this.dots[indexActive].classList.remove("carousel__dot--active");
		this.dots[indexDot].classList.add("carousel__dot--active");		
		
	}
	changeSlideAuto(){	
		this.slideEffect();
		let currentSlide = this.slide.slideNext();
		if(this.device.checkIfMobile()){
			this.changeAppearanceDots(currentSlide);
			this.carusel.style.backgroundImage = this.urlMobile[currentSlide];	
		}
		else{
			this.carusel.style.backgroundImage = this.urlDesctop[currentSlide];
		}
		this.slideNumber.innerHTML = this.number.printNumberNext();
		
		
	}
	changeSlideBack(){
		this.slideEffect();
		clearInterval(this.indexInterval);
		let currentSlide = this.slide.slideBack();
		this.carusel.style.backgroundImage = this.urlDesctop[currentSlide];
		this.indexInterval = setInterval(this.changeSlideAuto.bind(this),5000);
		this.slideNumber.innerHTML = this.number.printNumberBack();
	}
	
	changeSlideNext(){
		this.slideEffect();
		clearInterval(this.indexInterval);
		let currentSlide = this.slide.slideNext();
		this.carusel.style.backgroundImage = this.urlDesctop[currentSlide];
		this.indexInterval = setInterval(this.changeSlideAuto.bind(this),5000);	
		this.slideNumber.innerHTML = this.number.printNumberNext();
	}

	changeSlidesWithDots(e){
		this.slideEffect();
		clearInterval(this.indexInterval);
		const indexDot = this.dots.indexOf(e.target);		
		this.slide.active = indexDot;
		this.changeAppearanceDots(indexDot);
		
		this.carusel.style.backgroundImage = this.urlMobile[indexDot];
		this.slideNumber.innerHTML = this.number.numbers[indexDot] + " ";
		this.indexInterval = setInterval(this.changeSlideAuto.bind(this),5000);	
	}

	
}
const slider = new Slider();


//
////lista rozwijana: categories/filter

class DropdownList{
	constructor(){
		this.headings = document.querySelectorAll(".sidebar__heading");
		this.device = new Device();
		this.self = this;
		this.checkCanShow();		window.addEventListener("resize",this.checkCanShow.bind(this));
			
	}
	checkCanShow(){		 
			if(this.device.checkIfMobile()){
				this.headings.forEach(heading =>{
					heading.addEventListener("click",this.showList.bind(this));
				});
			}		
	}
	closeLists(xCurrent, ulCurrent){
		const that = this;
		console.log(that);
		setTimeout(()=>{
		ulCurrent.classList.remove("sidebar__list--active");
		xCurrent.classList.remove("active");
		document.body.style.overflow = "scroll";
		},200);
	}
	showX(duration,that,ulCurrent,self){
		
		const xCurrent = that.parentNode.querySelector(".sidebar__close");	
		
		xCurrent.classList.add("active");
		
		xCurrent.addEventListener("click", function(){
			
			this.animate([
				{transform: "scale(1)",opacity:1 },
				{transform: "scale(0)",opacity:0}
			],{ 
			  duration: duration,
				easing:"ease-out"
			});
			console.log(self);
			self.closeLists(xCurrent, ulCurrent);
	});
		
	}
	showList(e){
		const self = this;
		const that = e.target;
		const ulCurrent = that.parentNode.querySelector(".sidebar__list");
		
		ulCurrent.classList.add("sidebar__list--active");		
		document.body.style.overflow = "hidden";

		this.showX(250,that,ulCurrent,self);		
	}
	
}
const dropdown = new DropdownList();


////zaznaczenie koloru(filter)
class ColorFilter{
	constructor(){
		this.items = [...document.querySelectorAll(".filter__color")];
		this.items.forEach(item =>{	
		item.addEventListener("click", this.checkColor.bind(this));
		});
	 }
		checkColor(e){
			const indexActive = this.items.findIndex(elem => {
				return elem.classList.contains("filter__color--active");				
			});
				this.items[indexActive].classList.remove("filter__color--active");
				e.target.classList.add("filter__color--active");	
			}
		}				   

const colorFilter = new ColorFilter();

////plugin rangeSlider-implementacja

const getValueRange = () =>{
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
				
				val1.addEventListener("input",function(){
				let start = this.value;
				console.log(start);
				val1.setAttribute("value", start);
				
				});
				
			},
		
			onChange: function (data) {
				val1.setAttribute("value", data.from);
				val2.setAttribute("value", data.to);
				
			val1.addEventListener("input",function(){
				let start = this.value;
				console.log(start);
				val1.setAttribute("value", start);
				
					});
			},
		
		
		});
}
//
getValueRange();
//
////stan hover produktu
class Cart{
	constructor(){
		this.count = 0;
		this.countInCart = document.querySelector(".header__count");
		
	}
	
	addToCart(){
		console.log(this);
		this.countInCart.classList.add("active");
			if(event.target.style.color == ""){
				this.count++;
				this.countInCart.innerHTML = this.count;
				event.target.textContent = "Added to Cart";
				event.target.style.color = "green";	
			}	
	}						 
}
class Product{
	constructor(){
		this.imgs = document.querySelectorAll(".product");
		this.bagBtns = document.querySelectorAll(".product__bag");
		this.likes = document.querySelectorAll(".product__like");
		this.cart = new Cart();
		
		this.device = new Device();
		if(!this.device.checkIfMobile()){
			this.imgs.forEach(img =>{
			img.addEventListener("mouseover",this.mouseOver);
			img.addEventListener("mouseleave",this.mouseLeave);
		});	
		}
		
		this.likes.forEach(like => {			
			like.addEventListener("click", this.addToFavorites);
		});
		this.bagBtns.forEach(btn =>{
		btn.addEventListener("click", this.cart.addToCart.bind(this.cart));
		});	
	}
		mouseOver(){
			const like = this.querySelector(".product__like");
			const bagBtn  = this.querySelector(".product__bag");
			
			this.querySelector(".product__img-hover").classList.add("product__img-hover--active");
			
			like.classList.add("active");
			bagBtn.classList.add("active");
		}
	
		mouseLeave(){
			const like = this.querySelector(".product__like");
			const btnBag  = this.querySelector(".product__bag");
			
			
			if(!(like.classList.contains("product__like--active"))){
				like.classList.remove("active");
			}
			this.querySelector(".product__img-hover").classList.remove("product__img-hover--active");
			if(btnBag.style.color !== ""){
				btnBag.classList.add("active");
				
			}
			else if(btnBag.style.color === ""){
					btnBag.classList.remove("active");	
			}		
		}
	
		addToFavorites(){
			this.classList.toggle("product__like--active");
			this.innerHTML = '<i class="fas fa-heart"></i>';		
				
			if(!(this.classList.contains("product__like--active"))){
				this.innerHTML='<i class="far fa-heart"></i>';
			} 
		}		
}

const product = new Product();
	

////zmiana układu elementów w foooter

class ChangeOrderInFooter{
	constructor(){
		this.social = document.querySelector(".social");
		this.links = document.querySelector(".footer__links");
		this.line = document.querySelector(".footer__line");
		this.socialHtml = this.social.innerHTML;
		this.linksHtml = this.links.innerHTML;
		this.device = new Device();
		
		window.addEventListener("resize", function(){
			if(this.device.checkIfMobile()){
				this.changeOrder();
			}
			else{
				this.restoreTheOrder();
			}	
		}.bind(this));
		
	
	}
		changeOrder(){
			this.social.innerHTML = this.linksHtml;
			this.social.classList.add("footer__links");		
			this.links.style.display= "none";
		}
		restoreTheOrder(){
			this.social.innerHTML = this.socialHtml;
			this.social.classList.remove("footer__links");
			this.links.style.display="flex";
		}
	
}
const changeOrderInFooter = new ChangeOrderInFooter();
