// CONST
var minWeight = 1;
var maxWeight = 7;
var initValue = 4;
$level = 1;
ratio = 1;

function init($level){
$('canvas').removeLayers();
sortList = [-1,-1,-1,-1,-1,-1,-1];
value = initValue;

$('canvas').drawLine({
  name:"l1",
  strokeStyle: '#222',
  strokeWidth: 8,
  x1: 70, y1: 200,
  x2: 70, y2: 240,
  layer:true,
  coord:true
})
.drawLine({
  name:"l2",
  strokeStyle: '#222',
  strokeWidth: 8,
  x1: 430, y1: 200,
  x2: 430, y2: 240,
  layer:true,
  coord:true
})
.drawLine({
  name: "enterbox1",
  strokeStyle: '#000',
  strokeWidth: 4,
  x1: 225, y1: 110,
  x2: 210, y2: 90,
  layer:true,
  coord:true
})
.drawLine({
  name:"enterbox2",
  strokeStyle: '#222',
  strokeWidth: 4,
  x1: 275, y1: 110,
  x2: 290, y2: 90,
  layer:true,
  coord:true
});
for (var i = 0; i < 15; i++) { // Conveyor Belt part 1
  $('canvas').drawEllipse({
    fillStyle: '#445',
    x: (30+i*10), y: 200,
    width: 10, height: 10,
    layer:true
  });
};
for (var i = 0; i < 15; i++) { // Conveyor Belt part 2
  $('canvas').drawEllipse({
    fillStyle: '#445',
    x: (330+i*10), y: 200,
    width: 10, height: 10,
    layer:true
  });
};
$('canvas').drawRect({ // Main Box
name:"main box",
strokeStyle: '#000',
fillStyle: '#eee',
shadowColor: '#333',
shadowBlur: 20,
x: 250, y: 180,
width: 160,
height: 140,
cornerRadius: 10,
layer: true
})
.drawRect({ // Number Box
strokeStyle: '#000',
x: 250, y: 230,
width: 30,
height: 30,
cornerRadius: 5,
layer: true
})
.drawRect({ // "-" Box
name: "-box",
strokeStyle: '#000',
fillStyle: '#ccc',
x: 210, y: 230,
width: 20,
height: 20,
layer: true,
click: function(layer) {// click "-"
  Mvalue();
},
touchstart: function(layer) {
  Mvalue();
}
})
.drawText({ // "-" symbol
fillStyle: '#000',
x: 210, y: 230,
fontSize: 22,
fontFamily: 'Verdana, sans-serif',
text: '-',
layer: true
})
.drawRect({ // "+" Box
name: "+box",
strokeStyle: '#000',
fillStyle: '#ccc',
x: 290, y: 230,
width: 20,
height: 20,
layer: true,
click: function(layer) { // click "+"
  Pvalue();
},
touchstart: function(layer) {
  Pvalue();
}
})
.drawText({ // "+" Symbol
fillStyle: '#000',
x: 290, y: 230,
fontSize: 22,
fontFamily: 'Verdana, sans-serif',
text: '+',
layer: true
})
.drawRect({ // equality output box
strokeStyle: '#000',
fillStyle: '#ccc',
x: 250, y: 160,
width: 50,
height: 80,
cornerRadius: 5,
layer: true,
})
.drawRect({ // Evaluating Box
name: "evaluation",
//strokeStyle: '#000', // if visualisation needed, for test purpose
x: 250, y: 75,
width: 60,
height: 70,
layer: true,
});
for (var i = 0; i < 7; i++) {
  $('canvas').drawRect({
    name: "sort"+i,
    type: "sort",
    id: i,
    strokeStyle: '#000',
    fillStyle: '#ccc',
    shadowColor: '#000',
    shadowBlur: 10,
    x: (70+i*60), y: 350,
    width: 50,
    height: 80,
    cornerRadius: 5,
    layer: true
  });
};
setValue(value);
// #============================================= BOTTLES =============================================# //
  bottleList= [];
  if($level==1){
    b = [1,2,3,4,5,6,7];
    shuffle(b);
    bottleList.push(drawBottle("bottle1",b[0],20,40));  
    bottleList.push(drawBottle("bottle2",b[1],60,70));
    bottleList.push(drawBottle("bottle3",b[2],100,40));
    bottleList.push(drawBottle("bottle4",b[3],360,70));  
    bottleList.push(drawBottle("bottle5",b[4],400,40));
    bottleList.push(drawBottle("bottle6",b[5],440,70));
    bottleList.push(drawBottle("bottle7",b[6],480,40)); 
  } else {
    bottleList.push(drawBottle("bottle1",randomWeight(),20,40));  
    bottleList.push(drawBottle("bottle2",randomWeight(),60,70));
    bottleList.push(drawBottle("bottle3",randomWeight(),100,40));
    bottleList.push(drawBottle("bottle4",randomWeight(),360,70));  
    bottleList.push(drawBottle("bottle5",randomWeight(),400,40));
    bottleList.push(drawBottle("bottle6",randomWeight(),440,70));
    bottleList.push(drawBottle("bottle7",randomWeight(),480,40)); 
  }
  // Logging answer
  console.log("Bottle values :");
  bottleList.forEach(function(bottle){console.log(bottle.name+" : "+bottle.weight)});
// #============================================= Select level =============================================# //
$('canvas').drawText({
  name: "level1",
  fillStyle: '#000',
  x: 20, y: 335,
  fontSize: 22,
  fontFamily: 'Verdana, sans-serif',
  text: "I",
  layer: true,
  click: function(layer){
    init(1);
  },
  touchstart: function(layer) {
    init(1);
  }
})
.drawText({
  name: "level2",
  fillStyle: '#000',
  x: 20, y: 365,
  fontSize: 22,
  fontFamily: 'Verdana, sans-serif',
  text: "II",
  layer: true,
  click: function(layer){
    init(2);
  },
  touchstart: function(layer) {
    init(2);
  }
})
.setLayer("level"+$level,{
  fontStyle:"bold"
}).drawLayers();
// #============================================= CHECK RESULT =============================================# //
$('canvas').drawImage({
  source: 'img/check.png',
  x: 475, y: 335,
  layer:true,
  click: function(layer){
    check();
    $('canvas').animateLayer(layer, {
    rotate: '+=360',
    })
  },
  touchstart: function(layer) {
    check();
    $('canvas').animateLayer(layer, {
    rotate: '+=360',
    })
  }
});
// #============================================= RELOAD =============================================# //
$('canvas').drawImage({
  name:"reload",
  source: 'img/reload.png',
  x: 475, y: 365,
  layer:true,
  click: function(layer){
    init($level); 
  },
  touchstart: function(layer) {
    init($level); 
  }
  });
$('canvas').animateLayer('reload', {
    rotate: '+=180'
});
// #============================================= TARGET =============================================# //
if(false){
  $('canvas').drawImage({ // used to test
  name:"target",
  weight:0,
  source: 'img/target.png',
  x: 20, y: 100,
  draggable: true,
  bringToFront: true,
  dragstop: function(layer) {
    fixPosition(layer,layer.x,layer.y);
    console.log(layer.x+" "+layer.y+" => "+layer.ox+" "+layer.oy);
  },
  dragcancel: function(layer) {
    $(this).setLayer(layer,{
      //draggable: true,
      //fn:translate(layer,20,100)
    })
  }
  });
}

$(window).resize();
}

