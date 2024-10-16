const searchInput = document.querySelector("#input");
const searchInputContainer = document.querySelector(".searchbar-container");
const error = document.querySelector(".error");
const profileContainer = document.querySelector(".profile-container");
const loading = document.querySelector(".loading");

searchInputContainer.addEventListener("submit",(e)=>{
    // profileContainer.classList.remove
    e.preventDefault();
    let input = searchInput.value ;
    if(input=="")
        return;
    loading.classList.add("active");
    fetchUserDetail(input);
})
searchInput.addEventListener("input",()=>{
    error.classList.remove("active");
})

async function fetchUserDetail(input) {
    try{
        const response = await fetch(`https://api.github.com/users/${input}`);
        
        if(!response.ok)
            throw new Error("User not found");
        
        const data = await response.json();
        loading.classList.remove("active");
        renderUserInfo(data);
    }
    catch(err){
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

    profileContainer.classList.add("active");
}