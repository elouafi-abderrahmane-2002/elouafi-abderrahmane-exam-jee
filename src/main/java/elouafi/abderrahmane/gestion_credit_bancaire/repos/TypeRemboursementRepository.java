package elouafi.abderrahmane.gestion_credit_bancaire.repos;

import elouafi.abderrahmane.gestion_credit_bancaire.domain.TypeRemboursement;
import org.springframework.data.jpa.repository.JpaRepository;


public interface TypeRemboursementRepository extends JpaRepository<TypeRemboursement, Integer> {
}
