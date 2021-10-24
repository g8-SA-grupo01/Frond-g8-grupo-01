var endpoint = "http://129.151.119.175:8080/api/Category"
$(document).ready(function () {
  getCategorias()
  $("#actualizar").click(function () {

    putCategoria()

  })

})


function getCategorias() {

  $.ajax({
    url: endpoint + "/all",
    type: 'GET',
    dataType: 'json',
    success: function (data) {
      if (data.length == 0) {
        let registro = "";
        registro += "<div class='jumbotron mx-auto m-5'><h1 class='text-white text-center'>" +
          "No hay datos que mostrar.</h1></div>"
        console.log(registro)
        $("#body").html(registro);
      }
      else {
        let registro = "";
        $.each(data, function (index, value) {

          registro += "<div class='card mx-5 my-5'><h2>" + value.id + "</h2>" +
            "<div class='card-body'>" +
            "<h5 class='card-title'><b>" + value.name + "</b></h5>" +
            " <p class='card-text'>" +
            "<b>Decripcion: </b>" + value.description + "</p><Br>" +
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

function ver(categoria) {

  $("#idCat").val(categoria.id)
  $("#nomCat").val(categoria.name)
  $("#desCat").val(categoria.description)

}


function putCategoria() {

  let categoria = {

    id: $("#idCat").val(),
    name: $("#nomCat").val(),
    description: $("#desCat").val()
  }

  $.ajax({

    url: endpoint + "/update",
    type: 'PUT',
    data: JSON.stringify(categoria),
    dataType: 'json',
    contentType: "application/json",
    complete: function (data) {

      if (data.status == "201") {
        alert("Registro actuzalizado!!")
      }
      else {
        alert("Error al actualizar el registro!!")
      }
      getCategorias()
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
        getMensajes()
      }

    })
  }
}