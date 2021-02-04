package com.ecompra.main.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.ecompra.main.model.Produto;

@Repository
public interface ProdutoRepository extends JpaRepository<Produto, Long>{
	@Query(value = "select*from tb_produto where nome = :nome", nativeQuery = true)
	public List<Produto> findAllByNome(@Param ("nome") String nome);
	@Query(value = "select*from tb_produto where promocao = true", nativeQuery = true)
	public List<Produto> findAllByPromocao();
	
}
