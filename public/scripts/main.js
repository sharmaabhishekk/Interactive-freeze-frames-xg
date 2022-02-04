
// xg value
tf.setBackend("cpu");
var xg_val_elm = document.querySelector("h3#xg-value")
//odometer
od = new Odometer({el: xg_val_elm, value: 0.07, format: '(d).dd', theme: 'car', duration:400});
// plotting our pitch and adding ball and player points using interactivesvg.js utilities

pitchColor = 'rgba(0,157,0, 0.8)'
pitchLineColor = 'white'

pitchColor = '#dde7cb' 
pitchLineColor = '#452d32'
circleBorderColor = '#452d32'

// helper function to draw a half-pitch using the interactiveSVG helper tools (allows us to have easily draggable players and ball)
function drawPitch(){

    while (document.querySelector("svg.interactiveSVG")) {
        document.querySelector("svg.interactiveSVG").remove();
    }


    if (screen.width>=800) {
        var width = 800;
        var height = width/2;
        var ball_radius = 7;
        var player_radius = 12;
    } else {
        var width = parseInt(screen.width/100)*100 - 20;
        var height = width/2;
        var ball_radius = width/100;
        var player_radius = ball_radius*1.2;
    }

    draggableObjsAttributes = [
        {"x":350, "y":108, class:"drag-obj active player", r:player_radius, style:`fill:orangered;stroke:${circleBorderColor};stroke-width:1`, title:"player"}, 
        {"x":433, "y":93, class:"drag-obj active player", r:player_radius, style:`fill:orangered;stroke:${circleBorderColor};stroke-width:1`, title:"player"}, 
        {"x":461, "y":150, class:"drag-obj active player", r:player_radius, style:`fill:orangered;stroke:${circleBorderColor};stroke-width:1`, title:"player"}, 
        {"x":490, "y":235, class:"drag-obj active player", r:player_radius, style:`fill:orangered;stroke:${circleBorderColor};stroke-width:1`, title:"player"}, 
        {"x":519, "y":144, class:"drag-obj active player", r:player_radius, style:`fill:orangered;stroke:${circleBorderColor};stroke-width:1`, title:"player"}, 
        {"x":515, "y":87, class:"drag-obj active player", r:player_radius, style:`fill:orangered;stroke:${circleBorderColor};stroke-width:1`, title:"player"}, 
        {"x":312, "y":165, class:"drag-obj active player", r:player_radius, style:`fill:orangered;stroke:${circleBorderColor};stroke-width:1`, title:"player"}, 
        {"x":391, "y":154, class:"drag-obj active player", r:player_radius, style:`fill:orangered;stroke:${circleBorderColor};stroke-width:1`, title:"player"}, 
        {"x":285, "y":107, class:"drag-obj active player", r:player_radius, style:`fill:orangered;stroke:${circleBorderColor};stroke-width:1`, title:"player"}, 
        {"x":350, "y":270, class:"drag-obj active player", r:player_radius, style:`fill:orangered;stroke:${circleBorderColor};stroke-width:1`, title:"player"}, 
        {"x":400, "y":20, class:"drag-obj active player goalkeeper", r:player_radius, style:`fill:dodgerblue;stroke:${circleBorderColor};stroke-width:1`, title:"player"}, 
        {"x":495, "y":172, class:"drag-obj active ball", r:ball_radius, style:`fill:black;stroke:${circleBorderColor};stroke-width:1`, title:"player"}, 
    ] //initial coordinates of all objects based on a 800x400 pitch

    var svg = InteractiveSVG.create('svg', width, height);

    var outline = svg.addElement('rect', {x:0, y:0, width:width, height:height, style:`fill:${pitchColor};stroke-width:2;stroke:${pitchLineColor};box-shadow: 0 0 3px black`});
    var pen_box = svg.addElement('rect', {x:0.225*width, y:0, width:0.55*width, height:0.45*height, style:`fill:transparent;stroke-width:2;stroke:${pitchLineColor};box-shadow: 0 0 3px black`});
    var six_yard_box = svg.addElement('rect', {x:0.375*width, y:0, width:0.25*width, height:0.15*height, style:`fill:transparent;stroke-width:2;stroke:${pitchLineColor};box-shadow: 0 0 3px black`});
    var goal = svg.addElement('rect', {x:0.45*width, y:0, width:0.1*width, height:0.01*height, style:`stroke-width:1;stroke:${pitchLineColor};fill:${pitchLineColor};box-shadow: 0 0 3px black`});

    var corner_right = svg.addPoint({x: width, y: 0, r: 10, static: true, style:`stroke:${pitchLineColor};stroke-width:2;fill:transparent;box-shadow: 0 0 3px black`});
    var corner_left = svg.addPoint({x: 0, y: 0, r: 10, static:true, style:`stroke:${pitchLineColor};stroke-width:2;fill:transparent;box-shadow: 0 0 3px black`});
    var pen_spot = svg.addPoint({x: 0.5*width, y: 0.3*height, r: 2, static: true, style:`stroke:${pitchLineColor};stroke-width:2;fill:${pitchLineColor};box-shadow: 0 0 3px black`});
    var arc = svg.addElement("path", {d:`M ${0.4375*width} ${0.45*height} C ${0.4375*width} ${0.6*height}, ${0.5625*width} ${0.6*height}, ${0.5625*width} ${0.45*height}`,
                                      style:`stroke:${pitchLineColor};fill:transparent;stroke-width:2;box-shadow: 0 0 3px black`})

        //add players and ball
    draggableObjsAttributes.forEach(dragObjAttr => {
        var point = svg.addPoint({x: (dragObjAttr["x"]/800)*width, y: (dragObjAttr["y"]/400)*height, class:dragObjAttr["class"], r: dragObjAttr["r"], style:dragObjAttr["style"]});
})
    draggableObjs = document.querySelectorAll("circle.drag-obj")
    draggableObjs.forEach( el => {
        if (el.classList.contains("player")) {
            if (el.classList.contains("goalkeeper")) {
                var title = "Goalkeeper"
            } else {
                var title = "Opposition Player"
            }
    
        } else {
            var title = "Shot Location"
        }
        el.innerHTML = "<title>"+title+"</title>";
        el.addEventListener("pointerdown", dragStart);
        el.addEventListener("pointerup",  dragEnd);
        el.addEventListener("touchstart", dragStart);
        el.addEventListener("touchend",  dragEnd);
    })
    return draggableObjs
}
draggableObjs = drawPitch()

