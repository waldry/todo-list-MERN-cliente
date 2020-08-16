import React, { useContext, useState, useEffect } from "react";
import proyectoContext from "../../context/proyectos/proyectoContext";
import tareaContext from "../../context/tareas/tareaContext";

function FormTarea() {
	const proyectosContext = useContext(proyectoContext);
	const { proyecto } = proyectosContext;
	const tareasContext = useContext(tareaContext);
	const {
		agregarTarea,
		validarTarea,
		errortarea,
		obtenerTareas,
		tareaseleccionada,
		actualizarTarea,
		limpiarTarea,
	} = tareasContext;

	useEffect(() => {
		if (tareaseleccionada !== null) {
			guardarTarea(tareaseleccionada);
		} else {
			guardarTarea({
				nombre: "",
			});
		}
	}, [tareaseleccionada]);

	const [tarea, guardarTarea] = useState({
		nombre: "",
	});

	const { nombre } = tarea;

	if (!proyecto) return null;

	const [proyectoActual] = proyecto;

	//leer valores
	const handleChange = (e) => {
		guardarTarea({
			...tarea,
			[e.target.name]: e.target.value,
		});
	};

	const onSubmit = (e) => {
		e.preventDefault();

		//validar
		if (nombre.trim() === "") {
			validarTarea();
			return;
		}

		//Revisa si es edicion o nueva tarea.

		if (tareaseleccionada === null) {
			tarea.proyecto = proyectoActual._id;
			agregarTarea(tarea);
		} else {
			actualizarTarea(tarea);
			limpiarTarea();
		}

		//agregar la nueva tarea al state de tareas

		//Filtrar tareas del proyecto actual
		obtenerTareas(proyectoActual.id);
		//reiniciar el form
		guardarTarea({
			nombre: "",
		});
	};

	return (
		<div className="formulario">
			<form onSubmit={onSubmit}>
				<div className="contenedor-input">
					<input
						type="text"
						className="input-text"
						placeholder="Nombre Tarea..."
						name="nombre"
						value={nombre}
						onChange={handleChange}
					/>
				</div>
				<div className="contenedor-input">
					<input
						type="submit"
						className="btn btn-primario btn-submit btn-block"
						value={tareaseleccionada ? "Editar tarea" : "Agregar Tarea"}
					/>
				</div>
			</form>
			{errortarea ? (
				<p className="mensaje error">El nombre de la tarea es obligatorio</p>
			) : null}
		</div>
	);
}

export default FormTarea;
