function getList(page) {
    fetch(`https://api.mudoapi.tech/menus?perPage=1000&page=${page}`)
        .then(response => response.json())
        .then(data => {
            const menuData = data.data.Data;
            const table = new DataTable('#tableMenu');

            table.on('page', function( ){
                console.log(this)
            });

            menuData.forEach((menu, index) => {
                const detailButton = `<button data-menu-id="${menu.id}" class="detail-button">Detail</button>`;
                table.row
                .add([
                    index + 1,
                    menu.name,
                    menu.description,
                    menu.priceFormatted,
                    detailButton
                ])
                .draw(false);
            })
            $('#tableMenu').on('click', '.detail-button', function() {
                const menuId = $(this).data('menu-id');
                showDetail(menuId);
            });
        })
        .catch(error => {
            console.error('Error fetching menu list:', error);
        });
}

function attachDetailButtonHandler(button, menuId) {
    button.addEventListener("click", function() {
        showDetail(menuId);
    });
}

function showDetail(menuId) {
    window.location.href = `detail-menu.html?id=${menuId}`;
}


document.addEventListener("DOMContentLoaded", function() {
    const urlParams = new URLSearchParams(window.location.search);
    const pageId = urlParams.get('page');

    getList(pageId);
});
