class widgetYoutube extends Widget 
{
	
	constructor(id, app) 
	{
		super(id, YoutubeModel, YoutubeView, YoutubeController, app);
	}
	
	setUp() 
	{
		super.setUp();
		this.header = true;
		this.footer = false;
		this.sizeX = 2;
		this.sizeY = 0.5;
		this.radius = 10;
	}
	
	async ready() 
	{
		super.ready();
		
		this.controller.load();
	}
	
}

class YoutubeModel extends WidgetModel 
{
	
	constructor() 
	{
		super();
	}
	
	setUp() 
	{
		super.setUp();
		
	}

}

class YoutubeView extends WidgetView 
{
	
	constructor() 
	{
		super();
	}
	
	setUp() 
	{
		super.setUp();
		
	}

	draw() 
	{
		super.draw();
		this.link = HH.create("a");
		SS.style(this.link, {"fontSize": "10px", "textDecoration": "none"});
		this.stage.appendChild(this.link);
	}
	
	update(title, link) 
	{
		this.link.innerHTML = title;
		HH.attr(this.link, {"href": "https://www.youtube.com" + link, "target": "_blank"});
	}
	
}

class YoutubeController extends WidgetController 
{
	
	constructor() 
	{
		super();
	}
	
	setUp() 
	{
		super.setUp();
		
	}
	
	async load() 
	{
		let result = await this.mvc.main.dom("https://www.youtube.com"); // load web page
		let domstr = _atob(result.response.dom); // decode result
		let parser = new DOMParser(); // init dom parser
		let dom = parser.parseFromString(domstr, "text/html"); // inject result
		let article = new xph().ctx(dom).craft('//*[@id="en-continu"]/div/ul/li[1]/a').firstResult; // find interesting things
		this.mvc.view.update(article.textContent, article.getAttribute("href"));
	}

}