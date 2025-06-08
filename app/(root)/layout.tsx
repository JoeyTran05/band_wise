import NavBar from "@/components/NavBar";
import React, { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
	return (
		<div>
			<NavBar />
			<div className="pattern">{children}</div>
		</div>
	);
};

export default Layout;
