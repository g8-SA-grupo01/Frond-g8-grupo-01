var endpoint = "http://129.151.119.175:8080/api/Message"
$(document).ready(function () {
    $("#guardar").click(function () {
        postMensaje()
    })
})

function postMensaje() {

    let mensaje = {

        messageText: $("#textMes").val(),
    }

    $.ajax({

        url: endpoint + "/save",
        type: 'POST',
        data: JSON.stringify(mensaje),
        dataType: 'json',
        contentType: "application/json",
        complete: function (data) {

            if (data.status == "201") {
                alert("Mensaje Guardado Con Exito")
            }
            else {
                alert("Fallo al Guardar el Mensaje")
            }

            limpiar()

        }

    })
}


function limpiar() {

    $("#textMes").val("")
}