// MENU MOBILE
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuToggle?.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

// SLIDER (apenas se a página tiver slider)
let currentIndex = 0;
const slides = document.querySelectorAll(".slide");
const prev = document.querySelector(".prev");
const next = document.querySelector(".next");

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.style.display = i === index ? "block" : "none";
  });
}

next?.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % slides.length;
  showSlide(currentIndex);
});

prev?.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + slides.length) % slides.length;
  showSlide(currentIndex);
});

if (slides.length) {
  showSlide(currentIndex);
  setInterval(nextSlide, 5000);
}

function nextSlide() {
  currentIndex = (currentIndex + 1) % slides.length;
  showSlide(currentIndex);
}

// TROCA DE FOTO
function trocarFoto(elemento) {
  const principal = document.getElementById("foto-principal");
  if(principal) principal.src = elemento.src;
}

// ZOOM TIPO LUPA
const lente = document.getElementById("zoom-lente");
if(principal && lente){
  principal.addEventListener("mousemove", function(e){
    lente.style.display = "block";
    const rect = principal.getBoundingClientRect();
    const x = e.clientX - rect.left - lente.offsetWidth/2;
    const y = e.clientY - rect.top - lente.offsetHeight/2;

    lente.style.left = x + "px";
    lente.style.top = y + "px";
    lente.style.backgroundImage = `url(${principal.src})`;
    lente.style.backgroundRepeat = "no-repeat";
    lente.style.backgroundSize = (principal.width*2) + "px " + (principal.height*2) + "px";
    lente.style.backgroundPosition = `-${x*2}px -${y*2}px`;
  });

  principal.addEventListener("mouseleave", function(){
    lente.style.display = "none";
  });
}

// ALTERAÇÃO DE PREÇO POR TAMANHO (se existir)
const selectTamanho = document.getElementById('tamanho');
const precoDiv = document.getElementById('preco');

if(selectTamanho && precoDiv){
  selectTamanho.addEventListener('change', () => {
    const preco = selectTamanho.selectedOptions[0].getAttribute('data-preco');
    precoDiv.textContent = `R$ ${preco}`;
  });
}

// MOSTRAR / ESCONDER TABELA DE TAMANHOS (se existir)
const btnTabela = document.getElementById('btn-toggle-tabela');
const tabela = document.getElementById('tabela-tamanhos');

if(btnTabela && tabela){
  btnTabela.addEventListener('click', () => {
    if(tabela.style.display === 'none' || tabela.style.display === ''){
      tabela.style.display = 'table';
      btnTabela.textContent = 'Esconder Tabela';
    } else {
      tabela.style.display = 'none';
      btnTabela.textContent = 'Mostrar Tabela';
    }
  });
}

// FORMULÁRIO DE COMPRA PARA WHATSAPP (funciona para qualquer página)
const formCompra = document.getElementById('form-compra');
if(formCompra){
  formCompra.addEventListener('submit', function(e){
    e.preventDefault();

    const produto = formCompra.getAttribute('data-produto') || 'Produto';
    const cor = document.getElementById('cor')?.value || '';
    const tamanho = document.getElementById('tamanho')?.value || '';
    const obs = document.getElementById('obs')?.value || '';
    const preco = precoDiv?.textContent || '';

    const mensagem = `Olá! Quero comprar o ${produto}.\nCor: ${cor}\nTamanho: ${tamanho}\nPreço: ${preco}\nObservações: ${obs}`;
    const numeroWhats = "5527997196844";

    window.open(`https://wa.me/${numeroWhats}?text=${encodeURIComponent(mensagem)}`, "_blank");
  });
}
