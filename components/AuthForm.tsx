"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import FormField from "./FormField";
import { useRouter } from "next/navigation";

const authFormSchema = (type: FormType) => {
	return z.object({
		name:
			type === "sign-up"
				? z.string().min(3, "Name is required")
				: z.string().optional(),
		email: z.string().email("Invalid email address"),
		password: z.string().min(6, "Password must be at least 6 characters"),
	});
};

const AuthForm = ({ type }: { type: FormType }) => {
	const router = useRouter();

	const formSchema = authFormSchema(type);
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: "",
			email: "",
			password: "",
		},
	});

	function onSubmit(values: z.infer<typeof formSchema>) {
		try {
			if (type === "sign-up") {
				// Handle sign-up logic here
				console.log("Signing up with values:", values);
				toast.success("Account created successfully! Please sign in.");
				router.push("/sign-in");
			} else {
				// Handle sign-in logic here
				console.log("Signing in with values:", values);
				toast.success("Signed in successfully!");
				router.push("/");
			}
		} catch (error) {
			console.log(error);
			toast.error(`There was an error: ${error}`);
		}
	}

	const isSignIn = type === "sign-in";

	return (
		<div className="card-section lg:min-w-[566px] lg:border-red-gradient">
			<div className="flex flex-col gap-6 ">
				<div className="flex flex-row gap-1 justify-center">
					<Image src="/logo.svg" alt="logo" width={36} height={36} />
					<h2 className="">BandWise</h2>
				</div>
				<h3>
					Practice <span className="text-primary-400">IELTS</span>{" "}
					tests with AI
				</h3>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="w-full space-y-8 form"
					>
						{!isSignIn && (
							<FormField
								control={form.control}
								name="name"
								label="Name"
								placeholder="Your Name"
							/>
						)}
						<FormField
							control={form.control}
							name="email"
							label="Email"
							placeholder="Your email address"
							type="email"
						/>
						<FormField
							control={form.control}
							name="password"
							label="Password"
							placeholder="Enter your password"
							type="password"
						/>
						<Button className="btn" type="submit">
							{isSignIn ? "Sign In" : "Create an Account"}
						</Button>
					</form>
				</Form>

				<p className="text-center text-sm text-muted-foreground">
					{isSignIn ? "No account yet?" : "Have an account already?"}
					<Link
						href={!isSignIn ? "/sign-in" : "/sign-up"}
						className="font-semibold ml-1"
					>
						{!isSignIn ? "Sign in" : "Sign up"}
					</Link>
				</p>
			</div>
		</div>
	);
};
export default AuthForm;
