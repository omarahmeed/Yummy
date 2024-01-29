function closeNav() {
  $(".open-close-icon").addClass(" fa-bars");
  $(".open-close-icon").removeClass("   fa-2x fa-x");
  let boxWidth = $(".separate").outerWidth();
  $(".side-bar").animate(
    {
      left: -boxWidth,
    },
    500
  );
}

// function loading(){

// document.addEventListener("DOMContentLoaded", function () {
//     showLoadingScreen();
//     setTimeout(function () {
//         hideLoadingScreen();
//     }, 4000);
// });

// }

// loading();

function showLoadingScreen() {
  document.getElementById("loadingScreen").style.opacity = "1";
  document.getElementById("loadingScreen").style.visibility = "visible";
}

function hideLoadingScreen() {
  document.getElementById("loadingScreen").style.opacity = "0";
  document.getElementById("loadingScreen").style.visibility = "hidden";
}

let SearchContainer = document.getElementById("search");
let Home = document.getElementById("meals");
let details = document.getElementById("deatils");
let SectionMeals = document.getElementById("meals");

document.getElementById("searchterm").addEventListener("click", function () {

  // loading()
  console.log("Button clicked!");
  details.classList.replace("d-block", "d-none");
  Home.classList.replace("d-none", "d-block");
  document.getElementById("rowData").classList.replace("d-block", "d-none");

  SearchContainer.classList.remove("d-none");
  document.getElementById("meal").innerHTML = "";
});

let searchnameInput = document.getElementById("searchbyname");
searchnameInput.addEventListener("keyup", function (e) {
  let inputValue = e.target.value;
  getMeal(inputValue);
});

let SearchLetterInput = document.getElementById("searchbyletter");

SearchLetterInput.addEventListener("keyup", function (e) {
    
  let inputValue = e.target.value;
  if (inputValue == "") {
    getMeal("");
  } else {
    getMealByLetter(inputValue);
  }
});

$(".open-close-icon").click(function () {
  let sideBar = $(".side-bar");
  let insideBarlinks = $(".inside-bar a");

  if (sideBar.css("left") === "-240px") {
    $(".open-close-icon").removeClass(" fa-bars");
    $(".open-close-icon").addClass("   fa-2x fa-x");
    sideBar.animate({ left: 0 }, 500);
    insideBarlinks.animate({ padding: 0 }, 800);
  } else {
    $(".open-close-icon").removeClass("fa-2x fa-x");
    $(".open-close-icon").addClass("  fa-bars  ");
    sideBar.animate({ left: -240 }, 500);
    insideBarlinks.animate({ padding: 50 }, 500);
  }
});

async function getMeal(searchterm) {
    showLoadingScreen()
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchterm}`
  );
  let data = await response.json();
  if(data){
    hideLoadingScreen()
  }
  console.log(data.meals);
  DisplayMeal(data.meals);
}

function DisplayMeal(arr) {
  let sharebox = "";
  for (let i = 0; i < arr.length; i++) {
    sharebox += `
        <div class="col-md-3 mb-4 ">
            <div   onclick="getMealDetails (${arr[i].idMeal})
               
              " class="meal position-relative ">
                <img class="w-100 rounded-2 " src="${arr[i].strMealThumb}" alt="meals">
                <div class="meal-layer position-absolute d-flex align-items-center text-black p-2">
                    <h3>${arr[i].strMeal}</h3>
                </div>
            </div>
        </div>`;
  }

  document.getElementById("meal").innerHTML = sharebox;
}

async function getMealByLetter(searchterm) {
    showLoadingScreen()
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?f=${searchterm}`
  );
  let data = await response.json();
  console.log(data.meals);
  hideLoadingScreen()
  DisplayMeal(data.meals);
}
// -----------------------------------------------------------------------

document.getElementById("category").addEventListener("click", function () {
  console.log("Button clicked!");
  document.getElementById("rowData").classList.replace("d-block", "d-none");

  SearchContainer.classList.add("d-none");
  details.classList.replace("d-block", "d-none");
  Home.classList.replace("d-none", "d-block");
  GetCategory();
  closeNav();
});

