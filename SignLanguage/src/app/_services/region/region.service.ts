import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Region } from '../../_models/region'

@Injectable({
  providedIn: 'root'
})

export class RegionService {
  API_URI = 'http://localhost:8080';
  
  constructor(private http: HttpClient) { }
  getRegions(){
    return this.http.get(this.API_URI+'/region')
  }
  getRegion(id:number){
    return this.http.get(this.API_URI+'/region/'+id)
  }
  createRegion(region: Region){
    return this.http.post(this.API_URI+'/region',region)
  }
  updateRegion(region: Region){
    return this.http.put(this.API_URI+'/region/'+region.id,region)
  }
  deleteRegion(id: number){
    return this.http.delete(this.API_URI+'/region/'+id)
  }
}
