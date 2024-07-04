document.addEventListener('DOMContentLoaded', function() {
    const textBoxes = document.querySelectorAll('.text-box');
    
    textBoxes.forEach(box => {
        box.addEventListener('click', function() {
            // Close all text boxes
            textBoxes.forEach(item => {
                if (item !== box) {
                    item.classList.remove('expanded');
                }
            });
            
            // Toggle the clicked text box
            box.classList.toggle('expanded');
        });
    });
});
