package edu.ntnu.minhdn.O5.calculator.repository;

import edu.ntnu.minhdn.O5.calculator.model.Expression;
import java.util.List;

public interface CalculatorRepository {
    List<Expression> findAll();
    int save(Expression expression);
}
