// Global Variables

// global variable to select the div with the class of ".overview"
const profileInfo = document.querySelector(".overview");
// global variable for the repo list
const repoList = document.querySelector(".repo-list");
// GitHub username
const username = "EugenFM";
// variable that selects the section with a class of "repos"
const reposSection = document.querySelector(".repos");
// selects the section with a class of "repo-data"
const repoData = document.querySelector(".repo-data");
// targets the back to the repos button
const backButton = document.querySelector(".view-repos")
// selects the input with the "Search by name" placeholder
const filterInput = document.querySelector(".filter-repos");
 


// async function to fetch info from GitHub profile
const githubApiInfo = async function () {
    const response = await fetch(`https://api.github.com/users/${username}`);
    const data = await response.json();
    // console.log(data);
    displayUserInfo(data);
};
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
};


// async function to fetch the GitHub repos
const fetchRepos = async function () {
    filterInput.classList.remove("hide");
    const response = await fetch(`https://api.github.com/users/${username}/repos?sort=created&?per_page=100`);
    const repos = await response.json();
    // console.log(repos)
    displayRepos(repos);
};


// function to display info about each repo
const displayRepos = function (repos) {
    for (const repo of repos) {
        let listItem = document.createElement("li");
        listItem.classList.add("repo");
        listItem.innerHTML = `<h3>${repo.name}</h3>`;
        repoList.append(listItem);
    }
};


repoList.addEventListener("click", function (e) {
    if (e.target.matches("h3")) {
        const repoName = e.target.innerText;
        getRepoInfo(repoName);
    }
});



// function to get specific repo info
const getRepoInfo = async function (repoName) {
    const res = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
    const repoInfo = await res.json();
    console.log(repoInfo);

    const fetchLanguages = await fetch(repoInfo.languages_url);
    const languageData = await fetchLanguages.json();
    // console.log(languageData);

    // empty array of languages
    const languages = [];
    for (let language in languageData) {
        languages.push(language);
        console.log(languages);
    }

    displayRepoInfo(repoInfo, languages)
}

// async function to display specific repo info
const displayRepoInfo = async function (repoInfo, languages) {
    repoData.innerHTML = "";
    const newRepoDiv = document.createElement("div");
    newRepoDiv.innerHTML = `<h3>Name: ${repoInfo.name}</h3>
        <p>Description: ${repoInfo.description}</p>
        <p>Default Branch: ${repoInfo.default_branch}</p>
        <p>Languages: ${languages.join(", ")}</p>

        <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>`;
    repoData.append(newRepoDiv);
    repoData.classList.remove("hide");
    reposSection.classList.add("hide");
    backButton.classList.remove("hide");
    }

    // event listener for the back to the repos button
    backButton.addEventListener("click", function () {
        reposSection.classList.remove("hide");
        repoData.classList.add("hide");
        backButton.classList.add("hide");

    })

    // Add an input event to the search box
    filterInput.addEventListener("input", function (e) {
        const inputText = e.target.value;
        // console.log(inputText);
        const repos = document.querySelectorAll(".repo");
        const lowerCaseInput = inputText.toLowerCase();

        // loop through the repos to match with the search text
        for (const repo of repos) {
            const lowerCaseRepoText = repo.innerText.toLowerCase();
            if (lowerCaseRepoText.includes(lowerCaseInput)) {
                repo.classList.remove("hide");
            } else {
                repo.classList.add("hide");
            }
        }
    });