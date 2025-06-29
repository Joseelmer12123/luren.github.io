document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".form-reserva");

  // Cargar las citas almacenadas
  function obtenerCitas() {
    return JSON.parse(localStorage.getItem("almacenCitas")) || [];
  }

  // Guardar las citas
  function guardarCitas(citas) {
    localStorage.setItem("almacenCitas", JSON.stringify(citas));
  }

  // Verificar duplicado por fecha y hora
  function existeCita(fecha, hora) {
    const citas = obtenerCitas();
    return citas.some(cita => cita.fecha === fecha && cita.hora === hora);
  }

  // Manejador de envío de formulario
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();
    const correo = document.getElementById("correo").value.trim();
    const telefono = document.getElementById("telefono").value.trim();
    const fecha = document.getElementById("fecha").value;
    const hora = document.getElementById("hora").value;
    const motivo = document.getElementById("motivo").value.trim();

    if (!nombre || !correo || !fecha || !hora) {
      alert("⚠️ Todos los campos obligatorios deben estar completos.");
      return;
    }

    if (existeCita(fecha, hora)) {
      alert("❌ Ya existe una cita en esa fecha y hora.");
      return;
    }

    const nuevaCita = { nombre, correo, telefono, fecha, hora, motivo };

    const citas = obtenerCitas();
    citas.push(nuevaCita);
    guardarCitas(citas);

    alert("✅ Cita almacenada exitosamente.");
    form.reset();

    console.log("📋 Citas en almacén:", citas); // puedes quitar esto si no quieres que aparezca en consola
  });
});

// Mostrar citas almacenadas en una tabla
function mostrarCitasEnTabla() {
  const citas = JSON.parse(localStorage.getItem("almacenCitas")) || [];
  const cuerpoTabla = document.querySelector("#tabla-citas tbody");
  cuerpoTabla.innerHTML = "";

  if (citas.length === 0) {
    const fila = cuerpoTabla.insertRow();
    const celda = fila.insertCell();
    celda.colSpan = 6;
    celda.textContent = "No hay citas registradas.";
    celda.style.textAlign = "center";
    return;
  }

  citas.forEach(cita => {
    const fila = cuerpoTabla.insertRow();
    fila.innerHTML = `
      <td>${cita.nombre}</td>
      <td>${cita.correo}</td>
      <td>${cita.telefono}</td>
      <td>${cita.fecha}</td>
      <td>${cita.hora}</td>
      <td>${cita.motivo}</td>
    `;
  });
}

// Mostrar u ocultar la tabla al hacer clic en el botón
document.getElementById("ver-citas-btn").addEventListener("click", () => {
  const seccion = document.getElementById("seccion-citas");
  const visible = seccion.style.display === "block";

  if (!visible) {
    mostrarCitasEnTabla();
    seccion.style.display = "block";
  } else {
    seccion.style.display = "none";
  }
});