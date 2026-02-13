// Scroll to Top knop functionaliteit will be initialized in DOMContentLoaded


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


let volunteersNeeded = 20;
let volunteersCount = 0;

const messages = {
  high: 'Nog {count} vrijwilligers nodig! Doe jij mee?',
  medium: 'Nog {count} vrijwilligers nodig voor ons doel!',
  low: 'Bijna daar! Nog {count} vrijwilligers nodig!',
  almost: 'Nog slechts 1 vrijwilliger nodig!',
  success: '🎉 Doel bereikt! Dank je wel!'
};

function updateCounterDisplay() {
  const counterDisplay = document.getElementById('counterDisplay');
  const messageElement = document.getElementById('volunteerMessage');
  const counterContainer = document.querySelector('.volunteer-counter');
  
  const remaining = volunteersNeeded - volunteersCount;
  
  
  counterDisplay.classList.remove('countdown');
  counterDisplay.offsetHeight; 
  counterDisplay.classList.add('countdown');
  
  
  counterDisplay.textContent = remaining;
  
 
  let message = '';
  if (remaining <= 0) {
    message = messages.success;
    counterContainer.classList.add('success');
    counterContainer.classList.remove('warning');
  } else if (remaining === 1) {
    message = messages.almost;
    counterContainer.classList.add('warning');
    counterContainer.classList.remove('success');
  } else if (remaining <= 3) {
    message = messages.low;
    counterContainer.classList.add('warning');
    counterContainer.classList.remove('success');
  } else if (remaining <= 8) {
    message = messages.medium;
    counterContainer.classList.remove('warning');
    counterContainer.classList.remove('success');
  } else {
    message = messages.high;
    counterContainer.classList.remove('warning');
    counterContainer.classList.remove('success');
  }
  
  messageElement.textContent = message;
}



let isDark = false;

function toggleDarkLight() {
  const body = document.body;
  const lightImg = document.getElementById("backgroundIMG1");
  const darkImg = document.getElementById("backgroundIMG2");
  const toggle = document.getElementById("darkLightToggle");
  
  if (!isDark) {
    // Switch to dark mode
    body.classList.add("dark-mode");
    lightImg.style.display = "none";
    darkImg.style.display = "block";
    toggle.textContent = "☀️";
    isDark = true;
  } else {
    // Switch to light mode
    body.classList.remove("dark-mode");
    lightImg.style.display = "block";
    darkImg.style.display = "none";
    toggle.textContent = "🌙";
    isDark = false;
  }
}










document.addEventListener('DOMContentLoaded', function() {
  // Initialize scroll to top button
  const scrollBtn = document.getElementById('scrollToTopBtn');
  if (scrollBtn) {
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
  }
  
  // Initialize counter
  const counterDisplay = document.getElementById('counterDisplay');
  if (counterDisplay) {
    updateCounterDisplay();
  }
  
  // Initialize dark/light toggle
  const toggle = document.getElementById("darkLightToggle");
  if (toggle) {
    toggle.addEventListener("click", toggleDarkLight);
  }
  
  // Initialize form if it exists
  const form = document.getElementById('vrijwilligerForm');
  const annuleerBtn = document.getElementById('annuleerBtn');
  
  if (form) {
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

      // Increment volunteer counter
      volunteersCount++;
      updateCounterDisplay();

      alert('Bedankt voor je aanmelding als vrijwilliger!');
      form.reset();
    });
  }
  
  if (annuleerBtn) {
    annuleerBtn.addEventListener('click', function () {
      if (confirm('Weet je zeker dat je wilt annuleren?')) {
        form.reset();
      }
    });
  }
});