import { useState } from "react";
export const usePwdToggler = () => {
	const [pwdToggle, setpwdToggle] = useState({
		type: "password",
	
	});
	const pwdToggler = () => {
		pwdToggle.type === "password"
			? setpwdToggle({ type: "text"})
			: setpwdToggle({ type: "password" });
	};

	return [pwdToggle, pwdToggler];
};
