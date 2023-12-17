import { useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import {
	Divider,
	Popover,
	PopoverContent,
	PopoverTrigger,
	Skeleton,
	Spinner,
	Tooltip,
	useDisclosure,
} from "@nextui-org/react";

import NavbarComp from "@/components/NavbarComp";
import EditTodoForm from "@/components/EditTodoForm";
import { useDeleteTodoMutation, useGetSingleQuery } from "@/services/todos";
import convertDate from "@/utils/convertDate";
import useTitle from "@/utils/useTitle";

function TodoDetails() {
	const { id } = useParams();
	const token = localStorage.getItem("token");
	const controller = useMemo(() => new AbortController(), []);
	const { isOpen, onOpenChange, onOpen } = useDisclosure();
	const deleteTodoMutate = useDeleteTodoMutation();
	const queryClient = useQueryClient();
	const navigate = useNavigate();

	const { data, isLoading } = useGetSingleQuery(Number(id), token, controller);

	const handleDeleteTodo = () => {
		deleteTodoMutate.mutate(
			{
				id: Number(id),
				token,
				controller,
			},
			{
				onSuccess: () => {
					navigate("/app", { replace: true });
					queryClient.invalidateQueries({
						queryKey: ["todo", "single", id],
					});
				},
			}
		);
	};

	useTitle(data ? `${data.data.title}` : "Todo details");

	return (
		<div className="grid grid-cols-1 grid-rows-1 relative app-bg bg-no-repeat bg-cover bg-center min-h-screen">
			<main className="flex flex-col items-center gap-y-5 pb-5">
				<NavbarComp />
				<EditTodoForm
					isOpen={isOpen}
					onOpenChange={onOpenChange}
					id={Number(id)}
					token={token}
					controller={controller}
					data={data}
				/>
				<section className="flex flex-col gap-y-5 h-full w-11/12 rounded-sm bg-[#EEEEEE]/30 backdrop-filter backdrop-blur-xl">
					<div className="bg-default-100 p-2">
						<div className="bg-[#D65A31] p-1 rounded-sm flex justify-between">
							<p className="font-inter text-3xl text-[#EEEEEE] font-bold">Details</p>
							<div className="cursor-pointer">
								<Popover offset={10} placement="left-start">
									<PopoverTrigger>
										<svg
											width="32px"
											height="32px"
											viewBox="0 0 16 16"
											xmlns="http://www.w3.org/2000/svg"
											fill="#EEEEEE"
											className="bi bi-three-dots-vertical"
										>
											<path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
										</svg>
									</PopoverTrigger>
									<PopoverContent className="w-[100px] flex flex-row justify-between p-2">
										<Tooltip content="Edit todo data" placement="top-end" offset={20}>
											<div onClick={onOpen} className="cursor-pointer">
												<svg
													width="32px"
													height="32px"
													viewBox="0 0 24 24"
													fill="none"
													xmlns="http://www.w3.org/2000/svg"
												>
													<path
														d="M4.20999 20.5199C4.11375 20.521 4.01826 20.5029 3.92902 20.4669C3.83977 20.4308 3.75854 20.3775 3.68999 20.3099C3.61139 20.2323 3.55092 20.1383 3.51288 20.0346C3.47485 19.9308 3.4602 19.82 3.46999 19.7099L3.77999 15.8699C3.79328 15.6916 3.87156 15.5244 3.99999 15.3999L15.06 4.33995C15.6762 3.76286 16.4961 3.45361 17.34 3.47995C18.1784 3.48645 18.9828 3.81181 19.59 4.38995C20.1723 4.98795 20.5073 5.7839 20.5277 6.61837C20.5481 7.45284 20.2524 8.26421 19.7 8.88995L8.62999 19.9999C8.50609 20.1234 8.34386 20.201 8.16999 20.2199L4.27999 20.5699L4.20999 20.5199ZM5.20999 16.2599L4.99999 18.9999L7.73999 18.7499L18.64 7.82995C18.8525 7.57842 18.9884 7.27118 19.0314 6.94472C19.0745 6.61827 19.0229 6.28631 18.8828 5.9883C18.7428 5.69028 18.5201 5.43873 18.2413 5.26354C17.9625 5.08834 17.6393 4.99685 17.31 4.99995C17.0936 4.98621 16.8766 5.01633 16.6721 5.0885C16.4676 5.16067 16.2798 5.27341 16.12 5.41995L5.20999 16.2599Z"
														fill="#EEEEEE"
													/>
												</svg>
											</div>
										</Tooltip>
										<Tooltip content="Delete todo" placement="bottom-end" offset={20}>
											<div onClick={handleDeleteTodo} className="cursor-pointer">
												{deleteTodoMutate.isPending ? (
													<Spinner
														classNames={{
															circle1: "border-b-[#D65A31]",
															circle2: "border-b-[#D65A31]",
														}}
													/>
												) : (
													<svg
														width="32px"
														height="32px"
														viewBox="0 0 24 24"
														fill="none"
														xmlns="http://www.w3.org/2000/svg"
													>
														<path
															d="M20.5001 6H3.5"
															stroke="#D65A31"
															stroke-width="1.5"
															stroke-linecap="round"
														/>
														<path
															d="M18.8332 8.5L18.3732 15.3991C18.1962 18.054 18.1077 19.3815 17.2427 20.1907C16.3777 21 15.0473 21 12.3865 21H11.6132C8.95235 21 7.62195 21 6.75694 20.1907C5.89194 19.3815 5.80344 18.054 5.62644 15.3991L5.1665 8.5"
															stroke="#D65A31"
															stroke-width="1.5"
															stroke-linecap="round"
														/>
														<path
															d="M9.5 11L10 16"
															stroke="#D65A31"
															stroke-width="1.5"
															stroke-linecap="round"
														/>
														<path
															d="M14.5 11L14 16"
															stroke="#D65A31"
															stroke-width="1.5"
															stroke-linecap="round"
														/>
														<path
															d="M6.5 6C6.55588 6 6.58382 6 6.60915 5.99936C7.43259 5.97849 8.15902 5.45491 8.43922 4.68032C8.44784 4.65649 8.45667 4.62999 8.47434 4.57697L8.57143 4.28571C8.65431 4.03708 8.69575 3.91276 8.75071 3.8072C8.97001 3.38607 9.37574 3.09364 9.84461 3.01877C9.96213 3 10.0932 3 10.3553 3H13.6447C13.9068 3 14.0379 3 14.1554 3.01877C14.6243 3.09364 15.03 3.38607 15.2493 3.8072C15.3043 3.91276 15.3457 4.03708 15.4286 4.28571L15.5257 4.57697C15.5433 4.62992 15.5522 4.65651 15.5608 4.68032C15.841 5.45491 16.5674 5.97849 17.3909 5.99936C17.4162 6 17.4441 6 17.5 6"
															stroke="#D65A31"
															stroke-width="1.5"
														/>
													</svg>
												)}
											</div>
										</Tooltip>
									</PopoverContent>
								</Popover>
							</div>
						</div>
					</div>
					<div className="p-8 h-full rounded-sm">
						<div className="bg-default-100 h-full flex flex-col p-4 font-poppins">
							{isLoading ? (
								<Skeleton className="h-8 w-3/12 rounded-sm" />
							) : (
								<p className="text-2xl font-semibold">{data && data.data.title}</p>
							)}
							<Divider className="my-3" />
							<div className="flex flex-col gap-y-7 overflow-auto">
								{isLoading ? (
									<Skeleton className="h-5 w-2/12 rounded-sm" />
								) : (
									<p className="text-sm italic">{data && convertDate(data.data.deadline)}</p>
								)}
								{isLoading ? (
									Array.from({ length: 8 }).map((_, i) => {
										if (i % 4 === 0) {
											return <Skeleton className="h-7 w-7/12 rounded-sm" />;
										}
										if (i % 4 === 1) {
											return <Skeleton className="h-7 w-5/12 rounded-sm" />;
										}
										if (i % 4 === 2) {
											return <Skeleton className="h-7 w-11/12 rounded-sm" />;
										}
										if (i % 4 === 3) {
											return <Skeleton className="h-7 w-9/12 rounded-sm" />;
										}
									})
								) : (
									<p className="text-xl font-medium">{data && data.data.description}</p>
								)}
							</div>
						</div>
					</div>
				</section>
			</main>
		</div>
	);
}

export default TodoDetails;
