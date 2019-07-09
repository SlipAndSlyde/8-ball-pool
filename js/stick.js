class CueStick
{
	x;
	y;
	vx = 0;
	vy = 0;
	width = 550;
	height = 24;
	rotation;
	visible = false;
	sprite;
	img = "img/stick/cue_stick.svg";
	count = 0;

	constructor()
	{
		this.sprite = new Sprite(resources[this.img].texture);
		this.setSpriteConstants();
		this.updateSpriteVariables();
	}

	get framesToReachBall()
	{
		return 12;
	}

	setSpriteConstants()
	{
		this.sprite.width = this.width;
		this.sprite.height = this.height;
		this.sprite.anchor.set(0, 0.5);
	}

	updateSpriteVariables()
	{
		this.sprite.rotation = this.rotation;
		this.sprite.x = this.x;
		this.sprite.y = this.y;
		this.sprite.visible = this.visible;
	}

	getAngleFromBall(ball)
	{
		let dx = ball.x - this.x,
			dy = ball.y - this.y;
		let tan = Math.atan(dy/dx);

		if(dx === 0 && dy === 0) tan = 0;
		if(dx > 0) tan += Math.PI;

		return tan;

	}

	animateToCueBall()
	{
		this.visible = true;
		this.x += this.vx;
		this.y += this.vy;
		this.count++;
	}

	tick(ball)
	{
		if(GAME.state === "INTERACTION")
		{
			this.visible = true;
			
			this.x = ball.x + ball.dxFromCursor;
			this.y = ball.y + ball.dyFromCursor;

			this.rotation = this.getAngleFromBall(ball);

			if(MOUSE.isClicked)
			{
				let dx = ball.x - this.x,
					dy = ball.y - this.y;
				this.vx = dx / this.framesToReachBall;
				this.vy = dy / this.framesToReachBall;
				this.count = 0;

				GAME.state = "PREANIMATION";
			}
		}

		if(GAME.state === "PREANIMATION")
		{
			if(this.count < this.framesToReachBall)
			{
				this.animateToCueBall();
			} else
			{
				ball.vx = this.vx;
				ball.vy = this.vy;
				this.visible = false;
				GAME.state = "ANIMATION";
			}
		}

		this.updateSpriteVariables();
	}
}