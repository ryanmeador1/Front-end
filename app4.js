// Welcome!
console.log("Jesus Loves you!"); // This is how I test to make sure the JS file correctly attached 

alert("Welcome! please enter your personal info first then the to do list. Play around with the API before or after :)"); // Lets user know the guidlines for how web page works. 

let toDoList = []; // declares the array that will be used for the to do list.
let access = false; 

console.log(toDoList); 

function userProfile(name,email,favColor) { // Closure to display user input. 
 
return function innerprofile(){ 
    return`
    Name: ${name} 
    Email: ${email} 
    Favorite color: ${favColor}`
};
}; 
const list = document.getElementById('apiList');
async function getUser() {
    list.innerHTML =`<p class="fun">Please wait while data loads :)</p>`;
   try {
        list.innerHTML =``; 
        const data = await fetch("https://jsonplaceholder.typicode.com/users"); 
        const userData = await data.json();
        console.log(userData); 
        alert("Please wait while data loads :)");  
        userData.forEach(userData => {
            list.innerHTML +=`
            <div class="apiCard"> 
            <p>Name: ${userData.name}</p>
            <p>City: ${userData.address.city}</p>
            <p>Company: ${userData.company.name}</p>
            <strong><p class="hide">Email: ${userData.email}</p></strong>
            <button class="expand">Contact Information</button>
            </div>`;  
        });
        document.querySelectorAll(".expand").forEach(button => {
            button.addEventListener("click", function(){
            this.closest(".apiCard").querySelector(".hide").classList.remove("hide");
            this.closest(".apiCard").querySelector(".expand").classList.add("hide"); 
            }); 
        });
   } catch (error) {
    alert(`Sorry there was an error: ${error}`); 
    list.innerHTML=`Sorry there was an error: ${error}`; 
           
   };  
}; 
 
const submit = document.getElementById("submit").addEventListener("click", function(event){ // Listner for submit Profile button. 
    event.preventDefault(); // Ensures users inputs stage on webpage without refreshing. 

    // Declares values from the html form.  
    const Name = document.getElementById("name").value; 
    const Email = document.getElementById("email").value; 
    const FavorColor = document.getElementById("favoriteColor").value; 

   try { // Form vailidation
    
    if(!Name || !Email || !FavorColor) { // Ensures user enters all required data. 
     
    throw new Error("Please ensure that all personal fields are complete"); 
    
    } 

    if(!Email.includes("@")) { // Ensures email has an @ symbol in it. 
    
    throw new Error("Please ensure that your email has an @ key in it."); 
    } 
    } 
    catch(error) { // this helps gracefully handle errors and keeps the user informed. 
    alert(error);  
    return; 
    }; 
 
    const user = userProfile(Name,Email,FavorColor); // Takes the values and sends them to the closure. 

    document.getElementById("text").innerText = user(); // Displays users personal info input. 

    access = true; // See comment on line 77

    alert('Hello ' + Name + ' your profile has been added :)') // Friendly message after submition. 
}); 
const submit2 = document.getElementById("submit2").addEventListener("click", function(event){ // Listner for to do list form. 
    event.preventDefault(); // Ensures users inputs stage on webpage without refreshing. 

    // Declares values from the html form.  
    const Task = document.getElementById("task").value; 
    const Type = document.getElementById("taskType").value; 
    const Date = document.getElementById("dueDate").value; 

     try { // Form vailidation
    
    if(!Task || !Type || !Date) {
     
    throw new Error("Please ensure that all to do list fields are complete."); 
    
    } 

    if(!access){ // If first form is not complete then user won't be able to submit a to do list. As was mentioned in the opening message. 
        throw new Error("Please complete your user profile first.");
        
    }
    } 
    catch(error) { // Displays error message. 
    alert(error);  
    return; 
    }; 
    
   console.log(Task + " " + Type + " " + Date); // Displayed last to do list entry. 

    toDoList.push({Task: Task, Type: Type, Date: Date}); // Places the to do list inputs into an array of objects. 

    console.log(toDoList); // Displayed entire to do list in console. 

    toDoList.sort(function(a,b){ // Used sort to order the dates of the tasks. Followed the logic from the W3 schools example. 
    A = a.Date
    B = b.Date
    if (A < B) {return -1}
    if (A > B) {return 1}
    return 0  

    }); 

    const personalList = toDoList.filter(toDoList => toDoList.Type.includes("Personal")); // Creates a new array that only has Personal tasks. 
    const professionalList = toDoList.filter(toDoList => toDoList.Type.includes("Professional")); // Creates a new array that only has Professional tasks.

    // Displays filter results in console. 
    console.log(personalList); 
    console.log(professionalList); 

    let text = ""; 

    toDoList.forEach(display) 

    function display(value){ // Takes each part of the array to place it in a variable to be displayed. 

    text += " | Task: " + value.Task + " Type: " + value.Type + " Due date: " + value.Date + " | ";  

    }; 


    document.getElementById("list").innerText = text; // Displays user input for the to do list on the webpage. 

document.getElementById("perBtn").addEventListener("click",function(event){ // Listener for Peronal button. 
// follows the same logic as the display funtion this is just specific to the personal display. 
event.preventDefault(); 

 let textPer = ""; 
    personalList.forEach(display) 
    function display(value){ 
    textPer += " | Task: " + value.Task + " Type: " + value.Type + " Due date: " + value.Date + " | ";  
    }; 
    document.getElementById("list").innerText = textPer; 
}); 

document.getElementById("proBtn").addEventListener("click",function(event){ // Listener for professional button. 
// follows the same logic as the display funtion this is just specific to the professional display. 

event.preventDefault(); 

 let textPro = ""; 

    professionalList.forEach(display) 

    function display(value){

    textPro += " | Task: " + value.Task + " Type: " + value.Type + " Due date: " + value.Date + " | ";  

    }; 

    document.getElementById("list").innerText = textPro; 
}); 

document.getElementById("reset").addEventListener("click", function(event){ // This allows the user to return to the original display. 
    event.preventDefault(); 

     let textPer = ""; 

    toDoList.forEach(display) 

    function display(value){

    textPer += " | Task: " + value.Task + " Type: " + value.Type + " Due date: " + value.Date + " | ";  

    }; 

    document.getElementById("list").innerText = textPer; 

}); 

const jasonList = JSON.stringify(toDoList); // Converts to do list to string
console.log(jasonList); 
const parseList = JSON.parse(jasonList); // Converts the string back to an array of object
console.log(parseList); 
}); 



document.getElementById('API').addEventListener('click', ()=>{
// alert('It works'); 
getUser(); 
document.getElementById("API").classList.add("hide");
document.getElementById("reset").classList.remove("hide"); 

});