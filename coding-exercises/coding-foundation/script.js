function create(){
  let squares = document.getElementById("squares");
  let userInput = document.getElementById("user-input").value;
  squares.innerHTML="";

  if (userInput > 0){
    for (let i = 0; i < userInput; i++){
      squares.appendChild(document.createElement("div"));
    }
  }
}
