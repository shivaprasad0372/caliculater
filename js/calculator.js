var Calculator = {
   handleInput: function(key){
    $('#preview').append(key);
  },

   previewContent: function(){
    return $('#preview').html();
  },

   deleteLastChar: function(){
    var preview = Calculator.previewContent();
    var newPreview = preview.slice(0,-1);
    $('#preview').html(newPreview);
  },

   keyIsOperator: function(key){
    return(["+","-","X","/"].indexOf(key) != -1);
  },
  handleZero: function(){
    if(Calculator.previewContent() !="0")
    {
      Calculator.handleInput("0");
    }
  },
  handleOperator: function(key){
    var lastChar = Calculator.previewContent().slice(-1);
    if(Calculator.keyIsOperator(lastChar))
    {
      Calculator.deleteLastChar();
    }
    if ((Calculator.previewContent() != "") || (key == "-")){
      Calculator.handleInput(key);
    }
  },
  evaluateResult:function(){
    var result = eval(Calculator.previewContent().replace('X','*'));
    $('#preview').html(result);
    $('#result ').html(result);
  },
  handleDot: function() {
    var patternForLatestNum = /[^\+\-\X\/]*$/;
    var latestNumber = Calculator.previewContent().match(patternForLatestNum)[0];
    if(latestNumber.indexOf(".") == -1) {
      Calculator.handleInput(".");
    }
  },
  handleGenericInput:function(key){
    if(key=="0")
    {
        Calculator.handleZero();
    }
    else if (key== "DEL") {
      Calculator.deleteLastChar();

    } else if (Calculator.keyIsOperator(key)) {
      Calculator.handleOperator(key);

    }
    else if(key == "="){
        Calculator.evaluateResult();
    }
    else if (key == ".") {
      Calculator.handleDot();
    }
    else {
      Calculator.handleInput(key);
    }
  },
  init: function(){
    $('.key').click(function(){
        var key = $(this).html();
        Calculator.handleGenericInput(key);

    });
  }

};




$(document).ready(function(){
  Calculator.init();
});
