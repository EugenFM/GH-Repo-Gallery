// global variable to select the div with the class of ".overview"
const profileInfo = document.querySelector(".overview");

const username = "EugenFM";

// async function to fetch info from GitHub profile
const githubApiInfo = async function () {
    const response = await fetch(`https://api.github.com/users/${username}`);
    const data = await response.json();
    // console.log(data);
    displayInfo(data);
}
githubApiInfo();

// function to display the fetched user information
const displayInfo = async function (data) {
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
}

