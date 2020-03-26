const emails = {};                                                         

function SearchPhotos(){
    let clientId = "g_EmLyty4c1G5wxRV0-hURnJ6SI7B5GjoiaaWWBtT00"
    let query = document.getElementById("search").value;
    let url = `https://api.unsplash.com/search/photos?query=${query}&client_id=${clientId}`;

    let assignBtn = document.getElementById("disabled");
    if(!initialized){
        assignBtn.id = "assign-btn";
        initialized = true;
    };
    $('#assign-btn').prop("disabled", false);

    document.getElementById("search").value = "";

    fetch(url)
        .then(function(data){
            return data.json();
        })
        .then(function(data){
            let result = `<img src="${data.results[0].urls.regular}" alt="${query} img" id="image">`;
            $("#result").html(result);
        })
}


// Add email to emails object or if email already exists just add image.
function AssignEmail(){
    const email = document.getElementById("assign").value;
    const img = new Image();
    img.src = document.getElementById("image").getAttribute("src");
    document.getElementById("assign").value = "";
    if (emails.hasOwnProperty(`${email}`)){ 
        emails[`${email}`].imgs.push(img);
    }else{
        emails[`${email}`] = {email: email, imgs: [img]};
        UpdateSideNav(email);       
    }
}


// Create an email and append it to the sidenav
function UpdateSideNav(email){
    let listItem = document.createElement("LI");
    listItem.classList.add("pushy-link")
    listItem.classList.add("sidenav-link")
    listItem.innerHTML = `<a>${emails[`${email}`].email}</a>`;
    listItem.addEventListener("click", SelectEmail);
    const ul = document.getElementById("sidenav");
    ul.appendChild(listItem);
}

// Set clicked link to active and remove active class from other links
function SelectEmail(e){
    const link = e.target;
    const links = (document.querySelectorAll(".sidenav-link a"));
    for (let i=0; i < links.length;i++){
        links[i].classList.remove("active");
    }
    link.classList.add("active");

    ShowCarousel(link);
}

function ShowCarousel(link){
    const carousel = document.querySelector(".carousel");
    const email = link.innerHTML;
    const imgsArray = emails[`${email}`].imgs;
    const label = document.querySelector(".carouselSec h1");

    // Clear current carousel.
    carousel.innerHTML = "";
    carousel.classList = "carousel";

    // Sets label to email adress.
    label.innerHTML = email;
    
    // Loops through images and adds them to a div element then add that div to the carousel.
    for(let i=0; i<imgsArray.length;i++){
        let container = document.createElement("DIV");
        container.classList.add("img-container");
        container.appendChild(imgsArray[i]);
        carousel.appendChild(container);
    }
    
    $('.carousel').slick({
        dots: true,
        arrows: true,
        infinite: true,
        speed: 500,
        fade: true,
        cssEase: 'linear'
      });
}

