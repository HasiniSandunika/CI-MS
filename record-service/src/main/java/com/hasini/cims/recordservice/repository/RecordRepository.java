package com.hasini.cims.recordservice.repository;
import com.hasini.cims.models.record.Record;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RecordRepository extends JpaRepository<Record, Integer> {
}
