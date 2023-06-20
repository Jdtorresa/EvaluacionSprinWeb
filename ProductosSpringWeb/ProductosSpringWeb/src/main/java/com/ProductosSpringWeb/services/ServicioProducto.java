package com.ProductosSpringWeb.services;


import com.ProductosSpringWeb.entity.Producto;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ServicioProducto {
    List<Producto> listaProductos=new ArrayList<>();

    public ServicioProducto(){
        listaProductos.add(new Producto("1", "Arroz Diana 1kg", "Abarrotes", 5200, 100));
        listaProductos.add(new Producto("2", "Panela 500g", "Abarrotes", 3200, 30));
        listaProductos.add(new Producto("3", "Frijol 500g", "Abarrotes", 8450, 40));
        listaProductos.add(new Producto("4", "Tomate Chonto 500g", "Verduras", 2450, 100));
        listaProductos.add(new Producto("5", "Cebolla larga 500g", "Verduras", 3000, 150));
        listaProductos.add(new Producto("6", "Cebolla Roja 500g", "Verduras", 1900, 30));
    }
    public List<Producto> getListaProductos() {
        return listaProductos;
    }
    public void addProducto(Producto producto){
        listaProductos.add(producto);
    }
    public void updateProducto(Producto productoActualizado){
        Producto producto=getProductoPorReferencia(productoActualizado.getReferencia());
        producto.setCantidad(productoActualizado.getCantidad());
        producto.setCategoria(productoActualizado.getCategoria());
        producto.setNombre(productoActualizado.getNombre());
        producto.setPrecioUnitario(productoActualizado.getPrecioUnitario());
    }

    public boolean existeProductoPorReferencia(String referencia){
        boolean existe=false;
        for(Producto p: listaProductos){
            if(p.getReferencia().equals(referencia)){
                existe=true;
                break;
            }
        }
        return existe;
    }

    public boolean existeProductoPorCategoria(String categoria){
        boolean existe=false;
        for(Producto p: listaProductos){
            if(p.getCategoria().equals(categoria)){
                existe=true;
                break;
            }
        }
        return existe;
    }

    public Producto getProductoPorReferencia(String referencia){
        Producto producto=null;
        for(Producto p: listaProductos){
            if(p.getReferencia().equals(referencia)){
                producto=p;
                break;
            }
        }
        return producto;
    }

    public void deleteProductoPorReferencia(String referencia){
        Producto producto=this.getProductoPorReferencia(referencia);
        listaProductos.remove(producto);
    }
    public void actualizarCantidadProductoPorCategoria(String categoria, int cantidad){
        for(Producto p: listaProductos){
            if(p.getCategoria().equals(categoria)){
                p.setCantidad(cantidad);
            }
        }
    }

}
