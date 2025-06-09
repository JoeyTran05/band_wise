import NavBar from "@/components/NavBar";
import React, { ReactNode } from "react";

const AuthLayout = ({ children }: { children: ReactNode }) => {
	return (
		<div className="pattern">
			<NavBar />
			{children}
		</div>
	);
};

export default AuthLayout;
