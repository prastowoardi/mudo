function getList(page) {
    fetch(`https://api.mudoapi.tech/menus?perPage=1000&page=${page}`)
        .then(response => response.json())
        .then(data => {
            const menuData = data.data.Data;
            const table = $('#tableMenu').DataTable({
                ordering: false,
                info: false
            });

            menuData.forEach((menu, index) => {
                const action = `
                    <button data-menu-id="${menu.id}" class="detail-button">Detail</button>
                    <button data-menu-id="${menu.id}" class="delete-button">Delete</button>
                `;
                table.row
                    .add([
                        index + 1,
                        menu.name,
                        menu.description,
                        menu.priceFormatted,
                        action
                    ])
                    .draw(false);
            });

            $('#tableMenu').on('click', '.detail-button', function() {
                const menuId = $(this).data('menu-id');
                showDetail(menuId);
            });

            $('#tableMenu').on('click', '.delete-button', function() {
                const menuId = $(this).data('menu-id');
                deleteMenu(menuId);
            });
        })
        .catch(error => {
            console.error('Error fetching menu list:', error);
        });
}

function deleteMenu(menuId) {
    const confirmed = window.confirm("Apakah Anda yakin ingin menghapus menu ini?");
    if (confirmed) {
        const authToken = localStorage.getItem('authToken');
        fetch(`https://api.mudoapi.tech/menu/${menuId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${authToken}`
            }
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then(data => {
                    throw new Error(data.message || 'Delete failed.');
                });
            }
            return Promise.resolve();
        })
        .then(() => {
            localStorage.setItem('successMessage', 'Penghapusan berhasil.');

            location.reload();
        })
        .catch(error => {
            console.error('Error deleting menu:', error.message);

            const errorMessageElement = document.getElementById('alert');
            if (errorMessageElement) {
                errorMessageElement.textContent = error.message || 'Terjadi kesalahan saat menghapus.';
            }
        });
    }
}

function showDetail(menuId) {
    window.location.href = `detail-menu.html?id=${menuId}`;
}

document.addEventListener("DOMContentLoaded", function() {
    const successMessage = localStorage.getItem('successMessage');

    if (successMessage) {
        const errorMessageElement = document.getElementById('alert');
        if (errorMessageElement) {
            errorMessageElement.textContent = successMessage;
        }
        localStorage.removeItem('successMessage');
    }
    
    const urlParams = new URLSearchParams(window.location.search);
    const pageId = urlParams.get('page');

    getList(pageId);
});
