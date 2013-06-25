var stage;
var queue;
function init() {
    //Create stage object - our root level container
    stage = new createjs.Stage("demoCanvas");

    //Create a load queue to handle preloading assets
    queue = new createjs.LoadQueue(false);
    queue.installPlugin(createjs.Sound);
    queue.addEventListener("complete", handleComplete);
    queue.loadManifest([{id:"daisy", src:"assets/img/daisy.png"}, {id:"sound", src:"assets/sound/pop.mp3"}]);

}

function handleComplete(event) {
    //Create interactive object, using EaselJS Drawing API
    var ball = new createjs.Shape();
    ball.addEventListener("click", handleClick);
    ball.graphics.beginFill("#000000").drawCircle(0, 0, 50);
    ball.x = 50;
    ball.y = 200;

    //Creates animation of display object
    createjs.Tween.get(ball, {loop:true}).to({x:450}, 3000).to({x:50}, 3000);

    //Listening for a tick event that will update the stage
    createjs.Ticker.addEventListener("tick", tick);

    stage.addChild(ball);
}

//Handle mouse interaction
function handleClick(event) {
    //Create a bitmap (daisy) and display a random position on stage
    var bmp = new createjs.Bitmap(queue.getResult("daisy"));
    bmp.x = Math.random()*500;
    bmp.y = Math.random()*500;

    stage.addChild(bmp);

    createjs.Sound.play("sound");
}

//Need when having animation.
function tick(event) {
    stage.update();
}