import React, { Fragment, useContext } from "react";
import Tarea from "./Tarea";
import proyectoContext from "../../context/proyectos/proyectoContext";
import tareaContext from "../../context/tareas/tareaContext";
import { CSSTransition, TransitionGroup } from "react-transition-group";

function ListadoTareas() {
	const proyectosContext = useContext(proyectoContext);
	const { proyecto, eliminarProyecto } = proyectosContext;

	const tareasContext = useContext(tareaContext);
	const { tareasproyecto } = tareasContext;

	if (!proyecto) return <h2>Selecciona un proyecto</h2>;

	const [proyectoActual] = proyecto;

	//Eliminar proyecto
	const onClickEliminar = () => {
		eliminarProyecto(proyectoActual._id);
	};
	return (
		<Fragment>
			<h2>Proyecto: {proyectoActual.nombre}</h2>
			<ul className="listado-tareas">
				{tareasproyecto.length === 0 ? (
					<li className="tarea">
						<p>No hay tareas</p>
					</li>
				) : (
					<TransitionGroup>
						{tareasproyecto.map((tarea) => (
							<CSSTransition key={tarea.id} timeout={300} classNames="tarea">
								<Tarea tarea={tarea} />
							</CSSTransition>
						))}
					</TransitionGroup>
				)}
			</ul>

			<button
				className="btn btn-eliminar"
				type="button"
				onClick={onClickEliminar}
			>
				Eliminar Proyecto &times;
			</button>
		</Fragment>
	);
}

export default ListadoTareas;
