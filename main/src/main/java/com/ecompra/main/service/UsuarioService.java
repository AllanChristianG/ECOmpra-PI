package com.ecompra.main.service;

import java.nio.charset.Charset;
import java.util.Optional;

import org.apache.commons.codec.binary.Base64;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.ecompra.main.model.UserLogin;
import com.ecompra.main.model.Usuario;
import com.ecompra.main.repository.UsuarioRepository;

@Service
public class UsuarioService {
	
	@Autowired
	private UsuarioRepository repository;
	
	
	public ResponseEntity<Usuario> CadastrarUsuario(Usuario usuario){
		
		if(repository.buscaPorEmail(usuario.getUsuario()) == null) {
			BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
			String senhaEncoder = encoder.encode(usuario.getSenha());
			usuario.setSenha(senhaEncoder);
			return ResponseEntity.status(HttpStatus.CREATED).body(repository.save(usuario));
		}else {
			return ResponseEntity.status(HttpStatus.CONFLICT).body(null);
		}
		 
	} 
	
	public Optional<UserLogin> Logar (Optional<UserLogin> user){
		BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
		Optional<Usuario> usuario = repository.findByUsuario(user.get().getUsuario());
		
		if(usuario.isPresent()) {
			if(encoder.matches(user.get().getSenha(), usuario.get().getSenha())) {
				
				String auth = user.get().getUsuario() + ":" + user.get().getSenha();
				byte[] encodedAuth = Base64.encodeBase64(auth.getBytes(Charset.forName("US-ASCII")));
				
				String authHeader = "Basic " + new String(encodedAuth);
				user.get().setToken(authHeader);
				user.get().setUsuario(usuario.get().getUsuario());
				user.get().setNome(usuario.get().getNome());
				user.get().setTipoUsuario(usuario.get().getTipoUsuario());
				
				return user;
			}
		}
		return null;
	}

}
