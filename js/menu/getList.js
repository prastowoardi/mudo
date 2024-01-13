function getList(page) {
    fetch(`https://api.mudoapi.tech/menus?perPage=1000&page=${page}`)
        .then(response => response.json())
        .then(data => {
            const menuData = data.data.Data;
            const table = $('#tableMenu').DataTable({
                ordering: false,
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
    const modal = document.getElementById('modal-confirmation');

    function openModal() {
        modal.style.display = 'block';
    }

    function closeModal() {
        modal.style.display = 'none';
    }

    openModal();

    document.getElementById('confirmDelete').addEventListener('click', function() {
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
            const errorMessageElement = document.getElementById('alert');
            if (errorMessageElement) {
                errorMessageElement.textContent = error.message || 'Terjadi kesalahan saat menghapus.';
            }
        });
        
        closeModal();
    });

    const closeButtons = document.querySelectorAll('#close, .close');
    closeButtons.forEach(function(btn) {
        btn.addEventListener('click', closeModal);
    });
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
