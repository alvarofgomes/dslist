package com.alvarofgomes.dslist.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.alvarofgomes.dslist.dto.GameListDTO;
import com.alvarofgomes.dslist.dto.GameMinDTO;
import com.alvarofgomes.dslist.dto.ReplacementDTO;
import com.alvarofgomes.dslist.services.GameListService;
import com.alvarofgomes.dslist.services.GameService;

@CrossOrigin(origins = "*")// mudança de requisiçoes
@RestController
@RequestMapping(value = "/lists")
public class GameListController {

	@Autowired
	private GameListService gamelistService;
	
	@Autowired 
	private GameService gameService;
	
	@GetMapping
	public List<GameListDTO> findAll(){
		List<GameListDTO> result = gamelistService.findAll();
		return result;
	}
	
	@GetMapping(value = "/{listId}/games")
	public List<GameMinDTO> findByList(@PathVariable Long listId){
		List<GameMinDTO> result = gameService.findByList(listId);
		return result;
	}
	
	@PostMapping(value = "/{listId}/replacement")
	public void move(@PathVariable Long listId, @RequestBody ReplacementDTO body){
		gamelistService.move(listId, body.getSourceIndex(), body.getDestinationIndex());
	}
	
}
