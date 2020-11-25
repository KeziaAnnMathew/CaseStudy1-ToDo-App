//** password visibility
var count=0;
function showpsw(el){
    let password=document.getElementById("password");
	if(password.type === "password"){
		password.type ="text";
		el.className="fa fa-eye-slash";
	}
	else{
		password.type= "password";
		el.className="fa fa-eye";
	}
}

//** login validation without callback

///// no onclick required in HTML  error: event to null object in Home.html

// let login=document.getElementById("login");
// login.addEventListener('click',()=>{
//     let card=document.querySelector(".mymar");
//     let form=document.querySelector("#form-main");
//     let errDiv=document.createElement("div");
// 	errDiv.className="alert alert-danger";
//     let username=document.getElementById("username").value;
//     if(username != "admin" || password.value != "12345"){
//         errDiv.appendChild(document.createTextNode("Invalid Login"));
//         card.insertBefore(errDiv,form);
//         setTimeout(clearError,2000);
//     }
//     else{
//         window.location.replace("Home.html");
//     }
// })

//** login validation with callback function
function loginfn(callback){
    let card=document.querySelector(".mymar");
    let form=document.querySelector("#form-main");
    let errDiv=document.createElement("div");
	errDiv.className="alert alert-danger";
    let username=document.getElementById("username").value;
    if(username != "admin" || password.value != "12345"){
        errDiv.appendChild(document.createTextNode("Invalid Login"));
        card.insertBefore(errDiv,form);
        setTimeout(clearError,2000);
    }
    else{
        callback("Home.html");
    }

}
//**clear the error
function clearError(){
    document.querySelector(".alert").remove();
}

//** redirect to any page without going back
function redirect(page){
    window.location.replace(page);
}

//**logout redirection
function logoutfn(callback){
    callback("index.html");
}

//** To do List ajax

function displayLists(){
    var xhttp =new XMLHttpRequest();
    xhttp.onreadystatechange =function (){
    if(this.readyState==4 && this.status == 200){
        var response = JSON.parse(this.responseText);
        var output ="";
        for(var i=0;i<response.length;i++){
            let todo=document.querySelector(".todo");
            todo.innerText="ToDo List";
            if(response[i].completed==true){
                output += "<li class=\"item\"> <input id=\"disable\" type=\"checkbox\" name=\"check\" disabled checked>"+ response[i].title+ "</li>";
            }
            else{
                output += "<li class=\"item\"> <input type=\"checkbox\" name=\"check\">"+ response[i].title+ "</li>";
            } 
        }
        document.getElementById("contents").innerHTML = output;
        // call without promise
        // document.getElementById("contents").addEventListener('click',countCheck); 

        // promise
        p.then(function(msg){
            swal("Congrats!", msg , "success");
        })
        
    }
    }
xhttp.open("GET","https://jsonplaceholder.typicode.com/todos",true);
xhttp.send();
}

// 5 completed todos using promise
let p = new Promise(function(resolve){
    document.getElementById("contents").addEventListener('click',function(e){
    let child=e.target;
    if(child.tagName == "INPUT"){
        if(child.checked == true){
            count=count+1;
            if(count==5){
                resolve('5 Tasks have been Successfully Completed');
            }   
        }
        else{
            count--;
        }
    }
    });

})
// 5 completed todos without promise
// function countCheck(e){
//     let child=e.target;
//     console.log(child.checked)
//     if(child.tagName == "INPUT"){
//         if(child.checked == true){
//             count=count+1;
//             console.log(count);
//             if(count==5){
//                 alert("Congrats. 5 Tasks have been Successfully Completed");
//                 count=0;
//             }   
//         }
//         else
//         {
//             count--;
//             console.log(count);
//         }   
//     }
// }