// #============================================= SCRIPT =============================================# //
// reset/testBottle/select setValue/Mvalue/Pvalue check/greset
function test(){
init(1);
  setTimeout(function() {
    Pvalue();
    evaluate('bottle5');
}, 1000);
setTimeout(function() {
    evaluate('bottle4');
    select("bottle4","sort4");
}, 2000);
setTimeout(function() {
    reset("bottle1");
    Mvalue();
    evaluate('bottle3');
    select("bottle4","sort2");
}, 3000);
setTimeout(function() { // Known issue : select() : translation de slot et arrivée sur slot simultané => erreur
    reset("bottle4");
    select("bottle1","sort0");
    select("bottle2","sort1");
    select("bottle3","sort2");
    select("bottle4","sort3");
    select("bottle5","sort4");
    select("bottle6","sort5");
    select("bottle7","sort6");
}, 4000);
setTimeout(function() {
    check();
}, 5000);
}

window.addEventListener( "keypress", test, false )

// #============================================= FUNCTIONS =============================================# //
function setValue(c) {
value=c;
$('canvas').removeLayer("count")
.drawText({
name: 'count',
fillStyle: '#0f0',
x: 250*ratio, y: 230*ratio,
ox: 250, oy:230,
fontSize: 22,
fontFamily: 'Verdana, sans-serif',
text: value,
layer: true,
maxWidth: 2
})
.drawLayers();
}
function Mvalue(){
  if(value>minWeight){
    $('canvas').animateLayer($('canvas').getLayer('-box').name, {
      rotate: '-=180'
    });
  setValue(--value);
  }
}
function Pvalue(){
  if(value<maxWeight){
    $('canvas').animateLayer($('canvas').getLayer('+box').name, {
      rotate: '+=180'
    });
  setValue(++value);
  }
}

