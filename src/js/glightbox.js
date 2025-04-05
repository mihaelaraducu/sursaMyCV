import GLightbox from 'glightbox';
/**
     * Initiate portfolio lightbox 
     */
const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
});

// Adaugă un event listener pentru deschiderea lightbox-ului si sa fac traducerea
portfolioLightbox.on('open', async () => {
    console.log('Lightbox deschis!');
    const lang2 = localStorage.getItem('language') || 'en';
    const langData2 = await fetchLanguageDataGLightbox(lang2);
    updateContentGLightbox(langData2);
});
async function fetchLanguageDataGLightbox(lang) {
    const response = await fetch(`lang/${lang}.json`);
    return response.json();
}
function updateContentGLightbox(langData) {
    if (Object.keys(langData).length > 0) {
        document.querySelectorAll('[data-tr]').forEach(element => {
            const key = element.getAttribute('data-tr');
            if (key && langData[key]) {
                element.innerHTML = langData[key]; // păstrează linkurile și tagurile
            }
        });
    } else {
        console.log("Obiectul este gol!");
    }



}