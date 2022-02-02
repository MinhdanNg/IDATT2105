<template>
  <div class="calculator">
    <h1> Kalkulator </h1>
    <form class="inputForm" @submit.prevent="calculate">
    <div class="inputBox">
      <input autocomplete="off" id="input" v-model="inputNumber">
    </div>
    <div class="container">
      <div class="numberButtons">
      <button @click="reset">C</button>
      <button @click="getAnswer">ANS</button>
      <button @click="undo">DEL</button>
      <button v-for="(number) in numbers" :key="number" @click="showNumber(number)">{{ number }}</button>
      </div>
      <div class="signButtons">
        <button v-for="(sign, index) in signs" :key="index" @click="addSign(sign)">{{ sign }}</button>
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
      history: [],
      showAnswer: false,
    }
  },
  methods: {
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

    calculate(){
      if(this.inputNumber.length > 0){
        let result = eval(this.inputNumber);
        if(this.signs.some(sign => this.inputNumber.includes(sign)) && !this.showAnswer){
          this.history.push(this.inputNumber + " = " + result);
        }
        this.answer = result;
        this.reset()
        this.inputNumber += (result);
        this.showAnswer = true;
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
