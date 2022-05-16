var traverseDomAndCollectElements = function(matchFunc, startEl) {
  var resultSet = [];

  if (typeof startEl === "undefined") {
    startEl = document.body;
  }

  // recorre el árbol del DOM y recolecta elementos que matchien en resultSet
  // usa matchFunc para identificar elementos que matchien

  // TU CÓDIGO AQUÍ
  if (matchFunc(startEl)) {
    resultSet.push(startEl); 
  }
 
  for(let i = 0; i < startEl.children.length; i++ ){ // genera array con TODOS los hijos de doc
    var elements = traverseDomAndCollectElements(matchFunc, startEl.children[i]);
    resultSet = [...resultSet, ...elements]; //acumula resultSet anterior y elements
  };

  return resultSet; 

};

// Detecta y devuelve el tipo de selector
// devuelve uno de estos tipos: id, class, tag.class, tag


var selectorTypeMatcher = function(selector) {
  // tu código aquí
  var arraySelector = selector.split("");
  if(arraySelector[0] == '#'){
    return 'id'; 
  } else if(arraySelector[0] == '.'){
    return "class"; 
  } else if(selector === "div"){
    return "tag";
  } else {
    return "tag.class";
  }
};

// NOTA SOBRE LA FUNCIÓN MATCH
// recuerda, la función matchFunction devuelta toma un elemento como un
// parametro y devuelve true/false dependiendo si el elemento
// matchea el selector.

var matchFunctionMaker = function(selector) {
  var selectorType = selectorTypeMatcher(selector);
  var matchFunction;
  if (selectorType === "id") { 
    matchFunction = function (el){
      var gettingId = "#" + el.id; 
      if ( gettingId === selector) { return true;
      } else { return false; }
    }
      
  } else if (selectorType === "class") {
    matchFunction = function (el){
      if( el.className && el.className.split(" ").includes(selector.slice(1))){
        return true; } else { return false; }    
    }
    
  } else if (selectorType === "tag.class") {
    matchFunction = function(el){ // el es un elemento de html
    let sep = selector.split(".");
    return (el.tagName.toLowerCase() === sep[0].toLowerCase()) && el.className && (el.className.split(" ").includes(sep[1]));
    }
  }
    else if (selectorType === "tag") {
    matchFunction = function (el) {
    return el.tagName && (el.tagName.toLowerCase() === selector.toLowerCase());}
  }
  return matchFunction;
};

var $ = function(selector) {
  var elements;
  var selectorMatchFunc = matchFunctionMaker(selector);
  elements = traverseDomAndCollectElements(selectorMatchFunc);
  return elements;
};
