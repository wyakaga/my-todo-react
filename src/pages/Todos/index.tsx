/* eslint-disable no-mixed-spaces-and-tabs */
import { FormEvent, useState, useMemo } from "react";
import {
	Card,
	CardBody,
	CardHeader,
	Divider,
	Tab,
	Tabs,
	Pagination,
	Skeleton,
	Popover,
	PopoverTrigger,
	PopoverContent,
	RadioGroup,
	Radio,
	Button,
	useDisclosure,
} from "@nextui-org/react";
import { useQueryClient } from "@tanstack/react-query";

import NavbarComp from "@/components/NavbarComp";
import AddButton from "@/components/AddButton";
import { useGetAllQuery, useUpdateStatusMutation } from "@/services/todos";
import convertDate from "@/utils/convertDate";
import NewTodoForm from "@/components/NewTodoForm";

function Todo() {
	const token = localStorage.getItem("token");
	const controller = useMemo(() => new AbortController(), []);
	const queryClient = useQueryClient();
	const { isOpen, onOpen, onOpenChange } = useDisclosure();

	const [page, setPage] = useState(1);
	const [status, setStatus] = useState(3);

	const updateStatusMutate = useUpdateStatusMutation();

	const { data, isLoading } = useGetAllQuery(page, token, controller);

	const handleStatusInput = (value: string) => {
		setStatus(Number(value));
	};

	const handleStatusSubmit = (e: FormEvent<HTMLFormElement>, id: number) => {
		e.preventDefault();
		updateStatusMutate.mutate(
			{ status, id, token, controller },
			{
				onSuccess: () => {
					queryClient.invalidateQueries({
						queryKey: ["todo", "all", page],
					});
					setStatus(3);
				},
			}
		);
	};

	return (
		<div className="grid grid-cols-1 grid-rows-1 relative app-bg bg-no-repeat bg-cover bg-center min-h-screen">
			<main className="flex flex-col items-center gap-y-5 pb-20">
				<NavbarComp />
				<section className="flex justify-start w-11/12">
					<AddButton onOpen={onOpen} />
				</section>
				<NewTodoForm
					isOpen={isOpen}
					onOpenChange={onOpenChange}
					token={token}
					controller={controller}
					page={page}
				/>
				<section className="h-full w-11/12 rounded-sm bg-[#EEEEEE]/30 backdrop-filter backdrop-blur-xl">
					<Tabs
						fullWidth
						radius="none"
						aria-label="types"
						classNames={{
							cursor: "bg-[#D65A31] rounded-sm",
							tabContent: "font-inter group-data-[selected=true]:text-[#EEEEEE]",
						}}
					>
						<Tab key={"todo"} title="To do" className="flex flex-col gap-y-10">
							<section className="lg:grid flex xl:grid-cols-5 lg:grid-cols-2 flex-col lg:grid-rows-2 gap-5 px-5 lg:min-h-[510px] min-h-[1300px]">
								{isLoading
									? Array.from({ length: 10 }).map((_, i) => (
											<Card key={i} className="cursor-pointer p-1 flex flex-col gap-y-3">
												<div className="p-1">
													<Skeleton className="w-5/12 rounded-lg">
														<div className="h-7 w-5/12 rounded-lg bg-default-300"></div>
													</Skeleton>
												</div>
												<Divider />
												<div className="space-y-3 p-1">
													<Skeleton className="w-3/5 rounded-lg">
														<div className="h-4 w-3/5 rounded-lg bg-default-200"></div>
													</Skeleton>
													<Skeleton className="w-6/12 rounded-lg">
														<div className="h-6 w-6/12 rounded-lg bg-default-200"></div>
													</Skeleton>
													<Skeleton className="w-3/12 rounded-lg">
														<div className="h-6 w-3/12 rounded-lg bg-default-200"></div>
													</Skeleton>
													<Skeleton className="w-9/12 rounded-lg">
														<div className="h-6 w-9/12 rounded-lg bg-default-200"></div>
													</Skeleton>
													<Skeleton className=" rounded-lg">
														<div className="h-6  rounded-lg bg-default-200"></div>
													</Skeleton>
												</div>
											</Card>
									  ))
									: data.data.result.map((datum, i) => {
											if (datum.status === 0) {
												return (
													<Card key={i} className="text-[#EEEEEE] cursor-pointer xl:h-60 h-56">
														<CardHeader className="flex justify-between">
															<p className="font-inter font-semibold text-lg">{datum.title}</p>
															<Popover offset={10} placement="left-start" backdrop="blur">
																<PopoverTrigger>
																	<svg
																		width="16px"
																		height="16px"
																		viewBox="0 0 16 16"
																		xmlns="http://www.w3.org/2000/svg"
																		fill="#EEEEEE"
																		className="bi bi-three-dots-vertical"
																	>
																		<path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
																	</svg>
																</PopoverTrigger>
																<PopoverContent className="w-[160px]">
																	<form
																		onSubmit={(e) => handleStatusSubmit(e, datum.id)}
																		className="px-1 py-2 w-full"
																	>
																		<RadioGroup
																			value={String(status)}
																			onValueChange={handleStatusInput}
																			label="Status"
																		>
																			<Radio
																				value="1"
																				classNames={{
																					wrapper: "group-data-[selected=true]:border-[#D65A31]",
																					control: "w-full h-full bg-[#D65A31]",
																				}}
																			>
																				Doing
																			</Radio>
																			<Radio
																				value="2"
																				classNames={{
																					wrapper: "group-data-[selected=true]:border-[#D65A31]",
																					control: "w-full h-full bg-[#D65A31]",
																				}}
																			>
																				Done
																			</Radio>
																		</RadioGroup>
																		<Button
																			isLoading={updateStatusMutate.isPending}
																			type="submit"
																			className="w-full mt-4 bg-[#D65A31]"
																		>
																			Submit
																		</Button>
																	</form>
																</PopoverContent>
															</Popover>
														</CardHeader>
														<Divider />
														<CardBody className="font-poppins flex flex-col gap-y-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
															<p className="text-xs text-[#EEEEEE]/40 italic">
																{convertDate(datum.deadline)}
															</p>
															<p>{datum.description}</p>
														</CardBody>
													</Card>
												);
											}
									  })}
							</section>
							<section className="w-full flex justify-center items-end">
								{data && (
									<Pagination
										showShadow
										page={page}
										onChange={(page) => setPage(page)}
										total={data.data.meta.totalPages}
										className="font-inter text-[#EEEEEE]"
										classNames={{
											cursor: "bg-[#D65A31] shadow-[#D65A31]/40",
										}}
									/>
								)}
							</section>
						</Tab>
						<Tab key={"doing"} title="Doing" className="flex flex-col gap-y-10">
							<section className="lg:grid flex xl:grid-cols-5 lg:grid-cols-2 flex-col lg:grid-rows-2 gap-5 px-5 lg:min-h-[510px] min-h-[1300px]">
								{isLoading
									? Array.from({ length: 10 }).map((_, i) => (
											<Card key={i} className="cursor-pointer p-1 flex flex-col gap-y-3">
												<div className="p-1">
													<Skeleton className="w-5/12 rounded-lg">
														<div className="h-7 w-5/12 rounded-lg bg-default-300"></div>
													</Skeleton>
												</div>
												<Divider />
												<div className="space-y-3 p-1">
													<Skeleton className="w-3/5 rounded-lg">
														<div className="h-4 w-3/5 rounded-lg bg-default-200"></div>
													</Skeleton>
													<Skeleton className="w-6/12 rounded-lg">
														<div className="h-6 w-6/12 rounded-lg bg-default-200"></div>
													</Skeleton>
													<Skeleton className="w-3/12 rounded-lg">
														<div className="h-6 w-3/12 rounded-lg bg-default-200"></div>
													</Skeleton>
													<Skeleton className="w-9/12 rounded-lg">
														<div className="h-6 w-9/12 rounded-lg bg-default-200"></div>
													</Skeleton>
													<Skeleton className=" rounded-lg">
														<div className="h-6  rounded-lg bg-default-200"></div>
													</Skeleton>
												</div>
											</Card>
									  ))
									: data.data.result.map((datum, i) => {
											if (datum.status === 1) {
												return (
													<Card key={i} className="text-[#EEEEEE] cursor-pointer xl:h-60 h-56">
														<CardHeader className="flex justify-between">
															<p className="font-inter font-semibold text-lg">{datum.title}</p>
															<Popover offset={10} placement="left-start" backdrop="blur">
																<PopoverTrigger>
																	<svg
																		width="16px"
																		height="16px"
																		viewBox="0 0 16 16"
																		xmlns="http://www.w3.org/2000/svg"
																		fill="#EEEEEE"
																		className="bi bi-three-dots-vertical"
																	>
																		<path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
																	</svg>
																</PopoverTrigger>
																<PopoverContent className="w-[160px]">
																	<form
																		onSubmit={(e) => handleStatusSubmit(e, datum.id)}
																		className="px-1 py-2 w-full"
																	>
																		<RadioGroup
																			value={String(status)}
																			onValueChange={handleStatusInput}
																			label="Status"
																		>
																			<Radio
																				value="0"
																				classNames={{
																					wrapper: "group-data-[selected=true]:border-[#D65A31]",
																					control: "w-full h-full bg-[#D65A31]",
																				}}
																			>
																				To do
																			</Radio>
																			<Radio
																				value="2"
																				classNames={{
																					wrapper: "group-data-[selected=true]:border-[#D65A31]",
																					control: "w-full h-full bg-[#D65A31]",
																				}}
																			>
																				Done
																			</Radio>
																		</RadioGroup>
																		<Button
																			isLoading={updateStatusMutate.isPending}
																			type="submit"
																			className="w-full mt-4 bg-[#D65A31]"
																		>
																			Submit
																		</Button>
																	</form>
																</PopoverContent>
															</Popover>
														</CardHeader>
														<Divider />
														<CardBody className="font-poppins flex flex-col gap-y-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
															<p className="text-xs text-[#EEEEEE]/40 italic">
																{convertDate(datum.deadline)}
															</p>
															<p>{datum.description}</p>
														</CardBody>
													</Card>
												);
											}
									  })}
							</section>
							<section className="w-full flex justify-center items-end">
								{data && (
									<Pagination
										showShadow
										page={page}
										onChange={(page) => setPage(page)}
										total={data.data.meta.totalPages}
										className="font-inter text-[#EEEEEE]"
										classNames={{
											cursor: "bg-[#D65A31] shadow-[#D65A31]/40",
										}}
									/>
								)}
							</section>
						</Tab>
						<Tab key={"done"} title="Done" className="flex flex-col gap-y-10">
							<section className="lg:grid flex xl:grid-cols-5 lg:grid-cols-2 flex-col lg:grid-rows-2 gap-5 px-5 lg:min-h-[510px] min-h-[1300px]">
								{isLoading
									? Array.from({ length: 10 }).map((_, i) => (
											<Card key={i} className="cursor-pointer p-1 flex flex-col gap-y-3">
												<div className="p-1">
													<Skeleton className="w-5/12 rounded-lg">
														<div className="h-7 w-5/12 rounded-lg bg-default-300"></div>
													</Skeleton>
												</div>
												<Divider />
												<div className="space-y-3 p-1">
													<Skeleton className="w-3/5 rounded-lg">
														<div className="h-4 w-3/5 rounded-lg bg-default-200"></div>
													</Skeleton>
													<Skeleton className="w-6/12 rounded-lg">
														<div className="h-6 w-6/12 rounded-lg bg-default-200"></div>
													</Skeleton>
													<Skeleton className="w-3/12 rounded-lg">
														<div className="h-6 w-3/12 rounded-lg bg-default-200"></div>
													</Skeleton>
													<Skeleton className="w-9/12 rounded-lg">
														<div className="h-6 w-9/12 rounded-lg bg-default-200"></div>
													</Skeleton>
													<Skeleton className=" rounded-lg">
														<div className="h-6  rounded-lg bg-default-200"></div>
													</Skeleton>
												</div>
											</Card>
									  ))
									: data.data.result.map((datum, i) => {
											if (datum.status === 2) {
												return (
													<Card key={i} className="text-[#EEEEEE] cursor-pointer xl:h-60 h-56">
														<CardHeader className="flex justify-between">
															<p className="font-inter font-semibold text-lg">{datum.title}</p>
															<Popover offset={10} placement="left-start" backdrop="blur">
																<PopoverTrigger>
																	<svg
																		width="16px"
																		height="16px"
																		viewBox="0 0 16 16"
																		xmlns="http://www.w3.org/2000/svg"
																		fill="#EEEEEE"
																		className="bi bi-three-dots-vertical"
																	>
																		<path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
																	</svg>
																</PopoverTrigger>
																<PopoverContent className="w-[160px]">
																	<form
																		onSubmit={(e) => handleStatusSubmit(e, datum.id)}
																		className="px-1 py-2 w-full"
																	>
																		<RadioGroup
																			value={String(status)}
																			onValueChange={handleStatusInput}
																			label="Status"
																		>
																			<Radio
																				value="0"
																				classNames={{
																					wrapper: "group-data-[selected=true]:border-[#D65A31]",
																					control: "w-full h-full bg-[#D65A31]",
																				}}
																			>
																				To do
																			</Radio>
																			<Radio
																				value="1"
																				classNames={{
																					wrapper: "group-data-[selected=true]:border-[#D65A31]",
																					control: "w-full h-full bg-[#D65A31]",
																				}}
																			>
																				Doing
																			</Radio>
																		</RadioGroup>
																		<Button
																			isLoading={updateStatusMutate.isPending}
																			type="submit"
																			className="w-full mt-4 bg-[#D65A31]"
																		>
																			Submit
																		</Button>
																	</form>
																</PopoverContent>
															</Popover>
														</CardHeader>
														<Divider />
														<CardBody className="font-poppins flex flex-col gap-y-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
															<p className="text-xs text-[#EEEEEE]/40 italic">
																{convertDate(datum.deadline)}
															</p>
															<p>{datum.description}</p>
														</CardBody>
													</Card>
												);
											}
									  })}
							</section>
							<section className="w-full flex justify-center items-end">
								{data && (
									<Pagination
										showShadow
										page={page}
										onChange={(page) => setPage(page)}
										total={data.data.meta.totalPages}
										className="font-inter text-[#EEEEEE]"
										classNames={{
											cursor: "bg-[#D65A31] shadow-[#D65A31]/40",
										}}
									/>
								)}
							</section>
						</Tab>
					</Tabs>
				</section>
			</main>
		</div>
	);
}

export default Todo;
