package com.ecompra.main.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.ecompra.main.model.Usuario;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
	
	@Query(value ="select nome from tb_usuario where usuario = :email",nativeQuery = true)
	public String buscaPorEmail(@Param("email") String email);
	
	public Optional<Usuario> findByUsuario(String usuario);

}
