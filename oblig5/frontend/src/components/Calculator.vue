<template>
  <div class="calculator">
    <h1> Kalkulator </h1>
    <form class="inputForm" @submit.prevent="calculate">
    <div class="inputBox">
      <input autocomplete="off" id="input" v-model="inputNumber" @keypress="validation($event)" @keyup.enter="calculate">
    </div>
    <div class="container">
      <div class="numberButtons">
      <button @click="reset" type="button">C</button>
      <button @click="getAnswer" type="button">ANS</button>
      <button @click="undo" type="button">DEL</button>
      <button v-for="(number) in numbers" :key="number" @click="showNumber(number)" type="button">{{ number }}</button>
      </div>
      <div class="signButtons">
        <button v-for="(sign, index) in signs" :key="index" @click="addSign(sign)" type="button">{{ sign }}</button>
        <input type="submit" class="submitButton" style="background-color: darkorange" value="=">
      </div>
    </div>
    </form>
    <div class="history">
      <h3>Logg:</h3>
      <ul>
        <li v-for="(calculation, index) in history" :key="index">{{ calculation }}</li>
      </ul>
    </div>
  </div>

</template>

<script>
import {calculate} from "../services/CalculationService";

export default {
  name: 'Calculator',
  props: {
  },
  data() {
    return {
      numbers: [...Array(10).keys()," ", 0, ","].slice(1),
      signs: ["+", "-", "*", "/"],
      inputNumber: "",
      answer: "",
      commaCheck: "",
      showAnswer: false,
      history: [],
    }
  },
  methods: {
    validation($event){
      this.checkForReset();
      if($event.charCode > 47 && $event.charCode < 58){
        return true;
      } else if($event.charCode > 42 && $event.charCode < 48){
        this.addSign($event.key);
        $event.preventDefault();
      } else {
        $event.preventDefault();
      }
    },
    reset(){
      this.inputNumber = "";
      this.showAnswer = false;
      this.commaCheck = "";
    },
    checkForReset(){
      if(this.showAnswer){
        this.reset();
      }
    },
    getAnswer(){
      this.checkForReset();
      if(this.inputNumber.length === 0 || this.signs.some(sign => this.inputNumber.charAt(this.inputNumber.length - 1) === (sign))){
        this.inputNumber += (this.answer);
      } else {
        this.inputNumber+=("*" + this.answer);
      }
    },
    undo(){
      this.checkForReset();
      this.commaCheck = this.commaCheck.substring(0, this.commaCheck.length - 1);
      this.inputNumber = this.inputNumber.substring(0, this.inputNumber.length - 1);
    },
    showNumber(number){
      this.checkForReset();
      if(!((number === "." || number === ",") && this.commaCheck.includes(number))){
        this.commaCheck += number;
        if(number === "." || number === ","){
          this.inputNumber += (".")
        } else {
          this.inputNumber += (number);
        }
      }
    },
    addSign(sign){
      if(this.showAnswer){
        this.showAnswer = false;
      }
      if(this.inputNumber.length>0 && !isNaN(this.inputNumber[this.inputNumber.length - 1])){
        this.inputNumber += sign;
        this.commaCheck = "";
      }
    },

    async calculate(){
      if(this.inputNumber.length > 0){
        if(this.signs.some(sign => this.inputNumber.includes(sign)) && !this.showAnswer){
          // this.answer = eval(this.inputNumber);
          const calculationResponse = await calculate(this.inputNumber)
          this.answer = calculationResponse
          /*let result = {
            inputNumber: this.inputNumber,
            answer: calculationResponse,
          }*/
          console.log(this.answer);
          console.log(calculationResponse);
          this.history.push(this.inputNumber + " = " + this.answer);
          this.inputNumber = this.answer;
          this.showAnswer = true;

          //this.$emit('calculated', result);
        }
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.container, .signButtons, .numberButtons{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.container{
  margin: auto;
  flex-direction: row;
  width: 700px;
}
.numberButtons {
  width: 500px;
}
.signButtons{
  flex-direction: column;
}
#input {
  text-align: center;
  width: 700px;
  height: 45px;
  margin: auto;
  background-color: dimgrey;
  color: transparent;
  text-shadow: 0 0 0 white;
  border-radius: 5px;
  font-size: 20px;
  line-height:45px;
}
button, .submitButton{
  width: 140px;
  height: 45px;
  margin-top: 10px;
  background-color: dimgrey;
  color: white;
  border-radius: 5px;
  font-size: 20px;
}
.history {
  border: solid black 2px;
  text-align: left;
  width: 650px;
  height: 250px;
  margin: 10px auto;
  padding: 10px;
  overflow: scroll;
}
li {
  margin: 15px 0;
}
</style>
