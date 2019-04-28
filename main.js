//Вывод фона на экран
var game = {
	width: 580,
	height: 284,
    context: undefined,
	bat: undefined,
	art: {
		background: undefined,
		bat: undefined,
		ball: undefined
	},
	
	initialization(){
	    //апи для отрисовки
        var canvas = document.getElementById("mycanvas"); 
        this.context = canvas.getContext("2d");
	},
	
	loadingImage(){
		for(var obj in this.art){
		this.art[obj] = new Image();
	    //Загружаем картинку
	    this.art[obj].src = "img/" + obj +".png";
		}
	},
	
	start: function(){		
        this.initialization();
		this.loadingImage();  
		this.run();
	  
	},
	
	drawing : function(){
	    //Очищаем выбранную прямоугольную область
		this.context.clearRect(0,0, this.width, this.height);
		//Отрисовываем картинку
	    this.context.drawImage(this.art.background,0,0);
	    this.context.drawImage(this.art.bat, this.bat.x, this.bat.y);
		this.context.drawImage(this.art.ball, this.ball.width * this.ball.part, 0, this.ball.width, this.ball.height, this.ball.x, this.ball.y, this.ball.width, this.ball.height);
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