// for debugging purposes only
function dragStart(e){
    console.log("dragging...")
}
 
function dragEnd(e){
    var predictedXg = getCurrentPred();
    var currentXgValue = parseFloat(document.querySelector("div.odometer-inside").innerText.replace(/\n/g, ''));
    arrowElm = document.querySelector("span.arrow")
    if (currentXgValue > predictedXg) {
        // console.log("decreasing")
        arrowElm.classList.remove("arrow-top");
        arrowElm.classList.add("arrow-bottom");
    } else {
        // console.log("increasing")
        arrowElm.classList.remove("arrow-bottom");
        arrowElm.classList.add("arrow-top");        
    }
    // console.log(predictedXg);
    od.update(predictedXg.toFixed(2))     
}

window.addEventListener("resize", () => {
    draggableObjs = drawPitch()

})

/* 
main function which takes in a scenario and then creates the input tensors for our model and then returns the model 
predicted output to the frontend
*/
function getInputTensor() {
    var svg = document.querySelector("svg.interactiveSVG");
    var width = svg.getAttribute("width");
    var height = svg.getAttribute("height");

    var ball = document.querySelector("circle.drag-obj.ball");
    var gk = document.querySelector(".drag-obj.goalkeeper.active");
    var defenders = document.querySelectorAll("circle.drag-obj.player.active:not(.goalkeeper)");

    // ball
    ballX = ball.getAttribute("cx");
    ballY = ball.getAttribute("cy");

    ballArray = Array(40).fill().map(() => Array(80).fill(0));
    bxIdx = parseInt((parseFloat(ballX)/parseFloat(width))*80);
    byIdx = parseInt((parseFloat(ballY)/parseFloat(height))*40); 

    ballArray[byIdx][bxIdx] = 1;

    // goal keeper
    gkX = gk.getAttribute("cx");
    gkY = gk.getAttribute("cy");

    gkArray = Array(40).fill().map(() => Array(80).fill(0));
    gkxIdx = parseInt((parseFloat(gkX)/parseFloat(width))*80);
    gkyIdx = parseInt((parseFloat(gkY)/parseFloat(height))*40); 

    gkArray[gkyIdx][gkxIdx] = 1;

    //defenders 
    defendersArray = Array(40).fill().map(() => Array(80).fill(0));
    defenders.forEach(defender => {
        dfX = defender.getAttribute("cx");
        dfY = defender.getAttribute("cy");
    
        dfxIdx = parseInt((parseFloat(dfX)/parseFloat(width))*80);
        dfyIdx = parseInt((parseFloat(dfY)/parseFloat(height))*40); 
        defendersArray[dfyIdx][dfxIdx] = 1;
    })

    const shotTensor = tf.tensor2d(ballArray, [40, 80])
    const gkTensor = tf.tensor2d(gkArray, [40, 80])
    const dfTensor = tf.tensor2d(defendersArray, [40, 80])

    // get our auxillary input

    //ball
    var ballX = parseInt(document.querySelector("circle.drag-obj.ball").getAttribute("cx"))
    var ballY = parseInt(document.querySelector("circle.drag-obj.ball").getAttribute("cy"))

    xDist = (Math.abs(width/2 - ballX)/(width))*80;
    yDist = (ballY/height)*40;

    var ballTheta = Math.atan2(yDist, xDist);
    var ballDistance = (yDist**2 + xDist**2)**0.5;

    //goalkeeper

    var gkX = parseInt(document.querySelector("circle.drag-obj.goalkeeper").getAttribute("cx"))
    var gkY = parseInt(document.querySelector("circle.drag-obj.goalkeeper").getAttribute("cy"))

    xDist = (Math.abs(width/2 - gkX)/(width))*80;
    yDist = (gkY/height)*40;

    var gkTheta = Math.atan2(yDist, xDist);
    var gkDistance = (yDist**2 + xDist**2)**0.5;

    const auxInput = tf.tensor2d([ballDistance, ballTheta, gkDistance, gkTheta], [1,4], "float32")

    return [tf.stack([shotTensor.reverse(), gkTensor.reverse(), dfTensor.reverse()], axis=2).reshape([1, 40, 80, 3]), auxInput]
}

// load in our tensorflow model
async function loadModel() {
    model = await tf.loadLayersModel("https://raw.githubusercontent.com/sharmaabhishekk/Interactive-freeze-frames-xg/main/models/model-gk/model.json")
    return model
}

function getCurrentPred() {
    var inputTensor = getInputTensor()
    result = model.predict(inputTensor)
    return result.dataSync()[0]
}

model = loadModel()