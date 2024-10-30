import { Injectable, inject } from '@angular/core';
import { Cochera } from '../pages/interfaces/cochera';
import Swal from 'sweetalert2';
import { DataAuthService } from './data-auth.service';
import { Estacionamiento } from '../pages/interfaces/estacionamiento';



@Injectable({
  providedIn: 'root'
})
export class DataCocherasService {


  cocheras: Cochera[] = [];
  estacionamientos: Estacionamiento[] = []
  authService = inject(DataAuthService)
  esAdmin = true;

  constructor() { 
    this.loadData()
    
  }
  async loadData() {
    await this.getCocheras()
    await this.getEstacionamientos()
    this.asociarEstacionamientosConCocheras()
  }

  async getCocheras(){
    const res = await fetch('http://localhost:4000/cocheras',{
      headers: {
        authorization:'Bearer '+localStorage.getItem("authToken")
      },
    })
    if(res.status !== 200) return;
    const resJson:Cochera[] = await res.json();
    this.cocheras = resJson;
    
  }
  async getEstacionamientos(){
    const res = await fetch('http://localhost:4000/estacionamientos',{
      method  : 'GET',
      headers: {
        authorization:'Bearer '+localStorage.getItem("authToken")
      },
    })
    if(res.status !== 200) return;
    const resJson: Estacionamiento[] = await res.json();
    this.estacionamientos = resJson;
    console.log(this.estacionamientos);
    
  }



  asociarEstacionamientosConCocheras() {
    this.cocheras = this.cocheras.map(cochera => {
      const estacionamiento = this.estacionamientos.find(e => e.idCochera == cochera.id && !e.horaEgreso)
      return {...cochera, estacionamiento}
    });
    console.log(this.estacionamientos)
  }

  

  
  //this.cocheras[this.cocheras.length - 1]?(antes del signo existe?).numero(no hago nada)
  // ||(sino le asigno valor 0) 0; (esto es un if)

  async agregarCochera(nombreCochera:string) {
    const cochera = {"descripcion" : nombreCochera };
    const res = await fetch('http://localhost:4000/cocheras', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization:'Bearer '+localStorage.getItem("authToken")
      },
      body: JSON.stringify(cochera)
    })
    if (res.status !== 200) {
      console.log("Error en la creacion de una nueva cochera")
    } else {
      console.log("Creacion de cochera exitosa")
      this.loadData();
    }
  };


  async borrarFila(id:number){
    const res = await fetch(`http://localhost:4000/cocheras/${id}`,{
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        authorization:'Bearer '+ localStorage.getItem("authToken")  
      }
    })
    if (res.status !== 200) {
      console.log('Error en la eliminacion de la cochera')
    } this.loadData()
  }
  async habilitarCochera(idCochera: number){
      const res = await fetch('http://localhost:4000/cocheras/'+idCochera+'/enable',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization:'Bearer '+ localStorage.getItem("authToken")
          
        },        
      })      
      if(res.status === 200) {
        console.log("cochera Habilitada")
      
        this.loadData();
      };     
  }

  async deshabilitarCochera(idCochera: number){
      const res = await fetch('http://localhost:4000/cocheras/'+idCochera+'/disable',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization:'Bearer '+ localStorage.getItem("authToken")
        },
        body: JSON.stringify({idCochera})
      })      
      if(res.status !== 200) {
        console.log("Error en la creacion de una nueva cochera")
        
      } else {
        console.log("Creacion de cochera exitosa")
        this.loadData()
      }
  };
      
 async abrirEstacionamiento(patente: string, idUsuarioIngreso: string, idCochera: number){
    const body = {patente, idUsuarioIngreso, idCochera}
    const res = await fetch('http://localhost:4000/estacionamientos/abrir',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization:'Bearer '+ localStorage.getItem("authToken")
      },
      body: JSON.stringify(body)
    })
    if(res.status !== 200) {
      console.log("Error en abrir estacionamiento")
    } else { 
      this.loadData();
    }
    
  } 
   
  
  
  async cerrarEstacionamiento(patente: string, idUsuarioEgreso: string) {
    const body = {patente, idUsuarioEgreso};
    const res = await fetch('http://localhost:4000/estacionamientos/cerrar',{
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        authorization:'Bearer ' + localStorage.getItem("authToken")
      },
      body: JSON.stringify(body)
    })
    if(res.status !== 200) {
      console.log("Error en el cerrado del estacionamiento")
    } else {
      console.log("Cerrado del estacionamiento exitoso")
      this.loadData();
    };    
  }
  
  
  
  

}
