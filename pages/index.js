//Данная функция вызывается при рендеринге страницы
function render() {
    let likeButtons = document.querySelectorAll(".card__like-button");
    likeButtons.forEach(button => {
        button.addEventListener("click", function() {
            button.classList.toggle("card__like-button_active");
        });
    });
}

render();