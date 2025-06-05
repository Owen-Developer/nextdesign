const headerLinkBox = document.querySelectorAll(".header-link-box");
const headerMain = document.querySelectorAll(".hl1");
const headerAlt = document.querySelectorAll(".hl2");
const homeImgContainer = document.querySelectorAll(".home-img-container");
const menuContainer = document.querySelector(".menu-container");

let currentWidth = window.innerWidth;
let headerStatus = [true, true, true, true, true];
let linkActivity = [false, false, false, false, false];
let heroStatus = [true, false, false];
let barStats = [96, 56, 82, 76, 65];

headerLinkBox.forEach((box, idx) => {
    box.addEventListener("mouseenter", () => {if(!linkActivity[idx]){
        let oldLink;
        let newLink;
        if(headerStatus[idx]){
            oldLink = headerMain[idx];
            newLink = headerAlt[idx];
            headerStatus[idx] = false;
        } else {
            newLink = headerMain[idx];
            oldLink = headerAlt[idx];
            headerStatus[idx] = true;
        }

        newLink.style.color = "black";
        newLink.style.textDecoration = "underline";

        linkActivity[idx] = true;
        oldLink.style.top = "-40px";
        newLink.style.top = "0px";
        setTimeout(() => {
            oldLink.style.transition = "none";
            oldLink.style.top = "40px";
            setTimeout(() => {
                linkActivity[idx] = false;
                oldLink.style.transition = "top 0.4s ease";
            }, 30);
        }, 400);
    }});
    box.addEventListener("mouseleave", () => {
        box.querySelectorAll(".header-link").forEach(link => {
            link.style.color = "hsl(0, 0%, 20%)";
            link.style.textDecoration = "none";
        }); 
    });
});

setInterval(() => {
    // BEFORE UPCOMING CHANGES
    let activeContainer;
    let dormantContainer;
    let disabledContainer;
    if(heroStatus[0]){
        activeContainer = homeImgContainer[0];
        dormantContainer = homeImgContainer[1];
        disabledContainer = homeImgContainer[2];
        heroStatus = [false, true, false];
    } else if(heroStatus[1]){
        activeContainer = homeImgContainer[1];
        dormantContainer = homeImgContainer[2];
        disabledContainer = homeImgContainer[0];
        heroStatus = [false, false, true];
    } else if(heroStatus[2]){
        activeContainer = homeImgContainer[2];
        dormantContainer = homeImgContainer[0];
        disabledContainer = homeImgContainer[1];
        heroStatus = [true, false, false];
    }

    activeContainer.style.transform = "scale(1.02)";
    activeContainer.style.opacity = "0";
    activeContainer.style.top = "-50px";

    dormantContainer.style.transform = "scale(1)";
    dormantContainer.style.top = "0px";
    dormantContainer.querySelector(".home-img").style.opacity = "1";
    dormantContainer.querySelector(".card-shadow").style.opacity = "0";

    disabledContainer.style.opacity = "1";
    disabledContainer.querySelector(".home-img").style.opacity = "0.2";
    disabledContainer.querySelector(".card-shadow").style.opacity = "1";

    // MAKE INBETWEEN CHANGES
    setTimeout(() => {
        dormantContainer.style.zIndex = "4";
        setTimeout(() => {
            activeContainer.style.zIndex = "2";
            disabledContainer.style.zIndex = "3";
        }, 200);

        activeContainer.style.transition = "none";
        activeContainer.style.transform = "scale(0.88)";
        activeContainer.style.top = "48px";
        setTimeout(() => {
            disabledContainer.style.transition = "0.4s ease";
        }, 100);
    }, 500);
}, 4000);

function openMenu(){
    menuContainer.style.zIndex = "5";
    menuContainer.style.opacity = "1";
}
function closeMenu(){
    menuContainer.style.zIndex = "-2";
    menuContainer.style.opacity = "0";
}

document.querySelectorAll(".btn-serv").forEach(btn => {
    btn.addEventListener("mouseenter", () => {
        btn.style.backgroundColor = "white";
        btn.style.fontWeight = "400";
        btn.style.letterSpacing = "-.1px";
        btn.style.color = "hsl(145, 96%, 11%)";
        btn.querySelector("i").style.color = "hsl(145, 96%, 11%)";
    });
    btn.addEventListener("mouseleave", () => {
        btn.style.backgroundColor = "transparent";
        btn.style.fontWeight = "300";
        btn.style.letterSpacing = "0px";
        btn.style.color = "white";
        btn.querySelector("i").style.color = "white";
    });
});

document.querySelectorAll(".foot-social").forEach(wrapper => {
    wrapper.addEventListener("mouseenter", () => {
        wrapper.style.backgroundColor = "white";
        wrapper.querySelector(".foot-social-icon").style.color = "hsl(0, 0%, 10%)";
    });
    wrapper.addEventListener("mouseleave", () => {
        wrapper.style.backgroundColor = "transparent";
        wrapper.querySelector(".foot-social-icon").style.color = "white";
    });
});

document.querySelectorAll(".btn-work, .btn-foot").forEach(btn => {
    btn.addEventListener("mouseenter", () => {
        btn.querySelector("img").style.transform = "rotate(-45deg)";
    });
    btn.addEventListener("mouseleave", () => {
        btn.querySelector("img").style.transform = "rotate(0deg)";
    });
});

if(document.querySelector(".get-form")){
    document.querySelector(".get-form").addEventListener("submit", function(e) {
      e.preventDefault();
      const form = e.target;
      const data = new FormData(form);
      fetch(form.action, {
        method: form.method,
        body: data,
        headers: { 'Accept': 'application/json' }
      }).then(response => {
        if (response.ok) {
          console.log("OKAY");
          form.reset();
        } else {
          console.log("NOT OKAY");
        }
      });
    });
}

function resizeBars(){
    document.querySelectorAll(".bar-wrapper").forEach((wrapper, idx) => {
        wrapper.style.transition = "none";
        wrapper.style.height = "0px";

        setTimeout(() => {
            wrapper.style.transition = "1.5s ease";
            let barMax;
            if(window.innerWidth > 900){
                barMax = "400px";
            } else {
                barMax = "200px";
            }
            
            for(let i = 1; i <= barStats[idx]; i++){
                setTimeout(() => {
                    document.querySelectorAll(".bar-stat")[idx].innerHTML = i + '% <span class="bar-out">/ 100%</span>';
                }, 15 * i);
            }
            wrapper.style.height = "calc(0." + barStats[idx] + " *" + barMax + ")";
        }, 50);
    });
}
window.addEventListener("resize", () => {
    if(currentWidth != window.innerWidth){
        currentWidth = window.innerWidth;
        resizeBars();
    }
});;

const barJump = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        resizeBars();

        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.8,
});
document.querySelectorAll(".bar-flex").forEach(target => {
    barJump.observe(target);
});

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
          entry.target.style.position = "relative";
          entry.target.style.top = "0px";
          entry.target.style.opacity = "1";

        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.3,
});
document.querySelectorAll(".scroll-target").forEach(target => {
    observer.observe(target);
});