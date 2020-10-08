export function closeModal(id) {

    const modal = document.querySelector(`#${id}`)
    if (modal == null || modal == 'undefined')
        return
        
    modal.style.display = "block";
    
}