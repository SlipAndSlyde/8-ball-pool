let type = "WebGL";
if(!PIXI.utils.isWebGLSupported())
{
	type = "canvas";
}

PIXI.utils.sayHello(type);

const Application = PIXI.Application,
	loader = PIXI.Loader.shared,
	resources = PIXI.Loader.shared.resources,
	renderer = PIXI.Renderer;
	Sprite = PIXI.Sprite,
	Container = PIXI.Container;

const app = new Application(
{
	antialias: true,
	transparent: false,
	resolution: 1,
});

app.renderer.view.style.position = "absolute";
app.renderer.view.style.display = "block";
app.renderer.autoDensity = true;
app.renderer.resize(window.innerWidth, window.innerHeight);
app.renderer.backgroundColor = 0x000000;

app.stage.interactive = true;

document.body.appendChild(app.view);

loader
	.add([
		"img/null.png",
		"img/table/table_body.svg",
		"img/table/table_edge.svg",
		"img/balls/cue_ball.svg",
		"img/stick/cue_stick.svg",
		"img/balls/object_ball.svg"
	])
	.load(setup);

let GAME, MOUSE;

function setup()
{
	console.log(
		"What to do next:\n" +
		"Work out ball to ball collision and response"
	);

	GAME = new Game();
	GAME.addParent(app.stage);
	MOUSE = new MouseHandler(app.stage, GAME.container);

	app.ticker.add(delta => gameLoop(delta));
}

function gameLoop(delta)
{
	GAME.tick()
}
