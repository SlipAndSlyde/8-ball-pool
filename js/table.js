class TableHole
{
	constructor()
	{
		
	}
}

class TableEdge
{
	_THICKNESS_SCALE = 24;
	position;
	x;
	y;
	width;
	height;
	sprite;
	img = "img/table/table_edge.svg";

	table;

	constructor(position, table)
	{
		this.table = table;
		this.position = position;
		this.setCoordinates();
		this.setDimensions();
		this.sprite = new Sprite(resources[this.img].texture);
		this.setSpriteConstants();
	}

	setCoordinates()
	{
		switch(this.position)
		{
			case "top":
			case "left":
				this.x = 0;
				this.y = 0;
				break;
			case "right":
				this.x = this.table.width - this._THICKNESS_SCALE;
				this.y = 0;
				break;
			case "bottom":
				this.x = 0;
				this.y = this.table.height - this._THICKNESS_SCALE;
				break;
		}
	}

	setDimensions()
	{
		switch(this.position)
		{
			case "top":
			case "bottom":
				this.width = this.table.width;
				this.height = this._THICKNESS_SCALE;
				break;

			case "right":
			case "left":
				this.width = this._THICKNESS_SCALE;
				this.height = this.table.height;
				break;
		}
	}

	setProperties()
	{
		this.setCoordinates();
		this.setDimensions();
	}

	setSpriteConstants()
	{
		this.sprite.x = this.x;
		this.sprite.y = this.y;
		this.sprite.width = this.width;
		this.sprite.height = this.height;
	}
}

class TableFrame
{
	edges = [];

	constructor(table)
	{
		this.edges.push(
			new TableEdge("top", table),
			new TableEdge("right", table),
			new TableEdge("bottom", table),
			new TableEdge("left", table)
		);
	}
}

class TableBody
{
	width;
	height;
	sprite;
	img = "img/table/table_body.svg";

	constructor(width, height)
	{
		this.width = width;
		this.height = height;
		this.sprite = new Sprite(resources[this.img].texture);
		this.setSpriteConstants();
	}

	setSpriteConstants()
	{
		this.sprite.width = this.width;
		this.sprite.height = this.height;
	}
}

class Table
{
	width;
	height;
	body;
	container;

	constructor(width)
	{
		this.width = width;
		this.height = this.width/2;
		this.container = new Container();
		this.body = new TableBody(this.width, this.height);
		this.frame = new TableFrame(this);
		this.addSpritesToContainer();
	}

	get headStringX()
	{
		return this.width/4;
	}

	addSpritesToContainer()
	{
		this.container.addChild(this.body.sprite);
		this.frame.edges.forEach(edge => {
			this.container.addChild(edge.sprite);
		});
	}
}