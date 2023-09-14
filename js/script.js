// global variable to select the div with the class of ".overview"
const profileInfo = document.querySelector(".overview");
// global variable for the repo list
const repoList = document.querySelector(".repo-list");
// GitHub username
const username = "EugenFM";


// async function to fetch info from GitHub profile
const githubApiInfo = async function () {
    const response = await fetch(`https://api.github.com/users/${username}`);
    const data = await response.json();
    // console.log(data);
    displayUserInfo(data);
}
githubApiInfo();


// function to display the fetched user information
const displayUserInfo = async function (data) {
    let newDiv = document.createElement("div");
    newDiv.classList.add("user-info");
    newDiv.innerHTML =
        `<figure>  
         <img alt="user avatar" src=${data.avatar_url} />
    </figure>
    <div>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Bio:</strong> ${data.bio}</p>
        <p><strong>Location:</strong> ${data.location}</p>
        <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
    </div>`;

    profileInfo.append(newDiv);
    fetchRepos();
}


// async function to fetch the GitHub repos
const fetchRepos = async function () {
    const response = await fetch(`https://api.github.com/users/${username}/repos?sort=created&?per_page=100`);
    const repos = await response.json();
    // console.log(repos)
    displayRepoInfo(repos);
}


// function to display info about each repo
const displayRepoInfo = function (repos) {
    for (const repo of repos) {
        let listItem = document.createElement("li");
        listItem.classList.add("repo");
        listItem.innerHTML = `<h3>${repo.name}</h3>`;
        repoList.append(listItem);
    }
}