function translate(target, xb, yb, callback){
  fixPosition(target.name,xb,yb);
  $('canvas').animateLayer(target, {
  x: xb, y: yb
  }, 300, callback);
}

function on(object,target){
x= getX(object);
y= getY(object);
xt= $('canvas').getLayer(target).x;
yt= $('canvas').getLayer(target).y;
wt= $('canvas').getLayer(target).width;
ht= $('canvas').getLayer(target).height;
return (xt-wt/2< x)&&(x <xt+wt/2)&&(yt-ht/2< y)&&(y <yt+ht/2);
}
function inside(x1,y1,x2,y2){
  var inList = [];
  for (var i = bottleList.length - 1; i >= 0; i--) {
    b=$('canvas').getLayer(bottleList[i].name);
    if((b.x>x1)&&(b.x<x2)&&(b.y>y1)&&(b.y<y2)){
      inList.push(b.name);
    }
  };
  return inList;
}

function getX(layer){
return $('canvas').getLayer(layer).x;
}
function getY(layer){
return $('canvas').getLayer(layer).y;
}
function getWeight(bottle){
return $('canvas').getLayer(bottle).weight;
}

// === Automation function === //
function reset(bottle){
  unsortBottle(bottle);
  var b = $('canvas').getLayer(bottle);
  translate(bottle,b.ox,b.oy);
}
function select(bottle, slot){
  unsortBottle(bottle);
  var s = $('canvas').getLayer(slot);
  var b = $('canvas').getLayer(bottle);
  translate(bottle,getX(s),getY(s));
  sortList[s.id]=b;
  b.sid = s.id;
  b.sorted = true;
}
// === ================== === //
function evaluate(bottle){
  //$('canvas').moveLayer(bottle, 0).drawLayers();
  translate(bottle,getX('evaluation'),getY('evaluation'));
  testBottle(bottle); 
}
function testBottle(layer){
unsortBottle(layer);
$('canvas').moveLayer(layer, 1);
translate(layer,250*ratio,160*ratio,function(){
  if(getWeight(layer)>value){
  translate(layer,344*ratio,160*ratio);
  direction = 1;
  }else if(getWeight(layer)<value){
  translate(layer,156*ratio,160*ratio);
  direction = -1;
  }else{
    $('canvas').moveLayer(layer, 50);
    direction = 0;
  }
  roll(direction);
});
}

