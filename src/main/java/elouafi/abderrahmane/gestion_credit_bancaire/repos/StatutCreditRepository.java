package elouafi.abderrahmane.gestion_credit_bancaire.repos;

import elouafi.abderrahmane.gestion_credit_bancaire.domain.StatutCredit;
import org.springframework.data.jpa.repository.JpaRepository;


public interface StatutCreditRepository extends JpaRepository<StatutCredit, Integer> {
}
