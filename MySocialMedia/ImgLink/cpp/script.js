document.addEventListener('DOMContentLoaded', function() {
    const textBoxes = document.querySelectorAll('.text-box');
    const previewBox = document.getElementById('previewBox');
    let currentExpandedBox = null;

    // Function to close the preview box and current expanded box
    function closePreview() {
        if (currentExpandedBox) {
            currentExpandedBox.classList.remove('expanded');
        }
        previewBox.innerHTML = `<p>Select an item to preview</p>`;
    }

    textBoxes.forEach(box => {
        box.addEventListener('click', function(event) {
            event.stopPropagation(); // Prevents event bubbling to grid-container

            // Check if this box is already expanded
            const isExpanded = box.classList.contains('expanded');

            // If a box is already expanded, close it first
            if (currentExpandedBox && currentExpandedBox !== box) {
                currentExpandedBox.classList.remove('expanded');
            }

            // Toggle the expanded class
            box.classList.toggle('expanded');

            // Update the current expanded box reference
            currentExpandedBox = isExpanded ? null : box;

            // If the box is expanded, update the preview box
            if (box.classList.contains('expanded')) {
                // Get the content from data-content attribute
                const content = box.getAttribute('data-content');
                const header = box.querySelector('.header-text').innerText;
                const quote = box.querySelector('.hidden-text').innerText;
                const imgSrc = box.querySelector('img').src;

                // Update the preview box content
                previewBox.innerHTML = `
                    <p class="header-text">${header}</p>
                    <p>${content}</p>
                    <i><p>${quote}</p></i>
                    <img src="${imgSrc}" alt="Preview Image">
                `;

                // Smoothly transition to show the preview box content
                previewBox.classList.add('hidden');
                setTimeout(() => {
                    previewBox.classList.remove('hidden');
                }, 10);
            } else {
                // If the box is not expanded, reset the preview box
                previewBox.innerHTML = `<p>Select an item to preview</p>`;
            }
        });
    });

    // Event listener to close preview and expanded box on body click
    document.body.addEventListener('click', function(event) {
        if (!event.target.closest('.text-box')) {
            closePreview();
            currentExpandedBox = null;
        }
    });
});