function unsortBottle(layer){
  if($('canvas').getLayer(layer).sorted){
    sortList[$('canvas').getLayer(layer).sid]=-1;
    $('canvas').getLayer(layer).sorted=false;
  }
}

function drawBottle($name,$weight,$x,$y){ 
  $('canvas').drawImage({ // BOTTLE
  name:$name,
  weight:$weight,
  sorted: false,
  sid: 0,
  source: 'img/water.png',
  x: $x, y: $y,
  ox: $x, oy: $y,
  width: 512*0.05, height:1349*0.05,  
  draggable: true,
  bringToFront: true,
  dragstart: function(layer) {
    unsortBottle(layer);
  },
  dragstop: function(layer) {
    fixPosition(layer,layer.x,layer.y)
    if(on($name,"evaluation")){     // EVALUATE
      testBottle(layer);
    } else if(s=onSort(layer)){ // SORTED
      select(layer,s);
    } else if(c=collision(layer)){
      correctPos(getX(c),getY(c),layer);
    }
  },
  dragcancel: function(layer) {
    translate(layer,$x,$y); 
  },
  drag: function(layer) {
    // console.log(layer);
    if(on($name,"evaluation")){     // EVALUATE
      $(this).animateLayer("main box", {shadowColor: '#ff0', shadowBlur: 20},0,function(layer) {layer.shadowColor= '#333'});
    }else if(s=onSort(layer)){
      $(this).animateLayer(s, {shadowColor: '#ff0', shadowBlur: 20},0,function(layer) {layer.shadowColor= '#333'});
    }
  }
});
return $('canvas').getLayer($name);
}

function randomWeight(){
  return Math.round((Math.random()*7)+1);
}
function shuffle(array) { // Durstenfeld shuffle
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

function onSort(layer){
  var sortLayers = $('canvas').getLayers(function(layer) {
    return (layer.type === "sort");
  });
  for (var i = sortLayers.length - 1; i >= 0; i--) {
    if(on(layer,sortLayers[i].name) && sortList[i]==-1){// consider not "on" if sort isn't empty
      return sortLayers[i].name;
    }
  };
  return false;
}

function collision(bottle){
  for (var i = bottleList.length - 1; i >= 0; i--) {
    if(on(bottle,bottleList[i].name) && (bottle.name != bottleList[i].name)){
      return bottleList[i].name;
    }
  };
  return false;
}

function correctPos(x,y,bottle){
  if((getX(bottle)<x)&& getX(bottle)>30 || getX(bottle)+30>400){
    translate(bottle,getX(bottle)-30,getY(bottle)); // <==
  } else {
    translate(bottle,getX(bottle)+30,getY(bottle)); // ==>
  }
}

function roll(direction){
  var rList = [];
  if(direction>0){
    rList = inside(330*ratio,140*ratio,470*ratio,195*ratio);
  } else if(direction<0){
    rList = inside(30*ratio,140*ratio,170*ratio,195*ratio);
  }
  rList.sort(function(a, b){return (getX(a)-getX(b))*direction});

  for (var i = 0; i < rList.length; i++){
    if(direction >0){
      translate($('canvas').getLayer(rList[i]),344*ratio+(28*(i+1)*ratio),160*ratio);
    } else if(direction<0){
      translate($('canvas').getLayer(rList[i]),156*ratio-(28*(i+1)*ratio),160*ratio);
    }
  };
  
}

function is_sorted(t) {
    for(var i = 0; i < t.length - 1; ++i) {
        if(t[i].weight > t[i+1].weight ||t[i]==-1) {
            return false;
        }
    }
    return true;
}

function check(){
  if(is_sorted(sortList)){
      win();
    } else {
      lose();
    }
}

function gReset(){ // Global Reset
  var sortLayers = $('canvas').getLayers(function(layer) {
    return (layer.draggable);
  });
  for (var i = sortLayers.length - 1; i >= 0; i--) {
    reset(sortLayers[i]);
  };
}

$(function() {
  init(1);
});