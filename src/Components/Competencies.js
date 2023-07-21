import React from 'react'
import Sketch from 'react-p5'
import competencies from './competencies.json'

const boundaryEnum = {
	NONE: 'none',
	X_AXIS: 'xaxis',
	Y_AXIS: 'yaxis',
	BOTH: 'both'
}

const colour = {
	BLACK: [0,0,0],
	WHITE: [255,255,255],
	BLUE: [0,0,255],
	RED: [255,0,0],
	GREEN: [0,255,0],
	YELLOW: [255,255,0],
	ORANGE: [255,165,0]
}


export default function Competencies(props) {
	// TODO: make canvas sizing dynamic
	const fontSize = 20;
	const speed = 0.6;
	const competencyList = [];
	console.log(competencies);

	// Collect compentencies
	for (const comp in competencies) {
		const spawnTolerance = 100;
		const x = Math.floor(Math.random() * (props.width - 2 * spawnTolerance)) + spawnTolerance;
		const y = Math.floor(Math.random() * (props.height - 2 * spawnTolerance)) + spawnTolerance;
		const heading = Math.floor(Math.random() * (360 + 1));

		const textColour = getColour(competencies[comp]);
		console.log(textColour);
		const text = new Text(comp, new Vector2D(x, y), fontSize, textColour);
		const movingText = new FloatingItem(text, new HeadingVector2D(speed, heading));
		console.log(comp);
		console.log("test")
		competencyList.push(movingText);
	}

	const drawCanvas = (p5) => {
		p5.push();
		p5.noFill();
		p5.stroke(...colour.WHITE);
		p5.rect(0, 0, props.width, props.height);
		p5.pop();
	}

	const setup = async (p5, canvasParentRef) => {
		p5.createCanvas(props.width, props.height).parent(canvasParentRef);
		p5.textFont("Georgia");
		p5.angleMode(p5.DEGREE);
	}

	const draw = (p5) => {
		p5.clear();
		drawCanvas(p5);

		for (const comp of competencyList) {
			comp.updatePosition(p5);
			comp.draw(p5);
		}
		
		// movingAhoy.updatePosition(p5);
		// movingHello.updatePosition(p5);
		// movingNihao.updatePosition(p5);

		// movingAhoy.draw(p5);
		// movingHello.draw(p5);
		// movingNihao.draw(p5);
	}

  return <Sketch setup={setup} draw={draw} />
}

function getColour(textColour) {
	switch (textColour) {
		case 'black':
			return colour.BLACK;
		case 'white':
			return colour.WHITE;
		case 'blue':
			return colour.BLUE;
		case 'red':
			return colour.RED;
		case 'green':
			return colour.GREEN;
		case 'yellow':
			return colour.YELLOW;
		case 'orange':
			return colour.ORANGE;
	}
}

class FloatingItem {
	#item;
	#velocity;
	#angularVelocity;

	constructor(item, velocity) {
		this.#item = item;
		this.#velocity = velocity
		this.#angularVelocity = 0;
	}

	updatePosition(p5) {
		this.bounce(p5);
		this.#item.position.add(this.#velocity);
	}

	draw(p5) {
		this.#item.draw(p5);
	}

	bounce(p5) {
		let boundary = this.#item.atBoundary(p5);

		if (boundary == boundaryEnum.X_AXIS || boundary == boundaryEnum.BOTH) {
			this.#velocity.x *= -1;
		}

		if (boundary == boundaryEnum.Y_AXIS || boundary == boundaryEnum.BOTH) {
			this.#velocity.y *= -1;
		}
	}

	rotate(angle) {
		// TODO
	}
}

class Vector2D {
	#x;			//int
	#y;			// int

	constructor(x, y) {
		this.#x = x;
		this.#y = y;
	}

	get x() {
		return this.#x;
	}

	set x(newX) {
		this.#x = newX;
	}

	get y() {
		return this.#y;
	}

	set y(newY) {
		this.#y = newY;
	}

	position(newPosition) {
		this.#x = newPosition.x;
		this.#y = newPosition.y;
	}

	add(v) {
		this.#x += v.x;
		this.#y += v.y;
	}
}

class HeadingVector2D extends Vector2D {
	constructor(speed, heading) {
		const headingRadians = heading * (Math.PI / 180);
		const x = speed * Math.cos(headingRadians);
		const y = speed * Math.sin(headingRadians);

		super(x, y);
	}
}

class Circle {
	#diameter;				// int
	#position;				// int[]

	constructor(diameter, position) {
		this.#diameter = diameter;
		this.#position = position;
	}

	draw(p5) {
		p5.circle(this.#position.x, this.#position.y, this.#diameter);
	}
	
	get position() {
		return this.#position
	}

}

class Text {
	#string;
	#position;
	#colour;
	#fontSize;

	constructor(string, position = new Vector2D(0,0), fontSize=16, textColour=colour.BLACK) {
		this.#string = string;
		this.#position = position;
		this.#colour = textColour;
		this.#fontSize = fontSize;
	}

	draw(p5) {

		p5.push();
		p5.textSize(this.#fontSize);
		p5.fill(...this.#colour);
		p5.rectMode(p5.CENTER);

		let height = p5.textAscent() + p5.textDescent();
		let width = p5.textWidth(this.#string);

		p5.text(this.#string, this.#position.x, this.#position.y, width, height);
		p5.pop();
	}

	atBoundary(p5) {
		p5.push();
		p5.textSize(this.#fontSize);

		let textHeight = p5.textAscent() + p5.textDescent();
		let textWidth = p5.textWidth(this.#string);
		let xTolerance = textWidth / 2;
		let yTolerance = textHeight / 2;

		p5.pop();

		let atXBoundary = ((this.#position.x - xTolerance) <= 0
							|| (this.#position.x + xTolerance) >= p5.width);
		
		let atYBoundary = ((this.#position.y - yTolerance) <= 0
							|| (this.#position.y + yTolerance) >= p5.height);

		if (atXBoundary && atYBoundary) {
			return boundaryEnum.BOTH;
		} else if (atXBoundary) {
			return boundaryEnum.X_AXIS;
		} else if (atYBoundary) {
			return boundaryEnum.Y_AXIS;
		} else {
			return boundaryEnum.NONE;
		}
	}

	get position() {
		return this.#position;
	}

	get colour() {
		return this.#colour;
	}
}