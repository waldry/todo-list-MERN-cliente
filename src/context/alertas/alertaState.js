import React, { useReducer } from "react";
import alertaReducer from "./alertaReducer";
import alertaContext from "./alertaContext";
import { MOSTRAR_ALERTA, OCULTAR_ALERTA } from "../../types";

const Alertastate = (props) => {
	const initialState = {
		alerta: null,
	};
	const [state, dispatch] = useReducer(alertaReducer, initialState);

	//funciones
	const mostraralerta = (msg, categoria) => {
		dispatch({
			type: MOSTRAR_ALERTA,
			payload: {
				msg,
				categoria,
			},
		});
		setTimeout(() => {
			dispatch({
				type: OCULTAR_ALERTA,
			});
		}, 5000);
	};

	return (
		<alertaContext.Provider value={{ alerta: state.alerta, mostraralerta }}>
			{props.children}
		</alertaContext.Provider>
	);
};

export default Alertastate;
