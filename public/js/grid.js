(function (window, document) {

    var unitsToggle     = document.querySelector('.grids-show-all'),
        notReducedUnits = document.querySelectorAll('.grids-unit-not-reduced');
    
    if(unitsToggle == null) return
    
    unitsToggle.onclick = function (e) {
        [].slice.call(notReducedUnits).forEach(function (unit) {
            if (e.target.checked) {
                unit.removeAttribute('hidden');
            } else {
                unit.setAttribute('hidden');
            }
        });
    };

}(this, this.document));