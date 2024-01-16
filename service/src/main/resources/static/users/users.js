  // alert("Sayfa ilk tıkta çalışıyor")
    $(document).ready(function (){
      //  Sayfa yüklenidğinde

        function getAllUsers() {
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function (res,s) {
                if (this.readyState == 4 && this.status == 200) {

                    var resJson = JSON.parse(res.target.responseText);

                    if (resJson) {

                        console.log(res.Json)
                        $('#kullanicilar').DataTable({

                            data:resJson,
                            columns:[{
                                data:"username"},
                                {
                                    data:"adi"
                            },{
                                data:"soyadi"
                                }

                            ]

                        });

                    } else {
                        alert(res.target.responseText);

                    }
                }
            };
            xhttp.open("GET", "/kullanici/users", true);
            xhttp.send();
        }

        getAllUsers();
    });