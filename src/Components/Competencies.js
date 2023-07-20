import React from 'react'
import Sketch from 'react-p5'

export default function Competencies() {
	const circle1 = new Circle(50, new Coordinate2D(200, 300));
	const movingCircle1 = new FloatingItem(circle1, new Coordinate2D(1, -1));

	const setup = (p5, canvasParentRef) => {
		p5.createCanvas(500, 400).parent(canvasParentRef);
	}

	const draw = (p5) => {
		p5.background(255, 130, 20);
		movingCircle1.updatePosition();
		movingCircle1.draw(p5);
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
}

class Coordinate2D {
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
		this.#x = newPosition[0];
		this.#y = newPosition[1];
	}

	add(v) {
		// Performs vector addition
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

	set position(newPosition) {
		this.#position = newPosition;
	}
}
