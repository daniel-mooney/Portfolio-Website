import React from 'react'
import Sketch from 'react-p5'

export default function Competencies() {
	const circle1 = new Circle(50, new Vector2D(200, 300));
	const movingCircle1 = new FloatingItem(circle1, new Vector2D(1, -1));
	const text1 = new Text("Hello", new Vector2D(20, 20));
	const movingText1 = new FloatingItem(text1, new Vector2D(0.2, 0.2));

	const setup = async (p5, canvasParentRef) => {
		p5.createCanvas(600, 350).parent(canvasParentRef);
		p5.textFont("Georgia");
		p5.angleMode(p5.DEGREE);
	}

	const draw = (p5) => {
		p5.clear();
		p5.background(255, 130, 20);
		
		movingCircle1.updatePosition();
		movingText1.updatePosition();

		movingCircle1.draw(p5);
		movingText1.draw(p5);
	}

  return <Sketch setup={setup} draw={draw} />
}

class FloatingItem {
	#item;
	#velocity;				// int[]

	constructor(item, velocity) {
		this.#item = item;
		this.#velocity = velocity
	}

	updatePosition() {
		this.#item.position.add(this.#velocity);
	}

	draw(p5) {
		this.#item.draw(p5);
	}

	rotate(angle) {
		let 
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

	get y() {
		return this.#y;
	}

	set position(newPosition) {
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
		p5.text(this.#string, this.#position.x, this.#position.y);
	}

	get position() {
		return this.#position;
	}

	get colour() {
		return this.#colour;
	}
}