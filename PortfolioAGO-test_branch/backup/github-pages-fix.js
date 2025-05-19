/**
 * Script de correction pour GitHub Pages
 * Ce script corrige les problèmes de chemins d'accès sur GitHub Pages
 */

document.addEventListener('DOMContentLoaded', function() {
    // Vérifier si nous sommes sur GitHub Pages
    const isGitHubPages = window.location.hostname.includes('github.io');
    
    if (isGitHubPages) {
        console.log("Détection de GitHub Pages - Application des correctifs...");
        
        // Corriger les chemins d'images pour les certifications
        fixCertificationImages();
        
        // Ajouter un gestionnaire d'erreurs pour les images qui ne se chargent pas
        addImageErrorHandlers();
    }
});

/**
 * Corrige les chemins d'images pour les certifications sur GitHub Pages
 */
function fixCertificationImages() {
    // Attendre que le contenu des certifications soit chargé (délai de 1 seconde)
    setTimeout(function() {
        // Sélectionner toutes les images de certification
        const certImages = document.querySelectorAll('.certification-image img');
        
        // Corriger chaque image
        certImages.forEach(img => {
            // Obtenir le chemin actuel
            const currentSrc = img.getAttribute('src');
            
            // Si l'image n'est pas chargée correctement, essayer différents chemins
            if (!img.complete || img.naturalWidth === 0) {
                console.log("Image non chargée correctement:", currentSrc);
                
                // Essayer avec un chemin absolu depuis la racine du dépôt
                const repoPath = '/PortFolio/images/' + currentSrc.split('/').pop();
                img.setAttribute('src', repoPath);
                console.log("Nouvel essai avec:", repoPath);
                
                // Si cela ne fonctionne toujours pas, essayer avec le nom du dépôt de l'utilisateur
                img.onerror = function() {
                    const userRepoPath = '/Akilinoxx/PortFolio/images/' + currentSrc.split('/').pop();
                    img.setAttribute('src', userRepoPath);
                    console.log("Dernier essai avec:", userRepoPath);
                };
            }
        });
        
        // Corriger également les attributs data-img pour le popup
        const certCards = document.querySelectorAll('.certification-card');
        certCards.forEach(card => {
            const dataImg = card.getAttribute('data-img');
            if (dataImg && dataImg.includes('images/')) {
                const imgName = dataImg.split('/').pop();
                card.setAttribute('data-img', '/PortFolio/images/' + imgName);
            }
        });
    }, 1000);
}

/**
 * Ajoute des gestionnaires d'erreurs pour les images qui ne se chargent pas
 */
function addImageErrorHandlers() {
    // Sélectionner toutes les images du site
    const allImages = document.querySelectorAll('img');
    
    allImages.forEach(img => {
        img.onerror = function() {
            console.log("Erreur de chargement d'image:", img.src);
            
            // Essayer avec un chemin relatif à la racine du site
            if (!img.src.includes('/PortFolio/')) {
                const newSrc = '/PortFolio/' + img.src.split('/').pop();
                console.log("Tentative avec:", newSrc);
                img.src = newSrc;
            }
        };
    });
}
