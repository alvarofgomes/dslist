package com.alvarofgomes.dslist.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.alvarofgomes.dslist.entities.GameList;

public interface GameListRepository extends JpaRepository <GameList, Long> {

}
