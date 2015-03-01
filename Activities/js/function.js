function win(){
$('canvas').drawRect({ // Main Box
name: "win",
strokeStyle: '#0c0',
shadowColor: '#0c0',
  shadowBlur: 10,
fromCenter: false,
x: 1, y:1,
width: width-2*ratio,
height: height-2*ratio,
strokeWidth: 1*ratio,
cornerRadius: 0,
layer: true
})
.moveLayer('win', 1);
setTimeout(function() {
    $('canvas').removeLayer("win");
}, 4000);
console.log("win!");
}

function lose(){
$('canvas').drawRect({ // Main Box
name : "lose",
strokeStyle: '#c00',
shadowColor: '#c00',
  shadowBlur: 10,
fromCenter: false,
x: 1, y:1,
width: width-2*ratio,
height: height-2*ratio,
strokeWidth: 1*ratio,
cornerRadius: 0,
layer: true
})
.moveLayer('lose', 1);
//setTimeout(gReset, 1000);
setTimeout(function() {
    $('canvas').removeLayer("lose");
}, 4000);
}
// RESIZE
$( window ).resize(function() {
  // $('canvas').removeLayers();
  height = $(window).height(),width = (5/4)*height;
  ratio = width/500;
  canvas = document.getElementById("canvas");
  canvas.setAttribute('width',width);  
  canvas.setAttribute('height',height);

  $('canvas').setLayers({
   scale:ratio,
 });

  resizeLayers = $('canvas').getLayers();
  for (var i = resizeLayers.length - 1; i >= 0; i--) {
  if(resizeLayers[i].ox==undefined){ // save original position
    resizeLayers[i].ox = resizeLayers[i].x;
    resizeLayers[i].oy = resizeLayers[i].y;
  }
  if(!resizeLayers[i].coord){
    resizeLayers[i].x = Math.round(resizeLayers[i].ox*ratio);
    resizeLayers[i].y = Math.round(resizeLayers[i].oy*ratio);
  }
};
$('canvas').drawLayers();
});

function fixPosition(layer,x,y){
  $('canvas').setLayer(layer, { ox : x/ratio, oy : y/ratio });
}