async function gitUserData (userName) {
    let response = await fetch(`https://api.github.com/users/${userName}`)
    return  response.json()
}

function userDate (userName) {
    gitUserData(userName).then(userData => {
        let data = `<div class="userData">
                        <img src="${userData.avatar_url}">
                        <h3>Name: ${userData.name?? "Nome não encontrada"}</h3>
                        <h3>Login: ${userData.login?? "Login não encontrada"}</h3>
                        <h3>Bio: ${userData.bio?? "Bio não encontrada"}</h3>
                        <h3>Followers: ${userData.followers?? "Bio não encontrada"}</h3>
                        <h3>Following: ${userData.following?? "Bio não encontrada"}</h3>
                    </div>`
        document.querySelector('.userData').innerHTML = `${data}`
    })
}

async function gitEvents(userName) {
    let response = await fetch(`https://api.github.com/users/${userName}/events?per_page=10`)
    return  response.json()
}

function catchEvents(userName) {
    gitEvents(userName).then(eventData => {
     
     let eventName = eventData.filter(event => {
          return event.type === 'CreateEvent' || event.type === 'PushEvent'
        })

     let nameCommits = eventName.filter(element => {
            return element.payload.commits
       }) 

        let name = ""
       nameCommits.forEach(element => {
            name += `<li>>${element.repo.name} <span>${element.payload.commits[0].message}</span></li>`

       });    

       document.querySelector(".userData").innerHTML += `<div class='event'>
                                                           <h3>Eventos</h3>
                                                           <ul>${name}</ul>   
                                                         </div>`
    });     
   
}

async function repos(userName){ 
    const response = await fetch(`https://api.github.com/users/${userName}/repos`)
    return await response.json()
}

function getUserRepos(userName) {
    repos(userName).then(reposData => 
        { 
        let repositoriesItens = ""

        reposData.forEach(repo => {
            console.log(repo)
            repositoriesItens += `<li><a href="${repo.html_url}" target="_blank" >${repo.name} </a> <span> <h3>🍴 ${repo.forks} </h3> <h3>⭐ ${repo.stargazers_count}</h3> 
            <h3>👀 ${repo.watchers}</h3> <h3> 👨🏽‍💻 ${repo.language}</h3> </span></li>`
        });

        document.querySelector('.userData').innerHTML += `<div class="repositories">
                                                                <h3>Repositórios</h3>
                                                                <ul>${repositoriesItens}</ul>
                                                              </div>`
    })
}

    

document.getElementById('btn').addEventListener('click', () => {
   const userName = document.getElementById('user').value
   userDate (userName)
   catchEvents(userName)
   getUserRepos(userName)
   
})
