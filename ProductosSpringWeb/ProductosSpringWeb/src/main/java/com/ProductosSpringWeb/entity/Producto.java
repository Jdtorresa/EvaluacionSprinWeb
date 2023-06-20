package com.ProductosSpringWeb.entity;

public class Producto {
    private String referencia;
    private String nombre;
    private String categoria;
    private int precioUnitario;
    private int cantidad;
    private final int DESCUENTO=10;
    private int total;
    public Producto(String referencia, String nombre, String categoria, int  precioUnitario, int cantidad) {
        this.referencia = referencia;
        this.nombre = nombre;
        this.categoria = categoria;
        this.precioUnitario = precioUnitario;
        this.cantidad = cantidad;
    }

    public Producto() {
    }

    public String getReferencia() {
        return referencia;
    }

    public void setReferencia(String referencia) {
        this.referencia = referencia;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getCategoria() {
        return categoria;
    }

    public void setCategoria(String categoria) {
        this.categoria = categoria;
    }

    public int getPrecioUnitario() {
        return precioUnitario;
    }

    public void setPrecioUnitario(int precioUnitario) {
        this.precioUnitario = precioUnitario;
    }

    public int getCantidad() {
        return cantidad;
    }

    public void setCantidad(int cantidad) {
        this.cantidad = cantidad;
    }

    public int getDESCUENTO() {
        return DESCUENTO;
    }

    public int getTotal() {
        int totalSinDescuento=this.cantidad*this.precioUnitario;
        int descuento= totalSinDescuento*DESCUENTO/100;
        return totalSinDescuento-descuento;
    }

    public void setTotal(int total) {
        this.total = total;
    }
}
