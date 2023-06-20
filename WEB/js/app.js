$(document).ready(function() {


    $("#listar").click(function(){
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
        let tabla= document.querySelector('#tabla');
        let ref=$("#ref").val();
        tabla.innerHTML = '';
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
         error: function(error){
             console.log(error)
         }
     })
     })


     $("#eliminar").click(function(){
        let ref=$("#ref").val();
        tabla.innerHTML = '';
        $.ajax({
         url: "http://localhost:8080/producto/eliminar/"+ref,
         type: "DELETE",
         success: function(data){ 
            console.log("Bien hecho")
         },
         error: function(error){
             console.log(error)
         }
     })
     })

     $("#cargar").click(function(){
        let ref=$("#ref").val();
        tabla.innerHTML = '';
        $.ajax({
         url: "http://localhost:8080/producto/"+ref,
         type: "GET",
         datatype: "JSON",
         success: function(data){
            $("#referencia").val(data.referencia);
            $("#nombre").val(data.nombre); 
            $("#categoria").val(data.categoria); 
            $("#precioUnitario").val(data.precioUnitario); 
            $("#cantidad").val(data.cantidad); 
         },
         error: function(error){
             console.log(error)
         }
     })
     })
     $("#agregar").click(function(){
        let referencia=$("#referencia").val();
        let nombre=$("#nombre").val();
        let categoria=$("#categoria").val();
        let precioUnitario=$("#precioUnitario").val();
        let cantidad=$("#cantidad").val();
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

         },
         error: function(error){
             console.log(error)
         }
     })
     })

     $("#actualizar").click(function(){
        let referencia=$("#referencia").val();
        let nombre=$("#nombre").val();
        let categoria=$("#categoria").val();
        let precioUnitario=$("#precioUnitario").val();
        let cantidad=$("#cantidad").val();
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
         },
         error: function(error){
             console.log(error)
         }
     })
     })


     $("#actualizarCantidad").click(function(){
        let categoria=$("#porCategoria").val();
        let cantidad=$("#porCantidad").val();
        $.ajax({
         url: "http://localhost:8080/producto/actualizarCantidad/"+categoria+'/'+cantidad,
         type: "PUT",
         success: function(data){
         },
         error: function(error){
             console.log(error)
         }
     })
     })


});