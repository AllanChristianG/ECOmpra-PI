import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Produto } from '../model/Produto';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  constructor(
    private http: HttpClient
  ) {}

  token = {
    headers: new HttpHeaders().set('Authorization', environment.token)
  }

  getAllProduto(): Observable<Produto[]>{
    return this.http.get<Produto[]>('http://localhost:8080/produto', this.token)
  }

  getProdutoById(codigo: number):Observable<Produto>{
    return this.http.get<Produto>(`http://localhost:8080/produto/${codigo}`, this.token)
  }

  getProdutoPromocao(): Observable <Produto[]>{
    return this.http.get<Produto[]>('http://localhost:8080/produto/promocao', this.token)
  }

  postProduto(produto: Produto): Observable<Produto>{
    return this.http.post<Produto>('http://localhost:8080/produto', produto, this.token)
  }

  putProduto(produto: Produto): Observable<Produto>{
    return this.http.put<Produto>('http://localhost:8080/produto', produto, this.token)
  }

  deleteProduto(codigo: number){
    return this.http.delete<Produto>(`http://localhost:8080/produto/${codigo}`, this.token)
  }

  
}
