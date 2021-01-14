import '../css/main.scss';


// webpack nasce per le app js, ma ci sono molti altri modi di usarlo
// puoi caricare dipendenze qui sviluppando la app a moduli.
// breve esempio:
import modalCaller from './modalCaller';

// evento
document.querySelector('#mybutton').addEventListener('click', (event) => {
    modalCaller()
});