package com.demo.rbac.repository;

import com.demo.rbac.model.Guide;
import org.springframework.data.jpa.repository.JpaRepository;
<<<<<<< HEAD
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

=======
>>>>>>> main
import java.util.Optional;

public interface GuideRepository extends JpaRepository<Guide, Long> {
    Optional<Guide> findByEmail(String email);
<<<<<<< HEAD

    @Query("SELECT g.id FROM Guide g WHERE g.email = :email")
    Optional<Long> findGuideIdByEmail(@Param("email") String email);
=======
>>>>>>> main
}
