var endpoint = "http://129.151.119.175:8080/api/Admin"
$(document).ready(function () {
    $("#guardar").click(function () {
        postAdministrador()
    })
})

function postAdministrador() {

    let administrador = {

        name: $("#nameAdm").val(),
        email: $("#emailAdm").val(),
        password: $("#passAdm").val()
    }

    $.ajax({

        url: endpoint + "/save",
        type: 'POST',
        data: JSON.stringify(administrador),
        dataType: 'json',
        contentType: "application/json",
        complete: function (data) {

            if (data.status == "201") {
                alert("Administrador Guardado Con Exito")
            }
            else {
                alert("Fallo al Guardar el Administrador")
            }

            limpiar()

        }

    })
}


function limpiar() {

    $("#nameAdm").val(""),
        $("#emailAdm").val(""),
        $("#passAdm").val("")
}