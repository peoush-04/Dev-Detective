const searchInput = document.querySelector("#input");
const searchInputContainer = document.querySelector(".searchbar-container");
const error = document.querySelector(".error");
const profileContainer = document.querySelector(".profile-container");
const loadingScreen = document.querySelector(".loading-container");
const btnMode=document.querySelector(".btn-mode");
const textMode=document.querySelector(".mode-text");
const modeIcon=document.querySelector(".mode-icon");
//to access the root elements
const root = document.documentElement.style;

var mode="LIGHT";

// search field  
searchInputContainer.addEventListener("submit",(e)=>{
    
    e.preventDefault();
    error.classList.remove("active");
    loadingScreen.classList.remove("active");
    profileContainer.classList.remove("active");
    let input = searchInput.value ;
    if(input=="")
        return;
    loadingScreen.classList.add("active");
    fetchUserDetail(input);
})
searchInput.addEventListener("input",()=>{
    loadingScreen.classList.remove("active");
    error.classList.remove("active");
})

async function fetchUserDetail(input) {
    try{
        const response = await fetch(`https://api.github.com/users/${input}`);
        
        if(!response.ok)
            throw new Error("User not found");
        
        const data = await response.json();
        loadingScreen.classList.remove("active");
        renderUserInfo(data);
    }
    catch(err){
        loadingScreen.classList.remove("active");
        profileContainer.classList.remove("active");
        error.classList.add("active");
    }
}

function renderUserInfo(data){
    const avatar = document.querySelector("#avatar");
    const name = document.querySelector("#name");
    const user = document.querySelector("#user");
    const date = document.querySelector("#date");
    const bio = document.querySelector("#bio");
    const repos = document.querySelector("#repos");
    const followers = document.querySelector("#followers");
    const following = document.querySelector("#following");
    const location = document.querySelector("#location");
    const page = document.querySelector("#page");
    const twitter = document.querySelector("#twitter");
    const company = document.querySelector("#company");

    avatar.src = data?.avatar_url;
    name.textContent = data?.name;
    user.innerText = `@${data.login}`;
    user.href = data?.html_url;
    //for date
    let datestr = data?.created_at;
    let datesubstr = datestr.substr(0,10);
    date.textContent = `Joined ${datesubstr}`;

    bio.textContent = data.bio == null ? "This profile has no bio" : data.bio;

    repos.textContent = data.public_repos;
    followers.textContent = data.followers;
    following.textContent = data.following;

    location.textContent = data.location==null ? "Not available" : data.location;

    page.innerHTML = data.blog==""? "Not available" : data.blog;
    page.href = data.blog==null? "#" :data.blog;

    twitter.innerHTML = data.twitter_username == null ? "Not available" : data.twitter_username;
    twitter.href = data.twitter_username == null ? "#" : `https://twitter.com/${data.twitter_username}`;

    company.textContent = data.company==null ? "Not available" : data.company;

    // display the profile container
    profileContainer.classList.add("active");
}

//dark mode
btnMode.addEventListener("click",()=>{
    if(mode=="LIGHT")
        darkMode();
    else
        lightMode();
});

function darkMode(){
    mode="DARK";
    textMode.textContent="LIGHT";
    modeIcon.src = "./assets/images/sun-icon.svg";
    root.setProperty("--lm-bg", "#141D2F");
    root.setProperty("--lm-bg-content", "#1E2A47");
    root.setProperty("--webkitinput","#1E2A47");
    root.setProperty("--webkitinput-text","white");
    root.setProperty("--lm-text","white");
}

function lightMode(){
    mode="LIGHT";
    textMode.textContent="DARK";
    modeIcon.src = "./assets/images/moon-icon.svg";
    root.setProperty("--lm-bg", "#F6F8FF");
    root.setProperty("--lm-bg-content", "#FEFEFE");
    root.setProperty("--webkitinput","#FFFFFF");
    root.setProperty("--lm-text","#4b6a9b");
    root.setProperty("--webkitinput-text","#000");
}