async function GetCategory() {
    
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/categories.php`
  );

  let data = await response.json();
  console.log(data.categories);
 

  DisplayCategories(data.categories);
}

function DisplayCategories(arr) {
  let sharebox = "";
  for (let i = 0; i < arr.length; i++) {
    sharebox += `
        <div class="col-md-3 mb-4 ">
            <div class="meal switch position-relative " onclick="getCategoryMeals('${
              arr[i].strCategory
            }')">
            
           
                <img class="w-100 rounded-2 " src="${
                  arr[i].strCategoryThumb
                }" alt="meals">
                <div class="meal-layer position-absolute d-flex flex-column  align-items-center justify-content-center text-black p-2">
                    <h3 id="categoryname">${arr[i].strCategory}</h3>
                    <p class=" text-center ">${arr[i].strCategoryDescription
                      .split(" ")
                      .slice(0, 20)
                      .join(" ")}</p>
                </div>
            </div>
        </div>`;
  }

  document.getElementById("meal").innerHTML = sharebox;
}

async function getCategoryMeals(category) {
    showLoadingScreen
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
  );
  let data = await response.json();
  console.log(data.meals);
  if(data){
    hideLoadingScreen()
  }

  DisplayMeal(data.meals.slice(0, 20));
}

// --------------------------------------------------------------------------------

document.getElementById("area").addEventListener("click", function () {
  console.log("Button clicked");
  document.getElementById("rowData").classList.replace("d-block", "d-none");
  SearchContainer.classList.add("d-none");
  details.classList.replace("d-block", "d-none");
  Home.classList.replace("d-none", "d-block");
  getArea();
  closeNav();
});

async function getArea() {
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?a=list`
  );

  let data = await response.json();
  console.log(data.meals);
  displayArea(data.meals);
}

async function getMealByArea(area) {
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`
  );

  let data = await response.json();
  console.log(data.meals);
  DisplayMeal(data.meals);
}

function displayArea(arr) {
  let sharebox = "";

  for (let i = 0; i < arr.length; i++) {
    sharebox += `



        <div class="col-md-3">
                <div onclick="getMealByArea('${arr[i].strArea}')" class="rounded-2 text-center cursor-pointer">
                        <i class="fa-solid fa-house-laptop fa-4x" style="color:white;"></i>
                        <h3 style="color:white;">${arr[i].strArea}</h3>
                </div>
        </div>
        `;
  }

  document.getElementById("meal").innerHTML = sharebox;
}
// ------------------------------------------------------------------------------

document.getElementById("ingredients").addEventListener("click", function () {
  console.log("Button clicked");
  document.getElementById("rowData").classList.replace("d-block", "d-none");

  details.classList.replace("d-block", "d-none");
  Home.classList.replace("d-none", "d-block");
  SearchContainer.classList.add("d-none");

  GetIngredients();
  closeNav();
});

async function GetIngredients() {
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?i=list`
  );

  let data = await response.json();
  console.log(data.meals)

  displayIngredients(data.meals.slice(0, 20));
}

function displayIngredients(arr) {
  let sharebox = "";

  for (let i = 0; i < arr.length; i++) {
    sharebox += `

        <div class="col-md-3">
                <div onclick="getMealByIngredients('${
                  arr[i].strIngredient
                }')" class="rounded-2 text-center cursor-pointer">
                <i class="fa-solid fa-drumstick-bite fa-4x" style="color:white;"></i>
                        <h3 style="color: white;" >${arr[i].strIngredient}</h3>
                        <p style="color: white;" >${arr[i].strDescription
                          .split(" ")
                          .slice(0, 20)
                          .join(" ")}</p>
                </div>
        </div>
        `;
  }

  document.getElementById("meal").innerHTML = sharebox;
}

