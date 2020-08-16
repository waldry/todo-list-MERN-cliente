import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import AlertaContext from "../../context/alertas/alertaContext";
import AuthContext from "../../context/autenticacion/authContext";

function NuevaCuenta(props) {
	//Extraer del context
	const alertaContext = useContext(AlertaContext);
	const { alerta, mostraralerta } = alertaContext;

	const authContext = useContext(AuthContext);
	const { mensaje, autenticado, registrarUsuario } = authContext;

	//en caso de que el ususario se haya registrado/autenticado o sea un registro duplicado
	useEffect(() => {
		if (autenticado) {
			props.history.push("/proyectos");
		}
		if (mensaje) {
			mostraralerta(mensaje.msg, mensaje.categoria);
		}
		//eslint-disable-next-line
	}, [mensaje, autenticado, props.history]);
	//States
	const [usuario, guardarUsuario] = useState({
		nombre: "",
		email: "",
		password: "",
		confirmar: "",
	});

	//From user we need.

	const { nombre, email, password, confirmar } = usuario;

	const onChange = (e) => {
		guardarUsuario({
			...usuario,
			[e.target.name]: e.target.value,
		});
	};
	const onSubmit = (e) => {
		e.preventDefault();

		//validation
		if (
			nombre.trim() === "" ||
			email.trim() === "" ||
			password.trim() === "" ||
			confirmar.trim() === ""
		) {
			mostraralerta("Todos los campos son obligatorios", "alerta-error");
			return;
		}
		//Password 6 char minimum.
		if (password.length < 6) {
			mostraralerta(
				"El password debe ser de  al menos 6 caracteres",
				"alerta-error"
			);
			return;
		}
		//Comparison between 2 password
		if (password !== confirmar) {
			mostraralerta("Los password no coinciden", "alerta-error");
			return;
		}
		//Action
		registrarUsuario({
			nombre,
			email,
			password,
		});
	};

	return (
		<div className="form-usuario">
			{alerta ? (
				<div className={`alerta ${alerta.categoria}`}>{alerta.msg} </div>
			) : null}
			<div className="contenedor-form sombra-dark">
				<h1>Crea una nueva cuenta</h1>
				<form onSubmit={onSubmit}>
					<div className="campo-form">
						<label htmlFor="nombre">Nombre</label>
						<input
							type="text"
							id="nombre"
							name="nombre"
							placeholder="Tu Nombre"
							value={nombre}
							onChange={onChange}
						/>
					</div>
					<div className="campo-form">
						<label htmlFor="email">Email</label>
						<input
							type="email"
							id="email"
							name="email"
							placeholder="Tu Email"
							value={email}
							onChange={onChange}
						/>
					</div>
					<div className="campo-form">
						<label htmlFor="password">Password</label>
						<input
							type="password"
							id="password"
							name="password"
							placeholder="Tu Password"
							value={password}
							onChange={onChange}
						/>
					</div>
					<div className="campo-form">
						<label htmlFor="confirmar">Confirmar Password</label>
						<input
							type="password"
							id="confirmar"
							name="confirmar"
							placeholder="Repite tu password"
							value={confirmar}
							onChange={onChange}
						/>
					</div>
					<div className="campo-form">
						<input
							type="submit"
							className="btn btn-primario btn-block"
							value="Registrar"
						/>
					</div>
				</form>
				<Link to={"/"} className="enlace-cuenta">
					Volver a Iniciar Sesion
				</Link>
			</div>
		</div>
	);
}

export default NuevaCuenta;
