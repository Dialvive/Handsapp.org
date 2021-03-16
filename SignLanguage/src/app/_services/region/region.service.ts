import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Region } from '../../_models/region'

@Injectable({
  providedIn: 'root'
})

export class RegionService {
  API_URI = 'http://localhost:8080';
  API_V = '/v1';
  constructor(private http: HttpClient) { }
  getRegions(){
    return this.http.get(this.API_URI+ this.API_V +'/regions')
  }
  getRegion(id:number){
    return this.http.get(this.API_URI+this.API_V +'/region/'+id)
  }
  createRegion(region: Region){
    return this.http.post(this.API_URI+this.API_V +'/region',region)
  }
  updateRegion(region: Region, id : number){
    return this.http.patch(this.API_URI+this.API_V +'/region/'+ id,region)
  }
  deleteRegion(id: number){
    return this.http.delete(this.API_URI+this.API_V +'/region/'+id)
  }
}
