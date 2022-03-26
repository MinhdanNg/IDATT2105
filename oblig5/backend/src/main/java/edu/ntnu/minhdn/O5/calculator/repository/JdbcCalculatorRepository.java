package edu.ntnu.minhdn.O5.calculator.repository;

import edu.ntnu.minhdn.O5.calculator.model.Expression;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class JdbcCalculatorRepository implements CalculatorRepository{
    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public List<Expression> findAll(){
        return jdbcTemplate.query("SELECT * from calc_history", BeanPropertyRowMapper.newInstance(Expression.class));
    }

    @Override
    public int save(Expression expression){
        return jdbcTemplate.update("INSERT INTO calc_history(expression, answer, user_id) VALUES(?, ?, ?)",
                new Object[] { expression.getExpression(), expression.getResult(), "NULL"});
    }
}
