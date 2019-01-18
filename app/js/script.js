'use strict';

/************ FONCTIONS ************/

/*
Fonction permettant d'enlever la classe "active" des liens ainsi que des div présents
dans le même système d'onglets que l'élément passé en paramètre
*/
function hideAllActiveClass(elem) {

    /************ TITRE ************/
    var elem_ul = elem.parentNode.parentNode; // On va chercher l'élément parent "<ul>"
    if (elem_ul.hasChildNodes()) { // On vérifie que celui-ci a des enfants
        var elem_totli = elem_ul.childNodes; // On récupère tous les enfants de l'élément "<ul>"
        for (var i = 0; i < elem_totli.length; i++) { // On parcourt tous les éléments enfants
            if (elem_totli[i].hasChildNodes() // On vérifie si l'élément enfant a lui-même des enfants
                && elem_totli[i].classList // et s'il a des classes
                && elem_totli[i].classList.contains('tabs_item')) { // et s'il a une classe "tabs_item" donc cet élément est un "<li>"
                var elem_a = elem_totli[i].children; // On récupère tous les enfants de l'élément "<li>" courant
                elem_a[0].classList.remove("active"); // On supprime la classe "active" du premier et seul lien enfant de l'élément "<li>" courant
                // On pourrait, si besoin, vérifier tous les liens enfants de chaque élément "<li>" et leur supprimer la classe "active"
            }
        }
    }

    /************ CONTENU ************/
    var elem_maindiv = elem_ul.nextElementSibling; // On va chercher l'élément "frère" de "<ul>" à savoir l'élément "<div>"
    if (elem_maindiv.hasChildNodes()) { // On vérifie que celui-ci a des enfants
        var elem_totdiv = elem_maindiv.childNodes; // On récupère tous les enfants de l'élément "<div>"
        for (var i = 0; i < elem_totdiv.length; i++) { // On parcourt tous les éléments enfants
            if (elem_totdiv[i].hasChildNodes() // On vérifie si l'élément enfant a lui-même des enfants
                && elem_totdiv[i].classList // et s'il a des classes
                && elem_totdiv[i].classList.contains('active')) { // et s'il a une classe "active"
                elem_totdiv[i].classList.remove("active"); // Si tel est le cas, on supprime la classe "active" de l'élément courant
            }
        }
    }
}

document.addEventListener('click', function (event) { // On écoute les événement de "click"
    var el = event.target;

    if (el.matches('.active')) { // Si l'utilisateur clique sur un élément possédant la classe "active"
        // Situation OK, on ne fait rien
    }
    else { // Si l'utilisateur clique sur un élément ne possédant pas la classe "active"
        if (el.classList.contains('tabs_link')) { // Et que l'élément possède la classe "tabs_link"
            hideAllActiveClass(el); // On enlève la classe "active" des autres liens ainsi que des autres div présents dans le même système d'onglets que l'élément courant
            el.classList.add("active"); // On ajoute la classe "active" à l'élément courant
            var id_element = el.getAttribute("href"); // On récupère l'attribut href de l'élément courant
            var div_to_change = document.querySelector(id_element); // pour nous permettre de récupérer la div correspondante
            div_to_change.classList.add("active"); // que l'on affiche en lui ajoutant la classe "active"
        }
    }
}, false);

/*
Fonction permettant de déclencher l'affichage "Mobile"
quand les zones 2 et 3 ont la même largeur
*/
function change_size() {
    var article_2 = document.getElementById("article_2");
    var article_3 = document.getElementById("article_3");
    var section_2 = document.getElementById("section_2");

    var width_2 = article_2.offsetWidth; // On récupère la largeur du 2ème article
    var width_3 = article_3.offsetWidth; // On récupère la largeur du 3ème article

    if (width_2 < width_3) { // Si la largeur du 2ème article < à celle du 3ème article (165px)
        /****** Affichage Mobile ******/
        section_2.style.flexDirection = "column";
        article_3.style.margin = "20px 0 0 0";
        article_3.style.width = "auto";
    }
    else if (width_3 > 345) { // Si la largeur du 3ème article > à (min-width 2ème article desktop + min-width 3ème article desktop + padding + border + margin)
        /****** Affichage Desktop ******/
        section_2.style.flexDirection = "row";
        article_3.style.margin = "0 0 0 16px";
        article_3.style.width = "165px";
    }
}

/* Equivalent de jQuery's $.ready() en Javascript */
document.addEventListener('DOMContentLoaded', function () {
    window.onresize = change_size;
}, false);

window.onresize = change_size;
