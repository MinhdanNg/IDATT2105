<template>
  <div class="calculator">
    <h1> Kalkulator </h1>
    <div class="inputBox">
      <text id="input" v-for="(number, index) in inputNumber" :key="index" >{{ number }}</text>
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
        <button @click="calculate" style="background-color: darkorange">=</button>
      </div>
    </div>
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
      inputNumber: [ ],
      answer: null,
      commaCheck: "",
      history: [],
      showAnswer: false,
    }
  },
  methods: {
    reset(){
      this.inputNumber.length = 0;
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
      if(this.inputNumber.length === 0 || this.signs.some(sign => this.inputNumber[this.inputNumber.length-1] === (sign))){
        this.inputNumber.push(this.answer);
      } else {
        this.inputNumber.push("*" + this.answer);
      }
    },
    undo(){
      this.checkForReset();
      this.commaCheck = this.commaCheck.substring(0, this.commaCheck.length - 1);
      this.inputNumber.pop();
    },
    showNumber(number){
      this.checkForReset();
      if(!((number === "." || number === ",") && this.commaCheck.includes(number))){
        this.commaCheck += number;
        if(number === "." || number === ","){
          this.inputNumber.push(".")
        } else {
          this.inputNumber.push(number);
        }
      }
    },
    addSign(sign){
      if(this.showAnswer){
        this.showAnswer = false;
      }
      if(this.inputNumber.length>0 && !isNaN(this.inputNumber[this.inputNumber.length - 1])){
        this.inputNumber.push(sign);
        this.commaCheck = "";
      }
    },

    calculate(){
      if(this.inputNumber.length > 0){
        let calculation = "";
        for(let i = 0; i < this.inputNumber.length; i++) {
          calculation += this.inputNumber[i];
        }

        let result = eval(calculation);
        if(this.signs.some(sign => calculation.includes(sign)) && !this.showAnswer){
          this.history.push(calculation + " = " + result);
        }
        this.answer = result;
        this.reset()
        this.inputNumber.push(result);
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
.inputBox {
  width: 700px;
  height: 45px;
  margin: auto;
  background-color: dimgrey;
  color: white;
  border-radius: 5px;
  font-size: 20px;
  line-height:45px;
}
button{
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
