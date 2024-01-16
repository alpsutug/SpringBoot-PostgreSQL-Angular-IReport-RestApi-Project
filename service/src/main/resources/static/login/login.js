function ajaxCall(url, gotoUrl) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function (res,s) {
        if (this.readyState == 4 && this.status == 200) {
            console.log(res.target.responseText);
            var resJson = JSON.parse(res.target.responseText);
            console.log(res.target.responseText);
            if (resJson.success) { // if (resJson.success===true)
                console.log(gotoUrl + " yönlendiriliyor...");
                window.location.href = gotoUrl;
            } else {
                document.getElementById("loginError").innerHTML = resJson.hata;
            }
        }
    };
    xhttp.open("GET", url, true);
    xhttp.send();
}


function giris() {
    console.log("Giriş yap tıklandı!!");
    var userName = document.getElementById("userName").value;
    var password = document.getElementById("password").value;
    var loginUrl = "http://localhost:8080/kullanici/login?userName=" + userName + "&password=" + password;
    ajaxCall(loginUrl, "/main/index.html");
}