// Scroll to Top knop functionaliteit
const scrollBtn = document.getElementById('scrollToTopBtn');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 200) {
          scrollBtn.style.display = 'block';
        } else {
          scrollBtn.style.display = 'none';
        }
      });
      scrollBtn.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });


// script.js - module om html bestanden in te laden
// geschikt voor header, footer en menu
// functie laadt een html bestand en zet het in de pagina
function load_html_file(file_name, element_id) {
// zoek het element waar de html in moet komen
const element = document.getElementById(element_id);
// als het element niet bestaat, stop dan
if (!element) {
console.error('element met id "' + element_id + '" niet gevonden');
return;
}
// laad het html bestand
fetch(file_name)
.then(function(response) {
// controleer of het laden gelukt is
if (!response.ok) {
throw new Error('bestand niet gevonden: ' + file_name);
}
return response.text();
})
.then(function(html) {
// zet de html in het element
element.innerHTML = html;
})
.catch(function(error) {
// als er iets fout gaat, toon een foutmelding
console.error('fout bij laden van ' + file_name + ':', error);
element.innerHTML = '<p style="color: red;">fout: bestand kon niet worden geladen</p>';
});
}
// wacht tot de pagina volledig geladen is
document.addEventListener('DOMContentLoaded', function() {
// laad de header als er een element met id="header-plaats" bestaat
if (document.getElementById('header-plaats')) {
load_html_file('header.html', 'header-plaats');
}
// laad het menu als er een element met id="menu-plaats" bestaat
if (document.getElementById('menu-plaats')) {
load_html_file('menu.html', 'menu-plaats');
}
// laad de footer als er een element met id="footer-plaats" bestaat
if (document.getElementById('footer-plaats')) {
load_html_file('footer.html', 'footer-plaats');
}
});


const form = document.getElementById('vrijwilligerForm');
    const annuleerBtn = document.getElementById('annuleerBtn');

    form.addEventListener('submit', function (event) {
      event.preventDefault();


      const naam = document.getElementById('naam').value.trim();
      const telefoon = document.getElementById('telefoon').value.trim();
      const email = document.getElementById('email').value.trim();
      const voorkeur = document.getElementById('voorkeur').value;
      const motivatie = document.getElementById('motivatie').value.trim();

      const dagenCheckboxes = document.querySelectorAll('input[name="dagen"]:checked');
      const dagen = Array.from(dagenCheckboxes).map(cb => cb.value);


      console.log({
        naam,
        telefoon,
        email,
        voorkeur,
        dagen,
        motivatie
      });

      alert('Bedankt voor je aanmelding als vrijwilliger!');
      form.reset();
    });

    annuleerBtn.addEventListener('click', function () {
      if (confirm('Weet je zeker dat je wilt annuleren?')) {
        form.reset();
      }
    });


    