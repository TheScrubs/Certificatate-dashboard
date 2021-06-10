// css
require('../css/login.css')

// getting the url parameters
var url_string = window.location.href;
var url = new URL(url_string);
var error = url.searchParams.get("error");

// if there is an error in log in due to incorrect pass or username, we show the error message
if (error) {
  document.querySelector("#error").style = "";
}

// Theme-Selector
let theme = localStorage.getItem('theme')

if(theme == null){
    setTheme('light')
}else{
    setTheme(theme)
}

let themeDots = document.querySelectorAll(".theme-dot")

for (var i=0; themeDots.length > i; i++){
    themeDots[i].addEventListener("click", function(){
        let mode = this.dataset.mode
        console.log('Option clicked:', mode)
        setTheme(mode)
    })
}

function setTheme(mode){
    switch(mode){
        case 'light':
            document.querySelector('#theme-style').href = '../css/login.css'
            break;
        case 'blue':
            document.querySelector('#theme-style').href = '../css/blue.css'
            break;
        case 'green':
            document.querySelector('#theme-style').href = '../css/green.css'
            break;
        case 'purple':
            document.querySelector('#theme-style').href = '../css/purple.css'
            break;
        default:
            document.querySelector('#theme-style').href = '../css/login.css'
    }
    localStorage.setItem('theme', mode)
}
