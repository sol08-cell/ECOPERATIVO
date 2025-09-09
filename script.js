/* CONFIGURA TU WHATSAPP AQUÍ 
   👉 Para Argentina se usa: "5493875706236"
   (+54 9 + número sin espacios)
*/
const PHONE = "5493875706236";

// Inventario de productos
const productos = [
  {
    nombre: "Cuadro flores con tapitas recicladas",
    descripcion: "Arte mural con flores hechas de tapas y aluminio reutilizado.",
    imagen: "img/cuadro-flores.jpg"
  },
  {
    nombre: "Cuencos orgánicos (set x3)",
    descripcion: "Hechos con fibras vegetales; ideales para decorar u organizar.",
    imagen: "img/cuencos-set.jpg"
  },
  {
    nombre: "Cuenco orgánico (perfil)",
    descripcion: "Textura natural. Pieza única hecha a mano.",
    imagen: "img/cuenco-perfil.jpg"
  },
  {
    nombre: "Cuadro pez con tapitas",
    descripcion: "Composición artística con tapitas y pintura.",
    imagen: "img/cuadro-pez.jpg"
  },
  {
    nombre: "Flores decorativas de tapitas",
    descripcion: "Varillas con pétalos de tapas pintadas, para macetas o floreros.",
    imagen: "img/flores-varilla.jpg"
  },
  {
    nombre: "Imanes mariquitas con tapitas",
    descripcion: "Trío de imanes hechos con tapas reutilizadas.",
    imagen: "img/iman-mariquitas.jpg"
  },
  {
    nombre: "Maceta rana reciclada",
    descripcion: "Macetero pintado a mano con forma de ranita.",
    imagen: "img/maceta-rana.jpg"
  }
];

// Render de tarjetas
const grid = document.getElementById("gridProductos");
function render(products){
  grid.innerHTML = "";
  products.forEach(p => {
    const card = document.createElement("article");
    card.className = "card";
    card.innerHTML = `
      <img src="${p.imagen}" alt="${p.nombre}">
      <div class="content">
        <h3>${p.nombre}</h3>
        <p>${p.descripcion}</p>
      </div>
      <div class="actions">
        <button class="btn" onclick="consultarPrecio('${p.nombre}')">Consultar precio por WhatsApp</button>
        <button class="btn btn-outline" onclick="compartir('${p.nombre}')">Compartir</button>
      </div>
    `;
    grid.appendChild(card);
  });
}
render(productos);

// Buscador
const buscador = document.getElementById("buscador");
const limpiar = document.getElementById("limpiar");
buscador.addEventListener("input", () => {
  const q = buscador.value.toLowerCase().trim();
  const filtrados = productos.filter(p => p.nombre.toLowerCase().includes(q) || p.descripcion.toLowerCase().includes(q));
  render(filtrados);
});
limpiar.addEventListener("click", ()=>{ buscador.value=""; render(productos); });

// WhatsApp CTA contacto
const ctaWhats = document.getElementById("ctaWhats");
ctaWhats.href = `https://wa.me/${PHONE}`;

// Lógica de WhatsApp por producto
function consultarPrecio(nombreProducto){
  const txt = `¡Hola! Me interesa *${nombreProducto}* de ECOPERATIVO. ¿Me compartes el precio y opciones de entrega?`;
  const url = `https://wa.me/${PHONE}?text=${encodeURIComponent(txt)}`;
  window.open(url, "_blank");
}

// Compartir (Web Share API si está disponible)
function compartir(nombreProducto){
  const url = window.location.href.split('#')[0];
  if (navigator.share){
    navigator.share({
      title: `ECOPERATIVO – ${nombreProducto}`,
      text: `Mira este producto reciclado: ${nombreProducto} de ECOPERATIVO`,
      url
    }).catch(()=>{ /* usuario canceló */ });
  } else {
    alert("Enlace copiado: " + url);
    navigator.clipboard?.writeText(url);
  }
}

// Formulario (simulación)
function enviarFormulario(e){
  e.preventDefault();
  document.getElementById("respuestaForm").textContent = "✅ ¡Gracias! Te responderemos pronto.";
  document.getElementById("nombre").value = "";
  document.getElementById("email").value = "";
  document.getElementById("mensaje").value = "";
}