package com.demo.rbac.repository;

import com.demo.rbac.model.Coordinator;
<<<<<<< HEAD
=======
import com.demo.rbac.model.Student;
>>>>>>> main
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CoordinatorRepository extends JpaRepository<Coordinator, String> {
    Optional<Coordinator> findByUsername(String username);
}
