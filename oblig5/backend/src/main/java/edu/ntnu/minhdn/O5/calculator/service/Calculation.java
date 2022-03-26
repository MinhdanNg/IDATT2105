package edu.ntnu.minhdn.calculator.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class Calculation {
    public String calculation;
    public double number1;
    public double number2;
    public String operator;
    public double result;

    Logger logger = LoggerFactory.getLogger(Calculation.class);

    public void setNumbers(String expression){
        String numberBuilder = "";
        for(int i = 0; i < expression.length(); i++){
            if(isNumeric(String.valueOf(expression.charAt(i)))){
                numberBuilder += String.valueOf(expression.charAt(i));
            } else {
                number1 = Integer.parseInt(numberBuilder);
                numberBuilder = "";
                this.operator = String.valueOf(expression.charAt(i));
            }
            if(i == expression.length() -1){
                number2 = Integer.parseInt(numberBuilder);
            }
        }
    }

    public double calculate(String expression){
        setNumbers(expression);
        switch (operator) {
            case "+":
                result = number1 + number2;
                break;
            case "-":
                result = number1 - number2;
                break;
            case "*":
                result = number1 * number2;
                break;
            case "/":
                result = number1 / number2;
                break;
            default:
                logger.warn("Invalid operator");
                System.out.println("Invalid operator!");
                break;
        }
        this.calculation = expression + " = " + result;
        return result;
    }
    public static boolean isNumeric(String strNum) {
        if (strNum == null) {
            return false;
        }
        try {
            double d = Double.parseDouble(strNum);
        } catch (NumberFormatException nfe) {
            return false;
        }
        return true;
    }
}
