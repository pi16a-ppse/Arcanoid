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
			else if(evnt.keyCode == 32){ // нажатие пробела
			    game.bat.runBall();
			}
		});
		//Событие отпускания клавиши
		window.addEventListener("keyup",function(evnt){
			game.bat.stop();
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
					height: 27,
					isAlive: true
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
			if(element.isAlive){
			this.context.drawImage(this.art.briks, element.x, element.y);
			}
		}, this);
		
		
	},
	
	
	//Обновить информацию
	refresh: function(){
	    	if(this.bat.speed){
			    this.bat.move();
		    }
			if(this.ball.speedX || this.ball.speedY){
			    this.ball.move();
		    }
			this.arrayBriks.forEach(function(element){
			if(element.isAlive){	
				if(this.ball.colliding(element)){
				    this.ball.collideBrik(element);	
				}
			}
		}, 	this);
		this.ball.checkBounds();
	},

	
	run: function(){
		this.refresh();
	    //нарисовать с учетом обновлений	
		this.drawing();
			    //Вывод изображения на экран 
	    window.requestAnimationFrame(function(){
			//Повторить все это 
			game.run();  
		});
	}
};

	game.ball = {
	    height: 19,
		width: 19,
		part: 0, 
		x: 285,
		y: 240,
		speedX: 0,
		speedY: 0,
		maxSpeed: 3,
		pushOf: function(){
			this.speedX = -this.maxSpeed;
			this.speedY = -this.maxSpeed;
		},
		//Изменение координаты мяча относительно скорости 
		move: function(){
			this.x += this.speedX;
			this.y += this.speedY;
		},
		//Столкновение мяча с элементом
		colliding: function(element){
			//координаты на следующем кадре анимации
			var nextX = this.x + this.speedX;
			var nextY = this.y + this.speedY;
			
			if(nextX + this.width > element.x && 
				nextX < element.x + element.width &&
				nextY + this.height > element.y &&
				nextY < element.y + element.height
			){
				return true;
			}
			return false;
		},
		collideBrik: function(briks){
			 this.speedY *= -1;
			 briks.isAlive = false;
		},
		checkBounds: function(){
			//проверка выхода за пределы экрана
			var nextX = this.x + this.speedX;
			var nextY = this.y + this.speedY;
			
			if(nextX < 0){ // Если мяч касается левой стороны
				this.x = 0;
				this.speedX = this.maxSpeed;
			}
			else if(nextX + this.width > game.width){ // если мяч касается правой стороны
				  this.x = game.width;
				  this.speedX = -this.maxSpeed;
			}
			else if(nextY < 0){  // если мяч касается верхней стороны
				this.y = 0;
				this.speedY = this.maxSpeed;
			}
			else if(nextY + this.height > game.height){
				// Игрок проиграл
			}
		}
		
	};

    game.bat = { 
		x: 250,
		y: 258,
		maxSpeed: 6,
		speed: 0,
		ball: game.ball,
		runBall: function(){
			// мяч отскакивает от платформы
			if(this.ball){
				this.ball.pushOf();
				// после того, как мяч взлетел
				this.ball = false;
			}
		},
		move: function(){
			this.x += this.speed;
			
			//Если мяч на платформе
			if(this.ball){
				this.ball.x += this.speed;
			}		
		},
		stop: function(){
			//Останавливаем платформу
			this.speed = 0;
						//Если мяч на платформе
			if(this.ball){
				this.ball.speed = 0;
			}		
		}
	};
	
	

// Запускать js код по факту загрузки html-страницы
    window.addEventListener("load",function(){
// По факту загрузки страницы выполняем:
    game.start();
});