async function getMealByIngredients(ingred) {
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingred}`
  );
  let data = await response.json();
  console.log(data.meals);
  DisplayMeal(data.meals);
}

// document.getElementById('meal').addEventListener('click',function () {

//     Home.classList.replace('d-block', 'd-none');
//     details.classList.replace('d-none', 'd-block');

//   })

async function getMealDetails(id) {
  Home.classList.replace("d-block", "d-none");
  details.classList.replace("d-none", "d-block");

  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
  );

  let data = await response.json();
  console.log(data.meals);
  DisplayDetails(data.meals[0]);
}

function DisplayDetails(details) {
  let ingredients = ``;

  for (let i = 1; i <= 20; i++) {
    if (details[`strIngredient${i}`]) {
      ingredients += `<li class="alert alert-info m-2 p-1">${
        details[`strMeasure${i}`]
      } ${details[`strIngredient${i}`]}</li>`;
    }
  }

  let tags = details.strTags?.split(",");

  if (!tags) tags = [];

  let displayTags = "";
  for (let i = 0; i < tags.length; i++) {
    displayTags += `
        <li class="alert alert-danger m-2 p-1">${tags[i]}</li>`;
  }

  let box = "";
  box += `
    
    
    <div class="col-md-4 mt-5">
            <img
              class="w-100 rounded-3"
              src="${details.strMealThumb}"
              alt=""
            />
            <h3 class="text-white">${details.strMeal}</h3>
          </div>
          <div class="col-md-8 mt-5">
            <h2 style="font-size: 32px" class="text-white">Instructions</h2>
            <p class="text-white">
                ${details.strInstructions}     
            </p>
            <h3 class="text-white">Area: <span>${details.strArea}</span></h3>
            <h3 class="text-white">category: <span>${details.strCategory}</span></h3>
            <h3 class="text-white">Recipes :</h3>

            <ul class="list-unstyled d-flex g-3 flex-wrap">
              ${ingredients}
            </ul>

            <h3 class="text-white">tages :</h3>

            <ul class="list-unstyled d-flex g-3 flex-wrap">
            ${displayTags}
            </ul>
              <a target="_blank" href="${details.strSource}" class="btn btn-success">Source</a>
                <a target="_blank" href="${details.strYoutube}" class="btn btn-danger">Youtube</a>
          </div>
    
    
    
    
    
    `;

  document.getElementById("dispalydetalils").innerHTML = box;
}

document.getElementById("formus").addEventListener("click", function () {
  console.log("clicked");
  document.getElementById("meals").classList.replace("d-block", "d-none");
  document.getElementById("rowData").classList.replace("d-none", "d-block");
  // document.getElementById('wgpaaat').classList.add("overflow-hidden")
});

submitBtn = document.getElementById("submitBtn");

let nameAccesed = false;
let emailAccesed = false;
let numberAccesed = false;
let ageAccesed = false;
let passwordAccesed = false;
let repasswordAccesed = false;

document.getElementById("nameInput").addEventListener("focus", () => {
  nameAccesed = true;
});

document.getElementById("emailInput").addEventListener("focus", () => {
  emailAccesed = true;
});

document.getElementById("phoneInput").addEventListener("focus", () => {
  numberAccesed = true;
});

document.getElementById("ageInput").addEventListener("focus", () => {
  ageAccesed = true;
});

document.getElementById("passwordInput").addEventListener("focus", () => {
  passwordAccesed = true;
});

document.getElementById("repasswordInput").addEventListener("focus", () => {
  repasswordAccesed = true;
});

function Validation() {
  if (nameAccesed) {
    if (nameValidation()) {
      document
        .getElementById("nameError")
        .classList.replace("d-block", "d-none");
    } else {
      document
        .getElementById("nameError")
        .classList.replace("d-none", "d-block");
    }
  }
  if (emailAccesed) {
    if (emailValidation()) {
      document
        .getElementById("emailError")
        .classList.replace("d-block", "d-none");
    } else {
      document
        .getElementById("emailError")
        .classList.replace("d-none", "d-block");
    }
  }

  if (numberAccesed) {
    if (phoneValidation()) {
      document
        .getElementById("phoneError")
        .classList.replace("d-block", "d-none");
    } else {
      document
        .getElementById("phoneError")
        .classList.replace("d-none", "d-block");
    }
  }

  if (ageAccesed) {
    if (ageValidation()) {
      document
        .getElementById("ageError")
        .classList.replace("d-block", "d-none");
    } else {
      document
        .getElementById("ageError")
        .classList.replace("d-none", "d-block");
    }
  }

  if (passwordAccesed) {
    if (passwordValidation()) {
      document
        .getElementById("passwordError")
        .classList.replace("d-block", "d-none");
    } else {
      document
        .getElementById("passwordError")
        .classList.replace("d-none", "d-block");
    }
  }
  if (repasswordAccesed) {
    if (repasswordValidation()) {
      document
        .getElementById("rePasswordError")
        .classList.replace("d-block", "d-none");
    } else {
      document
        .getElementById("rePasswordError")
        .classList.replace("d-none", "d-block");
    }
  }

  function nameValidation() {
    return /^[a-zA-Z ]+$/.test(document.getElementById("nameInput").value);
  }

  function emailValidation() {
    return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      document.getElementById("emailInput").value
    );
  }

  function phoneValidation() {
    return /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(
      document.getElementById("phoneInput").value
    );
  }

  function ageValidation() {
    return /^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test(
      document.getElementById("ageInput").value
    );
  }

  function passwordValidation() {
    return /^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/.test(
      document.getElementById("passwordInput").value
    );
  }

  function repasswordValidation() {
    return (
      document.getElementById("repasswordInput").value ==
      document.getElementById("passwordInput").value
    );
  }

  if (
    nameValidation() &&
    emailValidation() &&
    phoneValidation() &&
    ageValidation() &&
    passwordValidation() &&
    repasswordValidation()
  ) {
    submitBtn.removeAttribute("disabled");
  } else {
    submitBtn.setAttribute("disabled", true);
  }
}
document.addEventListener("DOMContentLoaded",function(){


getMeal("")

})
