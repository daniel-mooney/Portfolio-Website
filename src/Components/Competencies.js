import React from 'react'
import Sketch from 'react-p5'

const boundaryEnum = {
	NONE: 'none',
	X_AXIS: 'xaxis',
	Y_AXIS: 'yaxis',
	BOTH: 'both'
}


export default function Competencies() {
	const text1 = new Text("Hello", new Vector2D(250, 250));
	const movingText1 = new FloatingItem(text1, new Vector2D(0.8, 0.8));

	const setup = async (p5, canvasParentRef) => {
		p5.createCanvas(600, 350).parent(canvasParentRef);
		p5.textFont("Georgia");
		p5.angleMode(p5.DEGREE);
	}

	const draw = (p5) => {
		p5.clear();
		p5.background(255, 130, 20);
		
		movingText1.updatePosition(p5);
		movingText1.draw(p5);
	}

  return <Sketch setup={setup} draw={draw} />
}

class FloatingItem {
	#item;
	#velocity;

	constructor(item, velocity) {
		this.#item = item;
		this.#velocity = velocity
	}

	updatePosition(p5) {
		this.bounce(p5);
		// console.log(`[${this.#velocity.x}, ${this.#velocity.y}]`);
		this.#item.position.add(this.#velocity);
	}

	draw(p5) {
		this.#item.draw(p5);
	}

	bounce(p5) {
		let boundary = this.#item.atBoundary(p5);

		if (boundary == boundaryEnum.X_AXIS || boundary == boundaryEnum.BOTH) {
			let currX = this.#velocity.x;
			this.#velocity.x = currX * -1;
		}

		if (boundary == boundaryEnum.Y_AXIS || boundary == boundaryEnum.BOTH) {
			let currY = this.#velocity.y;
			this.#velocity.y *= this.#velocity.y * -1;
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

	constructor(string, position = new Vector2D(0,0)) {
		this.#string = string;
		this.#position = position;
	}

	draw(p5) {
		let height = p5.textAscent() + p5.textDescent();
		let width = p5.textWidth(this.#string);

		p5.push();
		p5.rectMode(p5.CENTER);
		p5.text(this.#string, this.#position.x, this.#position.y, width, height);
		p5.pop();
	}

	atBoundary(p5) {
		let textHeight = p5.textAscent() + p5.textDescent();
		let textWidth = p5.textWidth(this.#string);
		let xTolerance = textWidth / 2;
		let yTolerance = textHeight / 2;

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