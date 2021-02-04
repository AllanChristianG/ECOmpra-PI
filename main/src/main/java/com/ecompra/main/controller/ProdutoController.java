package com.ecompra.main.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.ecompra.main.model.Produto;
import com.ecompra.main.repository.ProdutoRepository;


@RestController
@RequestMapping("/produto")
@CrossOrigin(value = "*", allowedHeaders = "*")
public class ProdutoController {
	
	@Autowired
	public ProdutoRepository repository;
	
	@GetMapping
	public ResponseEntity<List<Produto>> GetAll(){
		return ResponseEntity.ok(repository.findAll());
	}
	
	@GetMapping("/{codigo}")
	public ResponseEntity<Produto> GetById(@PathVariable long codigo){
		return repository.findById(codigo)
				.map(resp -> ResponseEntity.ok(resp)).orElse(ResponseEntity.notFound().build());
	}
	
	@GetMapping("/promocao")
	public ResponseEntity<List<Produto>> findAllByPromocao(){
		return ResponseEntity.ok(repository.findAllByPromocao());
	}
	
	@GetMapping("/buscaProduto/{nome}")
	public ResponseEntity<List<Produto>> findAllByNome (@PathVariable String nome){
		return ResponseEntity.ok(repository.findAllByNome(nome));
	}
	
	@PostMapping
	public ResponseEntity<Produto> Post(@RequestBody Produto objetoProduto){
		return ResponseEntity.status(HttpStatus.CREATED).body(repository.save(objetoProduto));
	}
	
	@PutMapping
	public ResponseEntity<Produto> Put(@RequestBody Produto objetoProduto){
		return ResponseEntity.status(HttpStatus.OK).body(repository.save(objetoProduto));

	}
	
	@DeleteMapping("/{codigo}")
	public void Del(@PathVariable long codigo){
		repository.deleteById(codigo);
	}
	
}
