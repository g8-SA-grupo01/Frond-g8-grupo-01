var endpoint = "http://129.151.119.175:8080/api/Category"
$(document).ready(function () {
    $("#guardar").click(function () {
        postCategoria()
    })
})

function postCategoria() {

    let Categoria = {

        name: $("#nomCat").val(),
        description: $("#desCat").val()
    }

    $.ajax({

        url: endpoint + "/save",
        type: 'POST',
        data: JSON.stringify(Categoria),
        dataType: 'json',
        contentType: "application/json",
        complete: function (data) {

            if (data.status == "201") {
                alert("Categoria Guardada Con Exito")
            }
            else {
                alert("Fallo al Guardar la categoria")
            }

            limpiar()

        }

    })
}


function limpiar() {

    $("#nomCat").val("")
    $("#desCat").val("")
}