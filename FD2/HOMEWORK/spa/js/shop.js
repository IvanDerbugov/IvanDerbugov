"use strict";

function initShopPage() {
    const descriptions = document.querySelectorAll('.mutant-description');
    
    descriptions.forEach(description => {
        const readMoreBtn = description.nextElementSibling;
        
        if (readMoreBtn && readMoreBtn.classList.contains('read-more-btn')) {
            readMoreBtn.addEventListener('click', function() {
                const isExpanded = description.classList.contains('expanded');
                const mutantItem = description.closest('.mutant-item');
                
                if (isExpanded) {
                    description.classList.remove('expanded');
                    description.classList.add('truncated');
                    if (mutantItem) {
                        setTimeout(() => {
                            mutantItem.classList.remove('stretched');
                        }, 300);
                    }
                    readMoreBtn.setAttribute('data-translate', 'читать полностью');
                    readMoreBtn.textContent = 'читать полностью';
                } else {
                    description.classList.add('expanded');
                    description.classList.remove('truncated');
                    if (mutantItem) {
                        mutantItem.classList.add('stretched');
                    }
                    readMoreBtn.setAttribute('data-translate', 'свернуть');
                    readMoreBtn.textContent = 'свернуть';
                }
            });
        }
    });
}
