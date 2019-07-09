class Ball
{
	x;
	y;
	rad;
	scale = 24/960;
	vx = 0;
	vy = 0;
	minVelocity = 0.1;
	friction = 0.985;
	sprite = null;
	img;

	table;

	constructor(x, y, table, img = "null")
	{
		this.table = table
		this.x = x;
		this.y = y;
		this.img = img;
		this.rad = this.scale/2 * this.table.width;
	}

	get isCueBall()
	{
		return false;
	}

	get width()
	{
		return this.rad*2;
	}

	get height()
	{
		return this.width;
	}

	get dxFromCursor()
	{
		return this.x - MOUSE.x;
	}

	get dyFromCursor()
	{
		return this.y - MOUSE.y;
	}

	get isMoving()
	{
		return this.vx !== 0 || this.vy !== 0;
	}

	setSpriteConstants()
	{
		this.sprite.width = this.width;
		this.sprite.height = this.height;
		this.sprite.anchor.set(0.5, 0.5);
	}

	updateSpriteVariables()
	{
		this.sprite.x = this.x;
		this.sprite.y = this.y;
	}

	getDistanceFromBall(ball)
	{
		let dx = ball.x - this.x,
			dy = ball.y - this.y;

		return Math.sqrt(dx**2 + dy**2);
	}

	isCollideWithBall(ball)
	{
		return this.getDistanceFromBall(ball) < this.rad*2;
	}

	preventBallFromSticking(ball)
	{
		let dx = ball.x - this.x,
			dy = ball.y - this.y;

		let dist = this.getDistanceFromBall(ball);

		let mtx = dx * (this.rad*2 - dist)/dist,
			mty = dy * (this.rad*2 - dist)/dist;

		this.x -= mtx/2;
		this.y -= mty/2;
		ball.x += mtx/2;
		ball.y += mty/2;
	}

	performCollisionWithBall(ball)
	{
		/*
			...and this is what happens when you don't implement vectors!
			:(

			From:
			https://www.youtube.com/watch?v=Am8rT9xICRs
			https://www.vobarian.com/collisions/2dcollisions2.pdf
		*/

		this.preventBallFromSticking(ball);

		let dx = ball.x - this.x,
			dy = ball.y - this.y;

		let dist = this.getDistanceFromBall(ball);

		//Find unit normal vectors
		let unx = dx/dist,
			uny = dy/dist;

		//Find unit tangent vectors
		let utx = -uny,
			uty = unx;

		//Project velocities onto the unit normal and unit tangent vectors
		let v1n = unx*this.vx + uny*this.vy,
			v1t = utx*this.vx + uty*this.vy,
			v2n = unx*ball.vx + uny*ball.vy,
			v2t = utx*ball.vx + uty*ball.vy;

		//Find new normal velocities
		let v1nTag = v2n,
			v2nTag = v1n;

		//Convert the scalar normal and tangential velocities into vectors
		let v1nxTag = unx*v1nTag,
			v1nyTag = uny*v1nTag,
			v1txTag = utx*v1t,
			v1tyTag = uty*v1t;

		let v2nxTag = unx*v2nTag,
			v2nyTag = uny*v2nTag,
			v2txTag = utx*v2t,
			v2tyTag = uty*v2t;

		//Update velocities
		this.vx = v1txTag + v1nxTag;
		this.vy = v1tyTag + v1nyTag;

		ball.vx = v2txTag + v2nxTag;
		ball.vy = v2tyTag + v2nyTag;
	}

	checkCollideTableEdge(tableFrame)
	{
		let top = tableFrame.edges[0],
			right = tableFrame.edges[1],
			bottom = tableFrame.edges[2],
			left = tableFrame.edges[3];

		let topBorder = top.y + top.height + this.rad;
		while(this.y <= topBorder)
		{
			this.y++;
			if(this.y > topBorder) this.bounceOnTableEdge(top);
		}

		let rightBorder = right.x - this.rad;
		while(this.x >= rightBorder)
		{
			this.x--;
			if(this.x < rightBorder) this.bounceOnTableEdge(right);
		}

		let bottomBorder = bottom.y - this.rad;
		while(this.y >= bottomBorder)
		{
			this.y--;
			if(this.y < bottomBorder) this.bounceOnTableEdge(bottom);
		}

		let leftBorder = left.x + left.width + this.rad;
		while(this.x <= leftBorder)
		{
			this.x++;
			if(this.x > leftBorder) this.bounceOnTableEdge(left);
		}
	}

	bounceOnTableEdge(edge)
	{
		switch(edge.position)
		{
			case "top":
			case "bottom":
				this.vy *= -1;
				break;

			case "right":
			case "left":
				this.vx *= -1;
				break;
		}
	}

	tick(balls)
	{
		balls.forEach(ball => {
			if(ball !== this)
			{
				if(this.isCollideWithBall(ball)) this.performCollisionWithBall(ball);
			}
		});

		this.checkCollideTableEdge(this.table.frame);

		this.vx *= this.friction;
		this.vy *= this.friction;
		if(Math.abs(this.vx) < this.minVelocity) this.vx = 0;
		if(Math.abs(this.vy) < this.minVelocity) this.vy = 0;

		this.x += this.vx;
		this.y += this.vy;

		this.updateSpriteVariables();
	}
}

class CueBall extends Ball
{
	constructor(x, y, table)
	{
		super(x, y, table,
			"img/balls/cue_ball.svg"
		);
		this.sprite = new Sprite(resources[this.img].texture);
		this.setSpriteConstants();
		this.updateSpriteVariables();
	}

	get isCueBall()
	{
		return true;
	}
}

class ObjectBall extends Ball
{
	constructor(x, y, table, id)
	{
		super(x, y, table);
		this.id = id;
		this.img = this.getImage(this.id);
		this.sprite = new Sprite(resources[this.img].texture);
		this.setSpriteConstants();
		this.updateSpriteVariables();
	}

	getImage(id)
	{
		//temporary
		return "img/balls/object_ball.svg";
	}
}
