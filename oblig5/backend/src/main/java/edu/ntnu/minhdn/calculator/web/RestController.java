package edu.ntnu.minhdn.calculator.web;

import edu.ntnu.minhdn.calculator.model.Expression;
import edu.ntnu.minhdn.calculator.service.Calculation;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@org.springframework.web.bind.annotation.RestController
@CrossOrigin
@RequestMapping("/calculator")
public class RestController{
    List<String> calculations = new ArrayList<>();
    Logger logger = LoggerFactory.getLogger(RestController.class);

    @GetMapping()
    public List<String> getCalculations(){
        logger.info("Get calculations");
        return calculations;
    }

    @PostMapping()
    public Calculation createCalculation(@RequestBody Expression expression){
        logger.info("Add new calculation and calculate");
        Calculation calculation = new Calculation();
        calculation.calculate(expression.getExpression());
        calculations.add(calculation.calculation);
        return calculation;
    }
}
