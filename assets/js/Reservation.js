var endpoint = "http://129.151.119.175:8080/api/Reservation"
$(document).ready(function () {
  getReservaciones()
  $("#actualizar").click(function () {

    putReservacion()

  })

})


function getReservaciones() {

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
          let sD = new Date(value.startDate)
          let dD = new Date(value.devolutionDate)
          registro += "<div class='card mx-5 my-5 '><h2>" + value.idReservation + "</h2>" +
            "<div class='card-body'>" +
            "<h5 class='card-title'><b> Estado de la Reservacion: " + value.status + "</b></h5>" +
            " <p class='card-text'>" +
            "<b>Fecha inicial: </b>" + sD.toISOString().slice(0, 16) + "<Br>" +
            "<b>Fecha de Entrega: </b>" + dD.toISOString().slice(0, 16) + "<Br> </p>" +
            "<p><button class='text-white mr-4 ml-1 btn btn-warning' data-toggle='modal'" +
            "data-target='#myModal' onclick='ver(" + JSON.stringify(value) + ")'>" +
            "Editar</button><button class='btn btn-danger' onclick='eliminar(" + value.idReservation + ")'>" +
            "Borrar</button></p>" +
            " </div>" +
            " </div>"

        })
        $("#body").html(registro);
      }
    }
  });
}

function ver(Reservacion) {
  let sD = new Date(Reservacion.startDate)
  let dD = new Date(Reservacion.devolutionDate)
  $("#idRes").val(Reservacion.idReservation)
  $("#estRes").val(Reservacion.status)
  $("#iniRes").val(sD.toISOString().slice(0, 16))
  $("#entRes").val(dD.toISOString().slice(0, 16))
}


function putReservacion() {

  let reservacion = {
    idReservation: $("#idRes").val(),
    startDate: $("#iniRes").val(),
    devolutionDate: $("#entRes").val(),
    status: $("#estRes").val(),

  }

  $.ajax({

    url: endpoint + "/update",
    type: 'PUT',
    data: JSON.stringify(reservacion),
    dataType: 'json',
    contentType: "application/json",
    complete: function (data) {

      if (data.status == "201") {
        alert("Registro actuzalizado!!")
      }
      else {
        alert("Error al actualizar el registro!!")
      }
      getReservaciones()
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
        getReservaciones()
      }

    })
  }
}