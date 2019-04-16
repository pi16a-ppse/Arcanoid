//Вывод фона на экран
var game = {
    context: undefined,
	art: {
		background: undefined
	},
	
	start: function(){
		//апи для отрисовки
		var canvas = document.getElementById("mycanvas"); 
		this.context = сanvas.getContext("2d");
		
      this.art.background = new Image();
	  //Загружаем картинку
	  this.art.background.src = "img/background.png"
	  
	  //Отрисовываем картинку
	  then.context.drawImage(this.art.background,0,0);
	  
	  //Вывод изображения на экран
	  window.requestAnimationFrame()
	}
};

// Запускать js код по факту загрузки html-страницы
window.addEventListener("load",function(){
// По факту загрузки страницы выполняем:
game.start();
});