var dragging = false;

function handleDrag(ex, container, side, handle) {
    var offset = container.offset();
    if (offset) {
        var positionX = (ex.pageX || ex.originalEvent.touches[0].pageX) - offset.left;

        // Limita el ancho para que no exceda el contenedor
        var newWidth = Math.min(Math.max(0, positionX), container.width());
        side.css("width", newWidth);

        // Mueve el handle para que siga la posición del cursor mientras se arrastra
        handle.css("left", newWidth);
    }
}

$('.home-slider-handle').on('mousedown touchstart', function(e){
    e.preventDefault();
    dragging = true;
    
    var container = $(this).closest('.home-slider-wrapper');
    if (container.length === 0) {
        console.error("Contenedor no encontrado");
        return;
    }
    
    var side = container.find('.home-slider-back');
    var handle = $(this);
    
    $(document).on('mousemove touchmove', function(ex){
        if (dragging) {
            handleDrag(ex, container, side, handle);
        }
    });
});

$(document).on('mouseup touchend', function(e){
    if (dragging) {
        $(document).off('mousemove touchmove');
        dragging = false;
    }
});