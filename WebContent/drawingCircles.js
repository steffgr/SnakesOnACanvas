/**
 * Providing functions for creating nice circles on a given canvas
 */
var myCircleArray = new Array();
var myCanvas;
var running = false;

function drawingSomeCircles(){
	myCanvas = document.getElementById("myCanvas");
	clearAll();
	running= true;
	var numberOfCircles = document.getElementById("inputNumberField").value;
	var ctx = myCanvas.getContext("2d");
	for(i=0; i<numberOfCircles;i++){
		var randomDirection = getRandomNumber(4)+1;
		if(randomDirection==1){
			newCircle = new Circle(getRandomNumber(myCanvas.width), getRandomNumber(myCanvas.height), getRandomNumber(40), getRandomColor(), getRandomColor(), true, true);
		}else if (randomDirection==2){
			newCircle = new Circle(getRandomNumber(myCanvas.width), getRandomNumber(myCanvas.height), getRandomNumber(40), getRandomColor(), getRandomColor(), true, false);
		}else if (randomDirection==3){
			newCircle = new Circle(getRandomNumber(myCanvas.width), getRandomNumber(myCanvas.height), getRandomNumber(40), getRandomColor(), getRandomColor(), false, true);
		}else if (randomDirection==4){
			newCircle = new Circle(getRandomNumber(myCanvas.width), getRandomNumber(myCanvas.height), getRandomNumber(40), getRandomColor(), getRandomColor(), false, false);
		}
		drawIt(newCircle, ctx);
		myCircleArray.push(newCircle);
	}	
	
	redrawCircles(myCircleArray, ctx, myCanvas.width, myCanvas.height);
}

function redrawCircles(myCircleArray, ctx, canvasWidth, canvasHeight){
	for(j=0; j<myCircleArray.length; j++){
		

		if(myCircleArray[j].getXDirection()){
			myCircleArray[j].setCenterX( myCircleArray[j].getCenterX()+1 );
		}else{
			myCircleArray[j].setCenterX( myCircleArray[j].getCenterX()-1 );
		}
		
		if(myCircleArray[j].getCenterX()>canvasWidth){
			myCircleArray[j].setXDirection(false);
		}else if (myCircleArray[j].getCenterX()<0){
			myCircleArray[j].setXDirection(true);
		}
		
		if(myCircleArray[j].getYDirection()){
			myCircleArray[j].setCenterY( myCircleArray[j].getCenterY()+1 );
		}else{
			myCircleArray[j].setCenterY( myCircleArray[j].getCenterY()-1 );
		}
		
		if(myCircleArray[j].getCenterY()>canvasHeight){
			myCircleArray[j].setYDirection(false);
		}else if (myCircleArray[j].getCenterY()<0){
			myCircleArray[j].setYDirection(true);
		}
		
		if(running){
			drawIt(myCircleArray[j], ctx)
		}
		
	}
	setTimeout(() => { redrawCircles(myCircleArray, ctx, canvasWidth, canvasHeight); }, 1);
}

function getRandomNumber(max){
	var number = Math.floor(Math.random() * (max));
	return number;
}

function getRandomColor(){
	var color = "rgb("+getRandomNumber(255)+", "+getRandomNumber(255)+", "+getRandomNumber(255)+")"; 
	return color;
}	


class Circle {
	constructor(centerX, centerY, radius, strokeColor, fillColor, Xdirection, Ydirection){
		this.centerX = centerX;
		this.centerY = centerY;
		this.radius = radius;
		this.strokeColor = strokeColor;
		this.fillColor = fillColor;
		this.Xdirection = Xdirection;
		this.Ydirection = Ydirection;
	}
	
	getCenterX(){
		return this.centerX;
	}
	
	getCenterY(){
		return this.centerY;
	}
	
	getRadius(){
		return this.radius;
	}
	
	getStrokeColor(){
		return this.strokeColor;
	}
	
	getFillColor(){
		return this.fillColor;
	}
	
	getXDirection(){
		return this.Xdirection;
	}
	
	getYDirection(){
		return this.Ydirection;
	}
	
	setCenterX(newValue){
		this.centerX = newValue;
	}
	
	setCenterY(newValue){
		this.centerY = newValue;
	}
	
	setXDirection(newDirection){
		this.Xdirection = newDirection;
	}
	
	setYDirection(newDirection){
		this.Ydirection = newDirection;
	}
}

function drawIt(circle, canvasCtx){
	canvasCtx.beginPath();
	canvasCtx.arc(circle.getCenterX(), circle.getCenterY(), circle.getRadius(), 0, 2*Math.PI);
	canvasCtx.strokeStyle = circle.getStrokeColor();
	canvasCtx.lineWidth = getRandomNumber(50);
	canvasCtx.fillStyle = circle.getFillColor();
	canvasCtx.stroke();
	canvasCtx.fill();
}

function clearAll(){
	running=false;
	myCircleArray.length = 0;
	var ctx = myCanvas.getContext("2d");
	ctx.clearRect(0,0, myCanvas.width, myCanvas.height);
	
}