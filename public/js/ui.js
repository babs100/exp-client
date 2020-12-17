(function (window, document) {
    let layout   = document.getElementById('layout'),
        menu     = document.getElementById('menu'),
        menuLink = document.getElementById('menuLink');

    function toggleClass(element, className) {
        let classes = element.className.split(/\s+/),
            length = classes.length,
            i = 0;

        for (; i < length; i++) {
            if (classes[i] === className) {
                classes.splice(i, 1);
                break;
            }
        }
        // The className is not found
        if (length === classes.length) {
            classes.push(className);
        }

        element.className = classes.join(' ');
    }

    function toggleAll(e) {
        let active = 'active';
        e.preventDefault();
        toggleClass(layout, active);
        toggleClass(menu, active);
        toggleClass(menuLink, active);
    }
    
    function handleEvent(e) {

        layout   = document.getElementById('layout');
        menu     = document.getElementById('menu');
        menuLink = document.getElementById('menuLink');
        
        if(menu == null || menuLink == null){
            return 
        }

        if (e.target.id === menuLink.id) {
            return toggleAll(e);
        }


        if(e.target.dataset.type === "show-modal"){
            //console.log("the target is " + e.target.dataset.target)
            modal   = document.getElementById(e.target.dataset.target);
            modal.style.display = "block";
        }

        if(e.target.dataset.type === "hide-modal"){
            modal   = document.getElementById(e.target.dataset.target);
            modal.style.display = "none";
        }

        if(e.target.dataset.type === "toggle-detail"){
            div   = document.getElementById(e.target.dataset.target);
            //modal.style.display = "none";
            e.preventDefault()
            let show = "show-flex";
            toggleClass(div, show)
            if(e.target.innerHTML == "click to show weeks"){
                e.target.innerHTML = "click to hide weeks"
            } else {
                e.target.innerHTML = "click to show weeks"
            }
        }
        
        if (menu.className.indexOf('active') !== -1) {
            return toggleAll(e);
        }
    }
    

    document.addEventListener('click', handleEvent);

    /*
    // Get the modal
    var modal = document.getElementById("myModal");

    // Get the button that opens the modal
    var btn = document.getElementById("myBtn");

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    // When the user clicks on the button, open the modal
    btn.onclick = function() {
    modal.style.display = "block";
    }

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
    modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
    }
    */


}(this, this.document));