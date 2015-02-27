// CONST
$level = 1;
ratio = 1;
player = {
  x: 4,
  y: 4,
  dir: 0
};
lockForward = false;
lockRotate = false;

function init($level){

  $('canvas').drawRect({ // Main Box
    name : 'mainBox',
    strokeStyle: '#000',
    fillStyle: '#eee',
    shadowColor: '#000',
    shadowBlur: 10,
    x: 200, y: 200,
    width: 398,
    height: 398,
    cornerRadius: 10,
    layer: true
  });
  for (var i = 0; i < 8; i++) {
    $('canvas').drawLine({
      name:"l1"+i,
      strokeStyle: '#ccc',
      shadowColor: '#aaa',
      shadowBlur: 20,
      strokeWidth: 2,
      x1: 400/9*(i+1)+2, y1: 0+2,
      x2: 400/9*(i+1)-2, y2: 400-2,
      layer:true,
      coord:true
    });
  };

  for (var i = 0; i < 8; i++) {
    $('canvas').drawLine({
      name:"l2"+i,
      strokeStyle: '#ccc',
      shadowColor: '#aaa',
      shadowBlur: 20,
      strokeWidth: 2,
      x1: 0+2, y1: 400/9*(i+1)+2,
      x2: 400-2, y2: 400/9*(i+1)-2,
      layer:true,
      coord:true
    });
  };
  $('canvas').drawRect({ // Forward Box
    name: "Forward",
    strokeStyle: '#000',
    fillStyle: '#ccc',
    x: 450, y: 200,
    width: 90,
    height: 30,
    layer: true,
  click: function(layer) { // Click Forward
    if(!lockForward){
      forward();
    }
  },
  touchstart: function(layer) {
    if(!lockForward){
      forward();
    }
  }
  })
  .drawText({ // Forward Text
    fillStyle: '#000',
    x: 450, y: 200,
    fontSize: 22,
    fontFamily: 'Verdana, sans-serif',
    text: 'Forward',
    layer: true
  })
  .drawRect({ // Left Box
    name: "Left",
    strokeStyle: '#000',
    fillStyle: '#ccc',
    x: 450, y: 200-400/9,
    width: 90,
    height: 30,
    layer: true,
  click: function(layer) { // Click Left
    if(!lockRotate){
      turn(-1);
    }
  },
  touchstart: function(layer) {
    if(!lockRotate){
      turn(-1);
    }
  }
  })
  .drawText({ // Left Text
    fillStyle: '#000',
    x: 450, y: 200-400/9,
    fontSize: 22,
    fontFamily: 'Verdana, sans-serif',
    text: 'Left',
    layer: true
  })
  .drawRect({ // Right Box
    name: "Right",
    strokeStyle: '#000',
    fillStyle: '#ccc',
    x: 450, y: 200+400/9,
    width: 90,
    height: 30,
    layer: true,
  click: function(layer) { // Click Right
    if(!lockRotate){
      turn(1);
    }
  },
  touchstart: function(layer) {
    if(!lockRotate){
      turn(1);
    }
  }
  })
  .drawText({ // Right Text
    fillStyle: '#000',
    x: 450, y: 200+400/9,
    fontSize: 22,
    fontFamily: 'Verdana, sans-serif',
    text: 'Right',
    layer: true
  })
    .drawImage({ // Player
    name: 'player',
    source: 'img/pacman.png',
    x: 400/18+400/9*player.x, y: 400/18+400/9*player.y,
    posX:player.x,posY:player.y,
    dir : player.dir,
    width: 36, height: 36,
    layer: true
  });
  
  drawObstacle(2,2);
  drawObstacle(5,7);
  drawObstacle(3,5);
  drawObstacle(8,6);
  drawObstacle(6,0);
  drawFlag(8,4);
  setTimeout(function() {
    $( window ).resize();
}, 100);

}

// =========================== Functions =========================== //
function forward(){
  lockForward = true;
  var dir = [{x:1,y:0},{x:0,y:-1},{x:-1,y:0},{x:0,y:1}];
  player = $('canvas').getLayer('player');
  if(collision(player.posX+dir[player.dir].x,player.posY+dir[player.dir].y)){lockForward=false; return;}
  player.posX += dir[player.dir].x;
  player.posY += dir[player.dir].y;
  onFlag(player.posX,player.posY);
  $('canvas').animateLayer(player.name,{
    x:coordToGrid(player.posX),
    y:coordToGrid(player.posY)
  },300,function(){lockForward=false;});
  fixPosition(player,player.posX,player.posY);
}

function turn(dir){
  lockRotate = true;
  player = $('canvas').getLayer('player');
  player.dir = Math.abs(4 + player.dir - dir)%4;
  newAngle = (player.rotate+90*dir);
  $('canvas').animateLayer(player.name,{
    rotate:newAngle
  },300,function(){lockRotate=false;});
}

function collision(x,y){
  if(x<0 || y <0 || x>8 || y>8){
    return "bound";
  }
  oList =$('canvas').getLayers(function(layer) {
    return (layer.obstacle === true);
  });
  for (var i = oList.length - 1; i >= 0; i--) {
    if(collide(oList[i],x,y)){
      return "obstacle";
    }
  }

  return false;
}

function collide(a,x,y){
  if(a.posX==x && a.posY==y){
    return true;
  }
  return false;
}

function onFlag(x,y){
  fList =$('canvas').getLayers(function(layer) {
    return (layer.flag === true);
  });
  for (var i = fList.length - 1; i >= 0; i--) {
    if(collide(fList[i],x,y)){
      win();
    }
  }

  return false;
}

function coordToGrid(z){
  return 400*ratio/18+400*ratio/9*z;
}
function drawObstacle (x,y) {
  $('canvas').drawImage({ // Obsctacle
    name : 'o'+ Math.random(),
    obstacle:true,
    source: 'img/brick.png',
    x: coordToGrid(x), y: coordToGrid(y),
    posX:x,posY:y,
    width: 40, height: 40,
    layer: true
  });
}

function drawFlag(x,y){
$('canvas').drawImage({ // Obsctacle
    name : 'f'+ Math.random(),
    flag:true,
    source: 'img/flag.png',
    x: coordToGrid(x), y: coordToGrid(y),
    posX:x,posY:y,
    width: 40, height: 40,
    layer: true
  });
}

$(function() {
  init(1);
});

function test(){
  console.log($('canvas').getLayers(function(layer) {
    return (layer.flag === true);})[0]);
  console.log($('canvas').getLayer('player'));
}

function keypress(event){
  console.log(event);
  if(event.which == 122 && !lockForward){// Z
    forward();
  } else if(event.which == 113 && !lockRotate){ // Q
    turn(-1);
  } else if(event.which == 100 && !lockRotate){ // D
    turn(1);
  }
}
window.addEventListener( "keypress", keypress, false )