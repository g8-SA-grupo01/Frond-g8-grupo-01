var endpoint = "http://129.151.119.175:8080/api/Game"
$(document).ready(function () {
  getJuegos()
  $("#actualizar").click(function () {

    putJuego()

  })

})


function getJuegos() {

  $.ajax({
    url: endpoint + "/all",
    type: 'GET',
    dataType: 'json',
    success: function (data) {
      if (data.length == 0) {
        let registro = "";
        registro += "<div class='jumbotron mx-auto m-5'><h1 class='text-white text-center'>" +
          "No hay datos que mostrar.</h1></div>"
        $("#body").html(registro);
      }
      else {
        let registro = "";
        $.each(data, function (index, value) {

          registro += "<div class='card mx-5 my-5 '><h2>" + value.id + "</h2>" +
            "<div class='card-body'>" +
            "<h5 class='card-title'><b>" + value.name + "</b></h5>" +
            " <p class='card-text'>" +
            "<b>Desarrollador: </b>" + value.developer + "<Br>" +
            "<b>Año: </b>" + value.year + "<Br>" +
            "<b>Descripcion: </b>" + value.description + "<Br> </p>" +
            "<p><button class='text-white mr-4 ml-1 btn btn-warning' data-toggle='modal'" +
            "data-target='#myModal' onclick='ver(" + JSON.stringify(value) + ")'>" +
            "Editar</button><button class='btn btn-danger' onclick='eliminar(" + value.id + ")'>" +
            "Borrar</button></p>" +
            " </div>" +
            " </div>"

        })
        $("#body").html(registro);
      }
    }
  });
}

function ver(juego) {

  $("#desJueg").val(juego.description)
  $("#nomJue").val(juego.name)
  $("#añoJueg").val(juego.year)
  $("#idJue").val(juego.id)
  $("#devJue").val(juego.developer)

}


function putJuego() {

  let juego = {
    id: $("#idJue").val(),
    developer: $("#devJue").val(),
    year: $("#añoJueg").val(),
    name: $("#nomJue").val(),
    description: $("#desJueg").val()
  }

  $.ajax({

    url: endpoint + "/update",
    type: 'PUT',
    data: JSON.stringify(juego),
    dataType: 'json',
    contentType: "application/json",
    complete: function (data) {

      if (data.status == "201") {
        alert("Registro actuzalizado!!")
      }
      else {
        alert("Error al actualizar el registro!!")
      }
      getJuegos()
    }

  })
}

function eliminar(id) {

  var con = confirm("Seguro que quieres borrar el registro?")
  if (con == true) {
    $.ajax({

      url: endpoint + "/" + id,
      type: 'DELETE',
      dataType: 'json',
      contentType: "application/json",
      complete: function (data) {
        alert("Registro Eliminado!!")
        getJuegos()
      }

    })
  }
}