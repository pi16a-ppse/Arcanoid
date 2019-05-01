//Вывод фона на экран
var game = {
	width: 580,
	height: 284,
    context: undefined,
	bat: undefined,
	briksRows: 4,
	briksCols: 8,
	arrayBriks: [],
	art: {
		background: undefined,
		bat: undefined,
		ball: undefined,
		briks: undefined
	},
	
	initialization(){
	    //апи для отрисовки
        var canvas = document.getElementById("mycanvas"); 
        this.context = canvas.getContext("2d");
		
		//Событие нажатия на клавишу
		window.addEventListener("keydown",function(evnt){
		    //Проверяем какая клавиша нажата
			if(evnt.keyCode == 37){ // нажата клавиша влево
			    game.bat.speed = -game.bat.maxSpeed;
			}
			else if(evnt.keyCode == 39){ // нажата правая клавиша
				game.bat.speed = game.bat.maxSpeed;
			}
		});
	},
	
	loadingImage(){
		for(var obj in this.art){
		this.art[obj] = new Image();
	    //Загружаем картинку
	    this.art[obj].src = "img/" + obj +".png";
		}
	},
	
	buildLevel: function(){
		//Вывод блоков
		for(var rows = 0; rows < this.briksRows; rows++){
			for(var cols = 0; cols < this.briksCols; cols++){
				this.arrayBriks.push({
					x: 58 * cols + 50,
					y: 33 * rows + 30,
					width: 54,
					height: 27
				});
			}
		}	
	},
	
	start: function(){		
        this.initialization();
		this.loadingImage();  	
		this.buildLevel();
		this.run();
	  
	},
	
	drawing : function(){
	    //Очищаем выбранную прямоугольную область
		this.context.clearRect(0,0, this.width, this.height);
		//Отрисовываем картинку
	    this.context.drawImage(this.art.background,0,0);
	    this.context.drawImage(this.art.bat, this.bat.x, this.bat.y);
		this.context.drawImage(this.art.ball, this.ball.width * this.ball.part, 0, this.ball.width, this.ball.height, this.ball.x, this.ball.y, this.ball.width, this.ball.height);
		
		this.arrayBriks.forEach(function(element){
			this.context.drawImage(this.art.briks, element.x, element.y);
		}, this);
		
		
	},
	
	run: function(){

		this.drawing();
			    //Вывод изображения на экран
	    window.requestAnimationFrame(function(){
			//Зацикливаем перерисовку анимации
			game.run();  
		});
	}
};
    game.bat = { 
		x: 250,
		y: 258,
		maxSpeed: 6,
		speed: 0,
	};
	
	game.ball = {
	    height: 19,
		width: 19,
		part: 0, 
		x: 285,
		y: 240,
	};
	

// Запускать js код по факту загрузки html-страницы
    window.addEventListener("load",function(){
// По факту загрузки страницы выполняем:
    game.start();
});

