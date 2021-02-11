let developerName = "Bunmi Tamilore" 
let age   = 23  
let isDisabled = false 
let skills = ["HTML" , "CSS" , "JS" , "React"] 

let selectOne = e => document.querySelector(e) 
let selectAll = e => document.querySelectorAll(e) 
let createElement = e => document.createElement(e) 

let app = selectOne("#app")  

let appHeading = createElement("h1") 
let message = `Meet ${developerName} who is ${age} and has these skills ${skills.join(",")}`

appHeading.textContent =  message
app.append(appHeading)

// Handling Click event on the button 
let errorMessages  = {
    "userName" : "Username is necessary to login" , 
    "email" : "Please , provide a valid email" , 
    "password" : "The current password is empty or too weak"
}

let buttons = Array.from(selectAll(".button")) 

buttons.map((button) => {
    button.addEventListener("click" , e => { 
        let {target , type} = e 
        e.preventDefault()
        switch(target.id){
            case "user-login" :  
               let message = target.textContent
               target.textContent = message.toLowerCase() == "login" ? "Logout" : "Login" 
               break ; 
            case "submit-user-data" : 
                let userInputs = Array.from(selectAll(".user-data")) 
                if (userInputs.every(input => input.value !== "")){
                    target.textContent = "Submitted"
                }else {
                    userInputs.map((userInput) => {
                        if (userInput.value === ""){ 
                            let {parentNode , nextElementSibling}  = userInput
                            userInput.classList.add("border-error-color")
                            let errorElement = createElement("p") 
                            errorElement.textContent = errorMessages[`${userInput.id}`]
                            parentNode.insertBefore(errorElement , nextElementSibling)
                        }
                     })
                }
            default : 
              return false  
        }
    })
})
 


