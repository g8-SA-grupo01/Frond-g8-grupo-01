var endpoint = "http://129.151.119.175:8080/api/Reservation"
$(document).ready(function () {
    $("#guardar").click(function () {
        postReservacion()
    })
})

function postReservacion() {

    let reservacion = {

        startDate: $("#iniRes").val(),
        devolutionDate: $("#entRes").val(),
        status: $("#estRes").val()
    }

    $.ajax({

        url: endpoint + "/save",
        type: 'POST',
        data: JSON.stringify(reservacion),
        dataType: 'json',
        contentType: "application/json",
        complete: function (data) {

            if (data.status == "201") {
                alert("Reservacion Creada Con Exito")
            }
            else {
                alert("Fallo al Crear la Reserva")
            }

            limpiar()

        }

    })
}


function limpiar() {
    $("#iniRes").val(""),
        $("#entRes").val(""),
        $("#estRes").val("0")

}