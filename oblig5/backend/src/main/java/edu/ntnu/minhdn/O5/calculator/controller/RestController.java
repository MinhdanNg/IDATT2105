package edu.ntnu.minhdn.O5.calculator.controller;

import edu.ntnu.minhdn.O5.calculator.model.Expression;
import edu.ntnu.minhdn.O5.calculator.repository.CalculatorRepository;
import edu.ntnu.minhdn.calculator.service.Calculation;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@org.springframework.web.bind.annotation.RestController
@CrossOrigin
@RequestMapping("/calculator")
public class RestController{
    Logger logger = LoggerFactory.getLogger(RestController.class);

    @Autowired
    CalculatorRepository calculatorRepository;

    @GetMapping
    public ResponseEntity<List<Expression>> getAllExpressions(){
        try {
            List<Expression> expressions = new ArrayList<Expression>();
            expressions.addAll(calculatorRepository.findAll());
            return new ResponseEntity<>(expressions, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping()
    public ResponseEntity<String> createCalculation(@RequestBody Expression expression){
        logger.info("Add new calculation and calculate");
        Calculation calculation = new Calculation();
        expression.setResult(calculation.calculate(expression.getExpression()));
        try {
            calculatorRepository.save(expression);
            logger.info("Expression was added to database");
            return new ResponseEntity<>("Expression was created successfully.", HttpStatus.CREATED);
        } catch (Exception e) {
            logger.info("Failed to add expression to database");
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
