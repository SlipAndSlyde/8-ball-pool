class Game
{
	state;

	container;
	cueBall;
	balls = [];

	constructor()
	{
		this.container = new Container();
		this.table = new Table(960);
		this.cueBall = new CueBall(
			this.table.headStringX,
			this.table.height/2,
			this.table
		);
		this.cueStick = new CueStick();
		this.createObjectBalls();
		this.balls.push(this.cueBall);
		this.addSpritesToContainer();
		this.centralizeGame();

		this.state = "INTERACTION";
	}

	createObjectBalls()
	{
		let t = this.table;

		this.balls.push(
			new ObjectBall(200, 400, t),
			new ObjectBall(400, 100, t),
			new ObjectBall(700, 200, t),
			new ObjectBall(600, 300, t),
			new ObjectBall(100, 400, t),
			new ObjectBall(100, 200, t),
		);
	}

	addSpritesToContainer()
	{
		this.container.addChild(this.table.container);
		this.balls.forEach(ball => {
			this.container.addChild(ball.sprite);
		});
		this.container.addChild(this.cueStick.sprite);
	}

	addParent(container)
	{
		container.addChild(this.container);
	}

	centralizeGame()
	{
		this.container.pivot.x = this.container.width/2;
		this.container.pivot.y = this.container.height/2;
		this.container.x = app.screen.width/2;
		this.container.y = app.screen.height/2;
	}

	areBallsMoving()
	{
		let isMoving = false;
		this.balls.forEach(ball => {
			if(ball.isMoving)
			{
				isMoving = true;
			}
		});

		return isMoving;
	}

	tick()
	{
		if( this.state === "INTERACTION" ||
			this.state === "PREANIMATION")
		{
			this.cueStick.tick(this.cueBall);
		}

		if(this.state === "ANIMATION")
		{
			this.balls.forEach(ball => {
				ball.tick(this.balls);
			});

			if(!this.areBallsMoving())
			{
				//Check if all balls are potted
				this.state = "INTERACTION";
			}
		}

		MOUSE.isMoving = false;
	}
}