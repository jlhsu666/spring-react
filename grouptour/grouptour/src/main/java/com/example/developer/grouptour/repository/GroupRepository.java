package com.example.developer.grouptour.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.developer.grouptour.model.Group;

// import java.util.List;

public interface GroupRepository extends JpaRepository<Group, Long> {
    Group findByName(String name);
}
