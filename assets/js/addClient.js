var endpoint = "http://129.151.119.175:8080/api/Client"
$(document).ready(function () {
    $("#guardar").click(function () {
        postCliente()
    })
})

function postCliente() {

    let cliente = {

        name: $("#nomCli").val(),
        email: $("#EmailCli").val(),
        password: $("#passClient").val(),
        age: $("#edadClient").val()
    }

    $.ajax({

        url: endpoint + "/save",
        type: 'POST',
        data: JSON.stringify(cliente),
        dataType: 'json',
        contentType: "application/json",
        complete: function (data) {

            if (data.status == "201") {
                alert("Cliente Guardado Con Exito")
            }
            else {
                alert("Fallo al Guardar el Cliente")
            }

            limpiar()

        }

    })
}


function limpiar() {

    $("#nomCli").val(""),
        $("#EmailCli").val(""),
        $("#passClient").val(""),
        $("#edadClient").val("")
}