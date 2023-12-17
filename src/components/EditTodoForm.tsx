import { ChangeEvent, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import {
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	Input,
	Textarea,
	ModalFooter,
	Button,
} from "@nextui-org/react";

import { useUpdateTodoMutation } from "@/services/todos";
import dateValidator from "@/utils/dateValidator";
import dateToString from "@/utils/dateToString";
import IController from "@/interfaces/controller.interface";
import { ISingleResult } from "@/interfaces/responses/todos.interface";

function EditTodoForm({
	isOpen,
	onOpenChange,
	id,
	token,
	controller,
	data,
}: {
	isOpen: boolean;
	onOpenChange: () => void;
	id: number;
	token: string;
	controller: IController;
	data: ISingleResult;
}) {
	const queryClient = useQueryClient();
	const updateTodoMutate = useUpdateTodoMutation();

	const [form, setForm] = useState({
		title: "",
		description: "",
		deadline: "",
	});
	const [errMessage, setErrMessage] = useState("");

	const handleEditTodoInput = (e: ChangeEvent<HTMLInputElement>) => {
		setForm((form) => {
			return { ...form, [e.target.name]: e.target.value };
		});
	};

	const handleEditTodoSubmit = (onClose: () => void) => {
		if (form.deadline && !dateValidator(form.deadline)) {
			return setErrMessage("Deadline format should be in YYYY-MM-DD");
		}

		setErrMessage("");

		updateTodoMutate.mutate(
			{
				id,
				token,
				controller,
				title: form.title || data.data.title,
				description: form.description || data.data.description,
				deadline: form.deadline || dateToString(data.data.deadline),
			},
			{
				onSuccess: () => {
					queryClient.invalidateQueries({
						queryKey: ["todo", "single", id],
					});
					onClose();
					setErrMessage("");
				},
			}
		);
	};

	return (
		<>
			<Modal
				backdrop="blur"
				isOpen={isOpen}
				onOpenChange={onOpenChange}
				classNames={{
					closeButton: "text-black hover:text-[#EEEEEE] duration-300",
				}}
				className="bg-[#EEEEEE]/50 font-poppins"
			>
				<ModalContent>
					{(onClose) => (
						<>
							<ModalHeader className="flex flex-col gap-1">Edit todo data</ModalHeader>
							<ModalBody>
								<Input onChange={handleEditTodoInput} type="text" label="Title" name="title" />
								<Textarea
									onChange={handleEditTodoInput}
									type="text"
									label="Description"
									name="description"
								/>
								<Input
									onChange={handleEditTodoInput}
									type="text"
									label="Deadline"
									name="deadline"
								/>
							</ModalBody>
							<ModalFooter className="flex flex-col gap-y-2">
								{errMessage && <p>{errMessage}</p>}
								<Button
									isLoading={updateTodoMutate.isPending && !errMessage}
									onPress={() => handleEditTodoSubmit(onClose)}
									className="bg-[#D65A31]"
								>
									Submit
								</Button>
							</ModalFooter>
						</>
					)}
				</ModalContent>
			</Modal>
		</>
	);
}

export default EditTodoForm;
