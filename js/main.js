const hamburgerButton = document.querySelector(".main-nav__hamburger");

//funkcja hamburger menu
const mobileMenu = () =>{
const menu = document.querySelector(".main-nav__list");

const showMenu = function(){
	menu.classList.toggle("main-nav__list--active");
	
	if(menu.classList.contains("main-nav__list--active")){
	   document.body.style.overflow = "hidden";
	   }
	else{
		 document.body.style.overflow = "scroll";
	}
};
hamburgerButton.addEventListener("click", showMenu);	
};

mobileMenu();


//zmiana "Maison"(h1) na logo w rozdzielczości desktopowej
const showLogoDesctop = () => {
	const h1 = document.querySelector(".header__heading");	
	const compStyles = window.getComputedStyle(hamburgerButton);
	
if(compStyles.getPropertyValue("display") === "none"){
	h1.innerHTML = '<img src="./assets/logotype.svg">';
}
else{
	h1.innerHTML ="MAISON";
}
};
showLogoDesctop();
window.addEventListener("resize", showLogoDesctop);


//obsługa slider(header)

const carouselSlide = () =>{
	
	const carusel = document.querySelector(".carousel__bg");
	const slideNumber = document.querySelector(".carousel__slide");
	const dots = [...document.querySelectorAll(".carousel__dot")];
	const urlMobile = ["url(./assets/slide1.jpg)","url(./assets/slide2.jpg)","url(./assets/slide3.jpg)"];
	const urlDesctop =["url(./assets/slide1-2x.jpg)","url(./assets/slide2-2x.jpg)","url(./assets/slide3-2x.jpg)"];
	let indexInterval;
	
	
		
	const activeSlide = [1,2,3];
	let active = 0;
	
	const printNumberNext = () =>{		
		active++;
		if(active >= dots.length) active = 0
		slideNumber.innerHTML = activeSlide[active] + " ";
	}
	const printNumberBack = () =>{
		active--;
		if(active < 0) active = dots.length - 1;
		slideNumber.innerHTML = activeSlide[active] + " ";
	}
	const slideEffect = () =>{
		carusel.classList.remove("carousel__effect");	
		setTimeout(()=>{
			carusel.classList.add("carousel__effect");
		},200);	  
	}
	
	dots.forEach((dot,i)=>{
		
		dot.addEventListener("click", function(){
			clearInterval(indexInterval);
			slideEffect();			
			carusel.style.backgroundImage = urlMobile[i];
			
			
		const indexActive = dots.findIndex(elem => {
			return elem.classList.contains("carousel__dot--active");				
		});	
		dots[indexActive].classList.remove("carousel__dot--active");
		dot.classList.add("carousel__dot--active");

		let activeSlide = i;
		activeSlide++;
		if(activeSlide > dots.length) activeSlide = 1;
		slideNumber.innerHTML = activeSlide + " ";
	
		indexInterval = setInterval(slideAuto,5000);
			
		});
		
	});
	const arrowBack = document.querySelector(".carousel__arrow--back");
	const arrowNext = document.querySelector(".carousel__arrow--next");
	
	let index = 0;
	
		
	arrowNext.addEventListener("click", () =>{
		clearInterval(indexInterval);
		slideEffect(); 
		index++;		
		if(index >= activeSlide.length) index = 0;
		carusel.style.backgroundImage = urlDesctop[index];		
		printNumberNext();
		indexInterval = setInterval(slideAuto,5000);
	});	

	
	arrowBack.addEventListener("click", () =>{
		slideEffect(); 
		index--;		
		if(index < 0) index = activeSlide.length - 1	;
		carusel.style.backgroundImage = urlDesctop[index];		
		printNumberBack();
	});
	
	const slideAuto = () =>{
		slideEffect();  
		index++;		
		if(index >= activeSlide.length) index = 0;
		if(getComputedStyle(document.querySelector(".carousel__arrow")).getPropertyValue("display") === "block"){
			carusel.style.backgroundImage = urlDesctop[index];	
		}
		else{
			carusel.style.backgroundImage = urlMobile[index];
			
			let indexActive = dots.findIndex(elem => {
				return elem.classList.contains("carousel__dot--active");
			});				
			dots[indexActive].classList.remove("carousel__dot--active");
			indexActive++;
			if(indexActive >= dots.length)indexActive = 0;
			dots[indexActive].classList.add("carousel__dot--active");	
		}
				
		printNumberNext();		
	}
indexInterval = setInterval(slideAuto,5000);	
}
carouselSlide();


