import React, { ReactNode } from "react";

const AuthLayout = ({ children }: { children: ReactNode }) => {
	return <div className="auth-layout pattern">{children}</div>;
};

export default AuthLayout;
