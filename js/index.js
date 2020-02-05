const URL_M = 'http://localhost:3000/monsters';



document.addEventListener("DOMContentLoaded", function () {
    const monsterContainer = document.querySelector('#monster-container')
    
    let pageCount = 1
    function fetchAndRenderMonster() {
        fetch(URL_M + `/?_limit=20&_page=${pageCount}`)
            .then(resp => resp.json())
             .then(renderMonsters)
    }
    
    function renderMonsters(monsters) {
        monsters.forEach(monster => { 
            showMonster(monster)
        })

    }

    function showMonster(monster) {
    

        const monsterCard = document.createElement('div')
        const monsterName = document.createElement('h2')
        const monsterAge = document.createElement('h4')
        const monsterBio = document.createElement('p')

        monsterName.innerText = monster.name 
        monsterAge.innerText = monster.age 
        monsterBio.innerText = monster.description

        monsterCard.append(monsterName, monsterAge, monsterBio)
        monsterContainer.append(monsterCard)

    }

    function createForm() {
        const form = document.createElement('form')
        form.id = "monster-form"

        const inputName = document.createElement('input')
        inputName.id = "name"
        inputName.placeholder = 'name...'

        const inputAge = document.createElement('input')
        inputAge.id = "age"
        inputAge.placeholder = 'age...'
        
        const inputBio = document.createElement('input')
        inputBio.id = "description"
        inputBio.placeholder = 'description...'

        const btnSubmit = document.createElement('button')
        btnSubmit.innerText = "Create"

        const monsterCreate = document.querySelector('#create-monster')

        form.append(inputName, inputAge, inputBio, btnSubmit)
        monsterCreate.appendChild(form)

        //////ON FORMMMMMMMM

        form.addEventListener("submit", function (e) { 
            e.preventDefault()
            debugger
            const name = document.querySelector('#name').value
            const age = document.querySelector('#age').value
            const description = document.querySelector('#description').value
           
            let bodyOfMonster = {
                name: name,
                age: age,
                description: description
            }

            createNewMonster(bodyOfMonster)
                .then(showMonster)
           

        })


        function createNewMonster(monster) { 
            const configurationObject = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(monster)
            }

            return fetch(URL_M, configurationObject)
            .then(resp => resp.json())
        }


    }
    
    const forwardBtn = document.querySelector("#forward")
    forwardBtn.addEventListener('click', function (e) { 
        monsterContainer.innerHTML = ''
        ++pageCount
        fetchAndRenderMonster() 

    })
    







    createForm()
    fetchAndRenderMonster() 
 })