//lista rozwijana: categories/filter

const showListItems = ()=> {	
	const headings = document.querySelectorAll(".sidebar__heading");	
	
	headings.forEach((heading) =>{
		heading.addEventListener("click", function(){
			
			let ulCurrent = this.parentNode.querySelector(".sidebar__list");
			
			ulCurrent.classList.add("sidebar__list--active");		
			document.body.style.overflow = "hidden";
			
			
			let xCurrent = this.parentNode.querySelector(".sidebar__close");			
			xCurrent.classList.add("active");
			
			xCurrent.addEventListener("click", function(){		
				this.animate([
					{transform: "scale(1)",opacity:1 },
					{transform: "scale(0)",opacity:0}
				],{ 
				  duration: 300,
					easing:"ease-out"
				});
				
				setTimeout(()=>{
					ulCurrent.classList.remove("sidebar__list--active");
					xCurrent.classList.remove("active");
					document.body.style.overflow = "scroll";
				},300);	
			});			
		});
	});
	
	
}
showListItems();

//zaznaczenie koloru(filter)
const checkColor = () =>{
	const items = [...document.querySelectorAll(".filter__color")];
		
	items.forEach(item =>{	
		item.addEventListener("click", function(){
			const indexActive = items.findIndex(elem => {
			return elem.classList.contains("filter__color--active");				
		});
			items[indexActive].classList.remove("filter__color--active");
			this.classList.add("filter__color--active");							
		});
	});
}
checkColor();

//plugin rangeSlider
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

getValueRange();

//stan hover produktu
const hoverProduct = () =>{
	const imgs = document.querySelectorAll(".product");
	const bagBtns = document.querySelectorAll(".product__bag");
	const hearts = document.querySelectorAll(".product__like");
	
	imgs.forEach(img =>{
		img.addEventListener("mouseover",function(){
			const like = this.querySelector(".product__like");
			const bag  = this.querySelector(".product__bag");
			this.querySelector(".product__img-hover").classList.add("product__img-hover--active");
			like.classList.add("active");
			bag.classList.add("active");
			
		});
		
		img.addEventListener("mouseleave",function(){
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
		});

//	dodanie produktow do ulubionych
		hearts.forEach(heart => {
			heart.addEventListener("click", function(){
				this.classList.toggle("product__like--active");
				this.innerHTML = '<i class="fas fa-heart"></i>';				
				
				if(!(this.classList.contains("product__like--active"))){
					this.innerHTML='<i class="far fa-heart"></i>';
				} 
			});
		});
		
//	dodanie do koszyka
		let count = 0;
		
		const bag = document.querySelector(".header__count");
		bagBtns.forEach((btn)=>{
			btn.addEventListener("click",function(){
				bag.classList.add("active");
				if(btn.style.color !== "green"){
					count++;
					bag.innerHTML = count;
					btn.textContent = "Added to Cart";
					btn.style.color = "green";	
				}
				
				

			});	
		});
});
}
hoverProduct();

//zmiana układu elementów w foooter
const footerInnerHtml = () =>{
	const social = document.querySelector(".social");
	const links = document.querySelector(".footer__links");
	const line = document.querySelector(".footer__line");
	const socialHtml = social.innerHTML;
	const linksHtml = links.innerHTML;
	
	function changeOrder(){
		
		if(getComputedStyle(line).getPropertyValue("display") === "none"){
		social.innerHTML = linksHtml;
		social.classList.add("footer__links");		
		links.style.display="none";
		
	}
	
	else{
		social.innerHTML = socialHtml;
		social.classList.remove("footer__links");
		links.style.display="flex";
		
	}
	}
	changeOrder();
	window.addEventListener("resize",changeOrder);

	
	
}
footerInnerHtml();