package com.alvarofgomes.dslist.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.alvarofgomes.dslist.entities.Game;

public interface GameRepository extends JpaRepository <Game, Long> {

}
