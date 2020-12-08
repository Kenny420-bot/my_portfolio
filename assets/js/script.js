
/***---SMOOTH VERTICAL MOUSE SCROLL---***/
function init(){
	new SmoothScroll(document,120,10)
}

function SmoothScroll(target, speed, smooth) {
	if (target === document){
		target = (document.scrollingElement 
              || document.documentElement 
              || document.body.parentNode 
              || document.body) // cross browser support for document scrolling
    }
      
	let moving = false
	let pos = target.scrollTop
    let frame = target === document.body 
              && document.documentElement 
              ? document.documentElement 
              : target // safari is the new IE
  
	target.addEventListener('mousewheel', scrolled, { passive: false })
	target.addEventListener('DOMMouseScroll', scrolled, { passive: false })

	function scrolled(e) {
		e.preventDefault(); // disable default scrolling

		let delta = normalizeWheelDelta(e)

		pos += -delta * speed
		pos = Math.max(0, Math.min(pos, target.scrollHeight - frame.clientHeight)) // limit scrolling

		if (!moving) update()
	}

	function normalizeWheelDelta(e){
		if(e.detail){
			if(e.wheelDelta){
				return e.wheelDelta/e.detail/40 * (e.detail>0 ? 1 : -1) // Opera
            }else{
                return -e.detail/3 // Firefox
            }
		}else{
            return e.wheelDelta/120 // IE,Safari,Chrome
        }
	}

	function update() {
		moving = true
    
		let delta = (pos - target.scrollTop) / smooth
    
		target.scrollTop += delta
    
		if (Math.abs(delta) > 0.5){
			requestFrame(update)
        }else{
            moving = false
        }
	}

	let requestFrame = function() { // requestAnimationFrame cross browser
		return (
			window.requestAnimationFrame ||
			window.webkitRequestAnimationFrame ||
			window.mozRequestAnimationFrame ||
			window.oRequestAnimationFrame ||
			window.msRequestAnimationFrame ||
			function(func) {
				window.setTimeout(func, 1000 / 50);
			}
		);
	}()
}


/***---MOVE MOUSE TRACKER---***/
const move_tracker = e => {
    const tracker = document.querySelector(".tracker");
    tracker.style.left = `${e.clientX - 30}px`;
    tracker.style.top = `${e.clientY - 30}px`;

    if(e.target.classList.contains("scale")){
        tracker.classList.add("tracker-switch");
    }else{
        tracker.classList.remove("tracker-switch");
    }
    
}


/***---TO BODY ARROW---***/
const to_body = () => {
    document.querySelector(".anchor")
     .scrollIntoView({behavior: "smooth", block: "start"});
}

/***---TO HEADER ARROW---***/
const to_header = () => {
    document.querySelector(".top")
        .scrollIntoView({behavior: "smooth", block: "start"});
}


/***---DROP NAV ITEMS---***/
const drop_nav_items = () => {
    let tl = anime.timeline({
        easing: 'easeOutSine',
        duration: 100,
      });
      
      tl
      .add({
          targets: document.querySelectorAll(".nav__item:nth-child(1)"),
          opacity: 0,
          translateY: "300%"
        })
      .add({
          targets: document.querySelectorAll(".nav__item:nth-child(2)"),
          opacity: 0,
          translateY: "300%"
        })
      .add({
          targets: document.querySelectorAll(".nav__item:nth-child(3)"),
          opacity: 0,
          translateY: "300%"
        })
      .add({
          targets: document.querySelectorAll(".nav__item:nth-child(4)"),
          opacity: 0,
          translateY: "300%"
        })
}


/***---LIFT NAV ITEMS---***/
const lift_nav_items = () => {
    let tl = anime.timeline({
        easing: 'easeOutSine',
        duration: 200,
      });
      
      tl
      .add({
          targets: document.querySelectorAll(".nav__item:nth-child(1)"),
          opacity: 1,
          translateY: "0"
        })
      .add({
          targets: document.querySelectorAll(".nav__item:nth-child(2)"),
          opacity: 1,
          translateY: "0"
        })
      .add({
          targets: document.querySelectorAll(".nav__item:nth-child(3)"),
          opacity: 1,
          translateY: "0"
        })
      .add({
          targets: document.querySelectorAll(".nav__item:nth-child(4)"),
          opacity: 1,
          translateY: "0"
        })
}


/***---TOGGLE MOBILE MENU---***/
const toggle_mobile_menu = () => {
    const nav = document.querySelector(".nav");
    const bars = document.querySelectorAll(".mobile__nav__btn div");

   if( nav.classList.contains("show-mobile-menu")) {
        nav.classList.remove("show-mobile-menu");
        bars[1].style.display = "block";
        bars[0].style.transform = "rotate(0) translateY(0)";
        bars[2].style.transform = "rotate(0) translateY(0)";
        drop_nav_items();
    }else{
        nav.classList.add("show-mobile-menu");
        bars[1].style.display = "none";
        bars[0].style.transform = "rotate(45deg) translateY(220%)";
        bars[2].style.transform = "rotate(-45deg) translateY(-220%)";
        drop_nav_items();
        lift_nav_items();
    }
}

