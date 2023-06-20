package com.ProductosSpringWeb.controller;

import com.ProductosSpringWeb.entity.Producto;
import com.ProductosSpringWeb.services.ServicioProducto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
@RestController
@CrossOrigin("http://127.0.0.1:3000")
@RequestMapping("/producto")
public class ControladorProducto {

    ServicioProducto servicioProducto;

    public ControladorProducto(ServicioProducto servicioProducto) {
        this.servicioProducto = servicioProducto;
    }
    @GetMapping("/listar")
    public ResponseEntity<List<Producto>> getListaProductos(){
        return  new ResponseEntity<>(servicioProducto.getListaProductos(), HttpStatus.OK);
    }
    @GetMapping("/{referencia}")
    public ResponseEntity<Producto> getProductoPorReferencia(@PathVariable String referencia){
        if(servicioProducto.existeProductoPorReferencia(referencia)){
            return new ResponseEntity<>(servicioProducto.getProductoPorReferencia(referencia),HttpStatus.OK);
        }else{
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    @DeleteMapping("/eliminar/{referencia}")
    public ResponseEntity<Void> eliminarProducto(@PathVariable String referencia){
        if(servicioProducto.existeProductoPorReferencia(referencia)){
            servicioProducto.deleteProductoPorReferencia(referencia);
            return new ResponseEntity<>(HttpStatus.OK);
        }else{
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    @PostMapping("/nuevo")
    public ResponseEntity<Producto> agregarProducto(@RequestBody Producto producto){
        if(servicioProducto.existeProductoPorReferencia(producto.getReferencia())){
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }else{
            servicioProducto.addProducto(producto);
            return new ResponseEntity<>(producto, HttpStatus.CREATED);
        }
    }
    @PutMapping("/actualizar")
    public ResponseEntity<Producto> actualizarProducto(@RequestBody Producto producto){
        if(servicioProducto.existeProductoPorReferencia(producto.getReferencia())){
            servicioProducto.updateProducto(producto);
            return new ResponseEntity<>(producto, HttpStatus.OK);
        }else{
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    @PutMapping("/actualizarCantidad/{categoria}/{cantidad}")
    public ResponseEntity<Void> actualizarCantidadProductoPorCategoria(@PathVariable String categoria, @PathVariable int cantidad){
        if(cantidad>=0){
            if(servicioProducto.existeProductoPorCategoria(categoria)){
                servicioProducto.actualizarCantidadProductoPorCategoria(categoria, cantidad);
                return new ResponseEntity<>(HttpStatus.OK);
            }else{
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        }else{
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }
    }
}
