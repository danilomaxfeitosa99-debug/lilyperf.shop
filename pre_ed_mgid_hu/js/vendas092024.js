$(document).ready(function() {
	
	//Video flutuante
	$(window).scroll(function(){
		if ($(this).scrollTop() > $('section.suaVez').position().top ) {$('body').addClass('_videoFlut');} else {$('body').removeClass('_videoFlut');} 
	});
	
	//Insere na tag <main> a section atual de navegacao do usuario.
	$(window).on('scroll', function() {
		var scrollPosition = $(window).scrollTop();

		$('section').each(function() {
			var sectionOffset = $(this).offset().top - 400;
			var sectionHeight = $(this).outerHeight();

			if (scrollPosition >= sectionOffset && scrollPosition < sectionOffset + sectionHeight) {
				var currentSectionId = $(this).attr('class');
				$('main').delay(4000).removeClass().addClass(currentSectionId + 'Ativo').delay(4000);
			}
		});
	});

	let animationExecuted = false; 
	function animateCountUp(element, start, end, duration) {
		let startTime = null;
		function step(timestamp) {
			if (!startTime) startTime = timestamp;
			const progress = timestamp - startTime;
			const current = Math.min(Math.floor((progress / duration) * (end - start) + start), end);            
			element.text(current.toLocaleString()); 
			if (current < end) {
				window.requestAnimationFrame(step); 
			}
		}
		window.requestAnimationFrame(step);
	}

	function checkAndAnimate() {
		const mainElement = $('main');
		const contador = $('#contagem');

		if (mainElement.hasClass('oportunidadeAtivo') && !animationExecuted) {
			animateCountUp(contador, 10000, 34000, 2000); 
			animationExecuted = true; 
		}
	}
	checkAndAnimate();		 

	(function($) {
		const originalAddClass = $.fn.addClass;
		const originalRemoveClass = $.fn.removeClass;
		$.fn.addClass = function() {
			originalAddClass.apply(this, arguments);
			this.trigger('classChanged');
			return this;
		};
		$.fn.removeClass = function() {
			originalRemoveClass.apply(this, arguments);
			this.trigger('classChanged');
			return this;
		};
	})(jQuery);

	$('main').on('classChanged', function() {
		checkAndAnimate(); 
	});
	
 	let isAnimating = false; 

    $('li.modulo').click(function() {
		$('.boxConteudos').addClass("ativo");
        if (isAnimating) return;
		
		$('li.modulo').removeClass("ativo")
		$(this).addClass("ativo");
        // Pega o idModulo do item clicado
        const idModulo = $(this).attr('idModulo');
        
        // Verifica se já existe uma lista ativa
        const $activeList = $('.lista.ativo');
        const $targetList = $('.lista[idModulo="' + idModulo + '"]');

        // Não permite clicar na mesma lista que já está ativa
        if ($targetList.hasClass('ativo')) return;

        // Ativa o controle de animação
        isAnimating = true;

        if ($activeList.length > 0) {
            // Se já existe uma lista ativa, remove a classe 'ativo' e usa o timeout
            $activeList.removeClass('ativo');
            setTimeout(() => {
                $targetList.addClass('ativo');
                isAnimating = false; // Libera para novos cliques após o timeout
            }, 500);
        } else {
            // Se não houver nenhuma lista ativa, adiciona a classe imediatamente
            $targetList.addClass('ativo');
            isAnimating = false; // Libera para novos cliques
        }
    });
	
	//Box lista
	$('.boxCursos .centro .boxLista h4').click(function(e){
		e.preventDefault();

		$('.boxCursos .centro .boxLista h4').toggleClass('ativo');
		$('.boxCursos .centro .boxLista ul').toggleClass('ativo');

	});
	
	//FAQ
	$('.boxFAQ .centro .duvidas ul li').click(function(){
		$('.boxFAQ .centro .duvidas ul li.ativo').removeClass('ativo');
		$(this).addClass('ativo');
	})
	
	$('.topicos ul').hide();
	$('.topicos').click(function() {
		if ($(this).hasClass('ativo')) {
			$(this).removeClass('ativo');
			$(this).find('ul').slideUp();
		} else {
			$('.topicos').removeClass('ativo');
			$('.topicos ul').slideUp();
			$(this).addClass('ativo');
			$(this).find('ul').slideDown();
		}
	});
	
	
	
	const $boxFaturamento = $('section.oportunidade .centro .conteudo .boxFaturamento .valor span em');

    $boxFaturamento.on('animationend', function() {
        // Adiciona a classe quando a animação termina
        $('body').addClass('animacao-finalizada');
    });
});
	
$(window).load(function(){
	
	$('.depoimentos .centro .splide .depoimento .video .thumb').each(function(){
		var embed = $(this).attr('embed');
		$(this).empty().html('<img src="https://img.youtube.com/vi/'+embed+'/hqdefault.jpg" alt="thumbnail">');
	})
})
