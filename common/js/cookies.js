function setCookie(name, value, days) {
    var vl
    if (name == "churchname" || name == "themelist") {
        vl = value;
    } else {
        vl = document.getElementById(value).value;
        if (value == "autoChangeTheme") {
            vl = document.getElementById(value).checked;
        }
    }

    localStorage.setItem(name, vl)

}
function getCookie(name) {
    if (localStorage.getItem(name) == null) {
        if(name=="template"){
            return "lt-default";
        }else if(name=="lowerthird-timeout"){
            return 15000;    
        }else{
            return ""
        }
        
        
    } else {
        return localStorage.getItem(name);
    }

}