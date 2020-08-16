import React, { useContext, useEffect } from "react";

import AuthContext from "../../context/autenticacion/authContext";

const Barra = () => {
	const authContext = useContext(AuthContext);
	const { usuario, usuarioAutenticado, cerrarSesion } = authContext;
	useEffect(() => {
		usuarioAutenticado();
		//eslint-disable-next-line
	}, []);
	return (
		<div className="app-header">
			{usuario ? (
				<p className="nombre-usuario">
					Hola <span>{usuario.nombre}</span>
				</p>
			) : null}

			<div className="nav-principal">
				<button
					className="btn btn-blank cerrar-sesion"
					onClick={() => cerrarSesion()}
				>
					Cerrar Sesion
				</button>
			</div>
		</div>
	);
};

export default Barra;
