import NavBar from "@/components/NavBar";
import React from "react";

const Landing = () => {
	return (
		<main>
			<div className="bg-primary-500 max-h-lg">
				<p className="font-semibold text-white text-[12px] lg:text-xl text-center align-middle py-2">
					Start your IELTS journey today
				</p>
			</div>
			<NavBar />
		</main>
	);
};

export default Landing;
