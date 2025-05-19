package elouafi.abderrahmane.gestion_credit_bancaire.model;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class StatutCreditDTO {

    private Integer id;

    @NotNull
    @Size(max = 20)
    private String libelle;

}
