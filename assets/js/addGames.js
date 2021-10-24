var endpoint = "http://129.151.119.175:8080/api/Game"
$(document).ready(function () {
    $("#guardar").click(function () {
        postJuego()
    })
})

function postJuego() {

    let juego = {

        developer: $("#devJueg").val(),
        year: $("#añoJueg").val(),
        name: $("#NomJueg").val(),
        description: $("#desJueg").val()
    }

    $.ajax({

        url: endpoint + "/save",
        type: 'POST',
        data: JSON.stringify(juego),
        dataType: 'json',
        contentType: "application/json",
        complete: function (data) {

            if (data.status == "201") {
                alert("Juego Guardado Con Exito")
            }
            else {
                alert("Fallo al Guardar el Juego")
            }

            limpiar()

        }

    })
}


function limpiar() {
    $("#idJueg").val(""),
        $("#devJueg").val(""),
        $("#añoJueg").val(""),
        $("#NomJueg").val(""),
        $("#desJueg").val("")
}