$(document).ready(function() {


    $("#listar").click(function(){
        $('#message').removeClass('alert-danger')
        $('#message').removeClass('alert-success')
        $('#message').text('');
       let tabla= document.querySelector('#tabla');
       tabla.innerHTML = '';
       $.ajax({
        url: "http://localhost:8080/producto/listar",
        type: "GET",
        datatype: "JSON",
        success: function(data){
            var nuevaFila=document.createElement("tr");
            nuevaFila.innerHTML+='<td>'+'Referencia'+'</td><td>'+'Nombre'+'</td><td>'+'Categoria'+'</td><td>'+ 'Precio Unitario'+'</td><td>'+'Cantidad'+'</td><td>'+'Total'+'</td>';
            tabla.appendChild(nuevaFila);
            for(i=0;i<data.length;i++){
                tabla.innerHTML+='<td>'+data[i].referencia+'</td><td>'+data[i].nombre+'</td><td>'+data[i].categoria+'</td><td>'+data[i].precioUnitario+'</td><td>'+data[i].cantidad+'</td><td>'+data[i].total
            }
        },
        error: function(error){
            console.log(error)
        }
    })
    })


    $("#buscar").click(function(){
        $('#message').removeClass('alert-danger')
        $('#message').removeClass('alert-success')
        $('#message').text('');
        let tabla= document.querySelector('#tabla');
        let ref=$("#ref").val();
        tabla.innerHTML = '';
        if(ref===''){
            $('#message').addClass('alert-danger');
            $('#message').text('⚠ Ingrese una referencia, para hacer la consulta');
            return;
        }
        $.ajax({
         url: "http://localhost:8080/producto/"+ref,
         type: "GET",
         datatype: "JSON",
         success: function(data){
             var nuevaFila=document.createElement("tr");
             nuevaFila.innerHTML+='<td>'+'Referencia'+'</td><td>'+'Nombre'+'</td><td>'+'Categoria'+'</td><td>'+ 'Precio Unitario'+'</td><td>'+'Cantidad'+'</td><td>'+'Total'+'</td>';
             tabla.appendChild(nuevaFila);
             tabla.innerHTML+='<td>'+data.referencia+'</td><td>'+data.nombre+'</td><td>'+data.categoria+'</td><td>'+data.precioUnitario+'</td><td>'+data.cantidad+'</td><td>'+data.total  
         },
         error: function(xhr, status, error) {
            if (xhr.status === 404) {
                $('#message').addClass('alert-danger');
                $('#message').text('⚠ No se encontro la referencia '+ref);
            }
            console.log(status);
            console.log(error);
        }
     })
     })


     $("#eliminar").click(function(){
        $('#message').removeClass('alert-danger')
        $('#message').removeClass('alert-success')
        $('#message').text('');
        let ref=$("#ref").val();
        tabla.innerHTML = '';
        if(ref===""){
            $('#message').addClass('alert-danger');
            $('#message').text('⚠ Ingrese una referencia, para hacer la carga de informacion');
            return;
        }
        $.ajax({
         url: "http://localhost:8080/producto/eliminar/"+ref,
         type: "DELETE",
         success: function(data){ 
            $('#message').addClass('alert-success');
            $('#message').text('✅ Se elimino correctamente');
            
         },
         error: function(xhr, status, error) {
            if (xhr.status === 404) {
                $('#message').addClass('alert-danger');
                $('#message').text('⚠ No se encontro la referencia '+ref);
            }
            console.log(status);
            console.log(error);
        }
     })
     })

     $("#cargar").click(function(){
        $('#message').removeClass('alert-danger')
        $('#message').removeClass('alert-success')
        $('#message').text('');   
        let ref=$("#ref").val();
        tabla.innerHTML = '';
        if(ref===""){
            $('#message').addClass('alert-danger');
            $('#message').text('⚠ Ingrese una referencia, para hacer la carga de informacion');
            return;
        }
        $.ajax({
         url: "http://localhost:8080/producto/"+ref,
         type: "GET",
         datatype: "JSON",
         success: function(data){
            $('#actualizar').prop('disabled', false)
            $('#referencia').prop('disabled', true);
            $('#agregar').prop('disabled', true);
            $("#referencia").val(data.referencia);
            $("#nombre").val(data.nombre); 
            $("#categoria").val(data.categoria); 
            $("#precioUnitario").val(data.precioUnitario); 
            $("#cantidad").val(data.cantidad); 
            $('#message').addClass('alert-success');
            $('#message').text('✅ Se cargo correctamente la informacion, por favor actualiza.');
         },
         error: function(xhr, status, error) {
            if (xhr.status === 404) {
                $('#message').addClass('alert-danger');
                $('#message').text('⚠ No se encontro la referencia '+ref);
            }
            console.log(status);
            console.log(error);
        }
     })
     })
     $("#agregar").click(function(){
        $('#mensaje').removeClass('alert-danger')
        $('#mensaje').removeClass('alert-success')
        $('#mensaje').text('');   
        let referencia=$("#referencia").val();
        let nombre=$("#nombre").val();
        let categoria=$("#categoria").val();
        let precioUnitario=$("#precioUnitario").val();
        let cantidad=$("#cantidad").val();
        if(referencia==='' || nombre==='' || categoria==='' || cantidad==='' || precioUnitario===''){
            $('#mensaje').addClass('alert-danger');
            $('#mensaje').text('⚠ Completa todos los campos');
        }
        let datos={
            referencia: referencia, 
            nombre:nombre,
            categoria:categoria,
            precioUnitario:precioUnitario,
            cantidad:cantidad
        };
        $.ajax({
         url: "http://localhost:8080/producto/nuevo",
         type: "POST",
         data: JSON.stringify(datos),
         contentType: "application/json",
         success: function(data){
            $('#form')[0].reset();
            $('#mensaje').addClass('alert-success');
            $('#mensaje').text('✅ Se guardo correctamente');
         },
         error: function(xhr, status, error) {
            if (xhr.status === 403) {
                $('#mensaje').addClass('alert-danger');
                $('#mensaje').text('⚠ Ya existe la referencia'+referencia);
            }
            console.log(status);
            console.log(error);
        }
     })
     })

     $("#actualizar").click(function(){
        $('#mensaje').removeClass('alert-danger')
        $('#mensaje').removeClass('alert-success')
        $('#mensaje').text('');  
        let referencia=$("#referencia").val();
        let nombre=$("#nombre").val();
        let categoria=$("#categoria").val();
        let precioUnitario=$("#precioUnitario").val();
        let cantidad=$("#cantidad").val();
        if(referencia==='' || nombre==='' || categoria==='' || cantidad==='' || precioUnitario===''){
            $('#mensaje').addClass('alert-danger');
            $('#mensaje').text('⚠ Completa todos los campos');
        }
        let datos={
            referencia: referencia, 
            nombre:nombre,
            categoria:categoria,
            precioUnitario:precioUnitario,
            cantidad:cantidad
        };
        $.ajax({
         url: "http://localhost:8080/producto/actualizar",
         type: "PUT",
         data: JSON.stringify(datos),
         contentType: "application/json",
         success: function(data){
            $('#form')[0].reset();
            $('#mensaje').addClass('alert-success');
            $('#mensaje').text('✅ Se actualizo correctamente');
            $('#actualizar').prop('disabled', true)
            $('#referencia').prop('disabled', false);
            $('#agregar').prop('disabled', false);

         },
         error: function(xhr, status, error) {
            console.log(status);
            console.log(error);
        }
     })
     })


     $("#actualizarCantidad").click(function(){
        $('#mensajeActu').removeClass('alert-danger')
        $('#mensajeActu').removeClass('alert-success')
        $('#mensajeActu').text('');   
        let categoria=$("#porCategoria").val();
        let cantidad=$("#porCantidad").val();
        if(categoria==='' || cantidad===''){
            $('#mensajeActu').addClass('alert-danger');
            $('#mensajeActu').text('⚠ Completa todos los campos');
        }
        $.ajax({
         url: "http://localhost:8080/producto/actualizarCantidad/"+categoria+'/'+cantidad,
         type: "PUT",
         success: function(data){
            $('#mensajeActu').addClass('alert-success');
            $('#mensajeActu').text('✅ Se actualizo la cantidad correctamente');
         },
         error: function(xhr, status, error) {
            if (xhr.status === 409) {
                $('#mensajeActu').addClass('alert-danger');
                $('#mensajeActu').text('⚠ La cantidad debe ser un numero mayor o igual a 0');
            }else if (xhr.status ===404){
                $('#mensajeActu').addClass('alert-danger');
                $('#mensajeActu').text('⚠ La categoria no existe.');

            }
            console.log(status);
            console.log(error);
        }
     })
     })


});