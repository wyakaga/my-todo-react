import { FormEvent, Key, useState, useMemo, ChangeEvent } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Input, Tab, Tabs, Link } from "@nextui-org/react";

import { useLoginMutation, useRegisterMutation } from "@/services/auth";

function Auth() {
	const { hash } = useLocation();
	const slicedHash = hash.slice(1, hash.length);
	const [selected, setSelected] = useState(slicedHash as Key);
	const navigate = useNavigate();
	const loginMutate = useLoginMutation();
	const registerMutate = useRegisterMutation();

	const controller = useMemo(() => new AbortController(), []);

	const [loginForm, setLoginForm] = useState({
		email: "",
		password: "",
	});

	const [registerForm, setRegisterForm] = useState({
		email: "",
		password: ""
	})

	const handleLoginInput = (e: ChangeEvent<HTMLInputElement>) => {
		setLoginForm((form) => {
			return { ...form, [e.target.name]: e.target.value };
		});
	};

	const handleRegisterInput = (e: ChangeEvent<HTMLInputElement>) => {
		setRegisterForm((form) => {
			return { ...form, [e.target.name]: e.target.value };
		});
	};

	const handleLoginSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		loginMutate.mutate(
			{ email: loginForm.email, password: loginForm.password, controller },
			{
				onSuccess: (data) => localStorage.setItem("token", data.data.token),
			}
		);
	};

	const handleRegisterSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		registerMutate.mutate({email: registerForm.email, password: registerForm.password, controller}, {
			onSuccess: () => {
				setSelected("login")
				navigate("#login", {replace: true})
			}
		})
	};

	return (
		<div className="grid grid-cols-1 grid-rows-1 relative home-bg bg-no-repeat bg-cover bg-center md:h-screen min-h-screen">
			<main className="flex flex-col justify-center items-center">
				<section className="h-4/6 w-1/2 rounded-sm bg-[#EEEEEE]/30 backdrop-filter backdrop-blur-xl">
					<Tabs
						aria-label="Authentication"
						fullWidth
						selectedKey={selected as string}
						onSelectionChange={(selected) => {
							setSelected(selected);
							navigate(`#${selected}`, { replace: true });
						}}
						radius="none"
						classNames={{
							cursor: "bg-[#D65A31] rounded-sm",
							tabContent: "font-inter group-data-[selected=true]:text-[#EEEEEE]",
						}}
					>
						<Tab key={"login"} title="Login" className="h-[90%]">
							<form
								onSubmit={handleLoginSubmit}
								className="h-full flex flex-col justify-between p-5 font-poppins"
							>
								<div className="flex flex-col gap-y-5">
									<Input
										onChange={handleLoginInput}
										size="lg"
										isRequired
										label="Email"
										labelPlacement="outside"
										type="email"
										name="email"
									/>
									<Input
										onChange={handleLoginInput}
										size="lg"
										isRequired
										label="Password"
										labelPlacement="outside"
										type="password"
										name="password"
									/>
								</div>
								<div className="flex flex-col gap-y-5">
									<p className="text-center text-small">
										Need to create an account?{" "}
										<Link
											size="sm"
											className="text-[#D65A31] font-medium"
											onPress={() => {
												setSelected("register");
												navigate("#register", { replace: true });
											}}
										>
											Register
										</Link>
									</p>
									<div className="flex gap-2 justify-end">
										<Button
											isLoading={loginMutate.isPending}
											type="submit"
											fullWidth
											className="bg-[#D65A31] font-medium text-lg"
										>
											Login
										</Button>
									</div>
								</div>
							</form>
						</Tab>
						<Tab key={"register"} title="Register" className="h-[90%]">
							<form  onSubmit={handleRegisterSubmit} className="h-full flex flex-col justify-between p-5 font-poppins">
								<div className="flex flex-col gap-y-5">
									<Input onChange={handleRegisterInput} size="lg" isRequired label="Email" labelPlacement="outside" type="email" name="email" />
									<Input
										onChange={handleRegisterInput}
										size="lg"
										isRequired
										label="Password"
										labelPlacement="outside"
										type="password"
										name="password"
									/>
								</div>
								<div className="flex flex-col gap-y-5">
									<p className="text-center text-small">
										Already have an account?{" "}
										<Link
											size="sm"
											className="text-[#D65A31] font-medium"
											onPress={() => {
												setSelected("login");
												navigate("#login", { replace: true });
											}}
										>
											Login
										</Link>
									</p>
									<div className="flex gap-2 justify-end">
										<Button isLoading={registerMutate.isPending} type="submit" fullWidth className="bg-[#D65A31] font-medium text-lg">
											Register
										</Button>
									</div>
								</div>
							</form>
						</Tab>
					</Tabs>
				</section>
			</main>
		</div>
	);
}

export default Auth;
