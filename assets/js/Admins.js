var endpoint = "http://129.151.119.175:8080/api/Admin"
$(document).ready(function () {
  getAdministradores()
  $("#actualizar").click(function () {

    putAdministrador()

  })

})


function getAdministradores() {

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

          registro += "<div class='card mx-5 my-5'><h2>" + value.idAdmin + "</h2>" +
            "<div class='card-body'>" +
            "<h5 class='card-title'><b>" + value.name + "</b></h5>" +
            " <p class='card-text'>" +
            "<b>Email: </b>" + value.email + "<Br><Br></p>" +
            "<p><button class='text-white mr-4 ml-1 btn btn-warning' data-toggle='modal'" +
            "data-target='#myModal' onclick='ver(" + JSON.stringify(value) + ")'>" +
            "Editar</button><button class='btn btn-danger' onclick='eliminar(" + value.idAdmin + ")'>" +
            "Borrar</button></p>" +
            " </div>" +
            " </div>"

        })
        $("#body").html(registro);
      }
    }
  });
}

function ver(Admin) {

  $("#nameAdm").val(Admin.name)
  $("#emailAdm").val(Admin.email)
  $("#passAdm").val(Admin.password)
  $("#idAdmin").val(Admin.idAdmin)

}


function putAdministrador() {

  let administrador = {
    idAdmin: $("#idAdmin").val(),
    name: $("#nameAdm").val(),
    email: $("#emailAdm").val(),
    password: $("#passAdm").val()
  }

  $.ajax({

    url: endpoint + "/update",
    type: 'PUT',
    data: JSON.stringify(administrador),
    dataType: 'json',
    contentType: "application/json",
    complete: function (data) {

      if (data.status == "201") {
        alert("Registro actuzalizado!!")
      }
      else {
        alert("Error al actualizar el registro!!")
      }
      getAdministradores()
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
        getAdministradores()
      }

    })
  }
}