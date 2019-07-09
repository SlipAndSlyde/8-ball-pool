class MouseHandler
{
	interaction = app.renderer.plugins.interaction;
	stage;
	offsetX;
	offsetY;
	isClicked = false;
	isMoving = false;

	constructor(stage, container)
	{
		this.offsetX = container.x - container.width/2;
		this.offsetY = container.y - container.height/2;
		this.stage = stage;
		this.setEventHandlers();
	}

	get position()
	{
		return this.interaction.mouse.global;
	}

	get x()
	{
		return this.position.x - this.offsetX;
	}

	get y()
	{
		return this.position.y - this.offsetY;
	}

	setEventHandlers()
	{
		this.stage.pointerdown = (e) => {
			this.isClicked = true;
		}
		
		this.stage.pointerup = (e) => {
			this.isClicked = false;
		}

		this.stage.mousemove = (e) => {
			this.isMoving = true;
		}
	}
}