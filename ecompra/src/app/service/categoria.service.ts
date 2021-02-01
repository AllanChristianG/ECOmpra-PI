import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Categoria } from '../model/Categoria';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  constructor(private http: HttpClient) { }

  token = {
    headers: new HttpHeaders().set('Authorization', environment.token)
  }

  
  getByIdCategoria(codigo: number): Observable<Categoria>{
    return this.http.get<Categoria>(`http://localHost:8080/categoria/${codigo}`, this.token)
  }

  getAllCategoria(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>('http://localhost:8080/categoria', this.token)

  }

  postCategoria(categoria: Categoria): Observable<Categoria> {
    return this.http.post<Categoria>('http://localhost:8080/categoria', categoria, this.token)
    }

putCategoria(categoria: Categoria): Observable<Categoria>{
  return this.http.put<Categoria>('http://localHost:8080/categoria', categoria, this.token)
}
deleteCategoria(codigo: number){
  return this.http.delete(`http://localHost:8080/categoria/${codigo}`, this.token)
}

}