/***---SHOW SOCIAL INFO---***/
const show_social = icon => {

    icon.addEventListener("mouseover", () => {
        icon.classList.add("move-icon");
        icon.nextElementSibling.classList.add("show-social");
     })

     icon.addEventListener("mouseout", () => {
        icon.classList.remove("move-icon");
        icon.nextElementSibling.classList.remove("show-social");
     })
}

/***---SHOW DESKTOP NAV BACKGROUND---***/
const show_nav_bg = () => {
    const to_down = document.querySelector(".to-down");
    const nav = document.querySelector(".nav");

    if(to_down.getBoundingClientRect().top < -60){
        nav.classList.add("nav-bg");
    }else{
        nav.classList.remove("nav-bg");
    }
}

/***---SHOW DESKTOP NAV BACKGROUND---***/
const drop_underlay_slabs = () => {
    let tl = anime.timeline({
        easing: 'easeOutSine',
        duration: 500
    });
    
    tl
    .add({
        targets: document.querySelector(".underlay__slab:nth-child(1)"),
        translateY: "100%"
    })
    .add({
        targets: document.querySelector(".underlay__slab:nth-child(2)"),
        translateY: "100%"
    })
    .add({
        targets: document.querySelector(".underlay__slab:nth-child(3)"),
        translateY: "100%"
    })
    .add({
        targets: document.querySelector(".underlay__slab:nth-child(4)"),
        translateY: "100%"
    })
    .add({
        targets: document.querySelector("underlay__slab:nth-child(5)"),
        translateY: "100%"
    })
}

/***---OPEN LOADER SLABS---***/
const open_loader_slabs = () => {

    setTimeout(() => {
        let tl = anime.timeline({
          easing: 'easeOutSine',
          duration: 100
        });
        
        tl
        .add({
          targets: document.querySelector(".loader__img"),
          opacity: "0"
        })
        .add({
          targets: document.querySelector(".loader__slab:nth-child(1)"),
          translateY: "-100%"
        })
        .add({
          targets: document.querySelector(".loader__slab:nth-child(2)"),
          translateY: "100%"
        })
        .add({
          targets: document.querySelector(".loader__slab:nth-child(3)"),
          translateY: "-100%"
        })
        .add({
          targets: document.querySelector(".loader__slab:nth-child(4)"),
          translateY: "100%"
        })
        .add({
          targets: document.querySelector(".loader__slab:nth-child(5)"),
          translateY: "-100%"
        })
        .add({
          targets: document.querySelector(".loader"),
          translateX: "-100%",
        }, 1500);
  }, 1000)

    setTimeout(() => {
        drop_underlay_slabs();
    }, 2000);

    page_transition_handler();
}

/***---CLOSE LOADER SLABS---***/
const close_loader_slabs = () => {
    let tl = anime.timeline({
        easing: 'easeInSine',
        duration: 100
    });
    
    tl
    .add({
        targets: document.querySelector(".loader"),
        translateX: "0"
        })
    .add({
        targets: document.querySelectorAll(".loader__slab:nth-child(1)"),
        translateY: "0",
    })
    .add({
        targets: document.querySelectorAll(".loader__slab:nth-child(2)"),
        translateY: "0",
    })
    .add({
        targets: document.querySelectorAll(".loader__slab:nth-child(3)"),
        translateY: "0",
    })
    .add({
        targets: document.querySelectorAll(".loader__slab:nth-child(4)"),
        translateY: "0",
    })
    .add({
        targets: document.querySelectorAll(".loader__slab:nth-child(5)"),
        translateY: "0",
    })
    .add({
        targets: document.querySelector(".loader__img"),
        opacity: "1"
      }, 1500)
}

/***---PAGE TRANSITION HANDLER---***/
const page_transition_handler = () => {
    document.querySelectorAll(".wave").forEach(link => {
        link.addEventListener("click", e => {
            const target = e.target.href;
            e.preventDefault();

            close_loader_slabs();

            setTimeout(() => {
                window.location.href = target;
            }, 2000)
        })
    })
}








/***---WINDOW ONLOAD HANDLER---***/
window.addEventListener("DOMContentLoaded", () => {
    open_loader_slabs();
});

/***---MOBILE MENU HANDLER---***/
document.querySelector(".mobile__nav__btn").addEventListener("click", toggle_mobile_menu);

/***---MOUSE TRACKER HANDLER---***/
window.addEventListener("mousemove", move_tracker);

/***---SOCIAL HOVER HANDLER---***/
document.querySelectorAll(".social__icon").forEach(icon => show_social(icon))

/***---NAV BACKGROUND HANDLER---***/
window.addEventListener("scroll", show_nav_bg);

/***---TO BODY ARROW HANDLER---***/
document.querySelector(".to-down").addEventListener("click", to_body);

/***---TO TOP ARROW HANDLER---***/
document.querySelector(".to-top").addEventListener("click", to_header);


