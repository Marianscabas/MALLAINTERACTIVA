  const malla = [
      {
        semestre: "Semestre 1",
        materias: [
          { id: "fundamentos", nombre: "Fundamentos de Programación", creditos: 3, tipo: "p", descripcion: "Aprende las bases de la programación." },
          { id: "matematicas", nombre: "Matemáticas", creditos: 3, tipo: "b", descripcion: "Conceptos fundamentales de matemáticas básicas." },
          { id: "comunicacion", nombre: "Habilidades Comunicativas", creditos: 2, tipo: "x", descripcion: "Desarrolla habilidades de comunicación oral y escrita." }
        ]
      },
      {
        semestre: "Semestre 2",
        materias: [
          { id: "estructuras", nombre: "Estructura de Datos", creditos: 3, tipo: "p", descripcion: "Organiza datos de forma eficiente." },
          { id: "algebra", nombre: "Álgebra Lineal", creditos: 3, tipo: "b", descripcion: "Matrices, vectores y más." },
          { id: "proyecto1", nombre: "Proyecto Integrado I", creditos: 2, tipo: "pr", descripcion: "Primer acercamiento a proyectos reales." }
        ]
      }
      // Puedes agregar más semestres aquí siguiendo el mismo formato
    ];

    const completadas = JSON.parse(localStorage.getItem("completadasISD")) || [];
    const contenedor = document.getElementById("contenedor-malla");
    const resumen = document.getElementById("resumen");

    function actualizarResumen() {
      const total = malla.flatMap(s => s.materias).reduce((acc, m) => acc + m.creditos, 0);
      const completados = malla.flatMap(s => s.materias)
        .filter(m => completadas.includes(m.id))
        .reduce((acc, m) => acc + m.creditos, 0);
      const porcentaje = ((completados / total) * 100).toFixed(1);

      resumen.innerHTML = `Créditos completados: <b>${completados}</b> / ${total} (${porcentaje}%)`;
    }

    malla.forEach((sem) => {
      const columna = document.createElement("div");
      columna.className = "semestre";

      const titulo = document.createElement("h2");
      titulo.textContent = sem.semestre;
      columna.appendChild(titulo);

      sem.materias.forEach((mat) => {
        const tarjeta = document.createElement("div");
        tarjeta.className = "materia";
        tarjeta.dataset.tipo = mat.tipo;
        tarjeta.textContent = mat.nombre;

        if (completadas.includes(mat.id)) {
          tarjeta.classList.add("completada");
        }

        tarjeta.onclick = () => {
          Swal.fire({
            title: mat.nombre,
            text: `${mat.descripcion}\nCréditos: ${mat.creditos}`,
            showCancelButton: true,
            confirmButtonText: completadas.includes(mat.id) ? 'Desmarcar' : 'Marcar como completada'
          }).then(result => {
            if (result.isConfirmed) {
              tarjeta.classList.toggle("completada");

              if (tarjeta.classList.contains("completada")) {
                completadas.push(mat.id);
              } else {
                const index = completadas.indexOf(mat.id);
                if (index > -1) completadas.splice(index, 1);
              }
              localStorage.setItem("completadasISD", JSON.stringify(completadas));
              actualizarResumen();
            }
          });
        };

        columna.appendChild(tarjeta);
      });

      contenedor.appendChild(columna);
    });

    actualizarResumen();