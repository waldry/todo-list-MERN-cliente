import React, { Fragment, useState, useContext } from "react";
import proyectoContext from "../../context/proyectos/proyectoContext";

function NuevoProyecto() {
	//Obtener el state del formulario
	const proyectosContext = useContext(proyectoContext);
	const {
		formulario,
		mostrarFormulario,
		agregarProyecto,
		mostrarError,
		errorformulario,
	} = proyectosContext;

	//State para proyectos
	const [proyecto, guardarProyecto] = useState({
		nombre: "",
	});

	const { nombre } = proyecto;

	const onSubmitProyecto = (e) => {
		e.preventDefault();

		//validar
		if (nombre === "") {
			mostrarError();
			return;
		}
		//agregar al state
		agregarProyecto(proyecto);
		//reiniciar el form
		guardarProyecto({
			nombre: "",
		});
	};

	const onChangeProyecto = (e) => {
		guardarProyecto({
			...proyecto,
			[e.target.name]: e.target.value,
		});
	};

	return (
		<Fragment>
			<button
				type="button"
				className="btn btn-block btn-primario"
				onClick={() => mostrarFormulario()}
			>
				Nuevo Proyecto
			</button>
			{formulario ? (
				<form onSubmit={onSubmitProyecto} className="formulario-nuevo-proyecto">
					<input
						type="text"
						className="input-text"
						placeholder="Nombre Proyecto"
						name="nombre"
						value={nombre}
						onChange={onChangeProyecto}
					/>
					<input
						type="submit"
						className="btn btn-primario btn-block"
						value="Agregar Proyecto"
					/>
				</form>
			) : null}
			{errorformulario ? (
				<p className="mensaje error">El nombre del Proyecto es obligatorio</p>
			) : null}
		</Fragment>
	);
}

export default NuevoProyecto;
