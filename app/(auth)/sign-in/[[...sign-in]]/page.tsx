import { SignIn } from "@clerk/nextjs";

const Page = () => {
	return (
		<main className="flex h-full items-center justify-center translate-y-[40%]">
			<SignIn />
		</main>
	);
};

export default Page;
