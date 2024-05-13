import { FaEraser, FaRegSave } from "react-icons/fa";

import { Button } from "../../components/Button/Button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Modal from "react-modal";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "../../lib/api";
import { notasProps } from ".";
import { useEffect } from "react";

const notaSchema = z.object({
  aluno: z.string().min(10),
  email: z.string().email(),
  materia: z.string(),
  nota: z.string(),
});


interface ModalAlunoProps {
  nota: notasProps | undefined;
  isOpen: boolean;
  handleCloseModal: () => void;
}
export function ModalAluno({
  nota,
  isOpen,
  handleCloseModal,
}: ModalAlunoProps) {
  const { register, handleSubmit, reset, setValue } = useForm({
    resolver: zodResolver(notaSchema),
  });

  const handleSubmitNota = handleSubmit(async (data) => {
    if (nota?.id) {
      const { status, data: data_response } = await api.put(
        `/nota/${nota?.id}`,
        data
      );
      if (status === 200) {
        alert("atualizado com sucesso!");
      }
    } else {
      const { status } = await api.post("/nota", data);
      if (status === 200) {
        alert("cadastrado com sucesso!");
      }
    }
    reset()
    handleCloseModal()
  });

  useEffect(() => {
    if (nota) {
      setValue("aluno", nota.aluno);
      setValue("email", nota.email);
      setValue("materia", nota.materia);
      setValue("nota", nota.nota);
    } else {
      reset()
    }

  }, [nota]);

  const customStyles = {
    TbBackground: "#000",
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleCloseModal}
      style={customStyles}
    >
      <form
        onSubmit={handleSubmitNota}
        className="flex flex-col w-full h-[500px] justify-around items-center m-auto"
      >
        <h2>{nota !== undefined ? "Atualizar nota" : "Adicionar nota"}</h2>
        <div className="w-full h-fit ">
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Aluno</span>
            </div>
            <input
              type="text"
              className="input input-primary input-bordered w-full"
              {...register("aluno")}
            />
          </label>

          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Email</span>
            </div>
            <input
              type="email"
              className="input input-primary input-bordered w-full"
              {...register("email")}
            />
          </label>

          <div className="flex flex-row w-full gap-4">
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Materia</span>
              </div>
              <select
                {...register("materia")}
                className="select w-full select-primary"
              >
                <option>Matematica</option>
                <option>Português</option>
                <option>Ciencias</option>
              </select>
            </label>
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Nota</span>
              </div>
              <input
                type="number"
                step="1"
                min={0}
                max={10}
                className="input input-primary input-bordered w-full"
                {...register("nota")}
              />
            </label>
          </div>
        </div>

        <div className="w-full flex flex-row justify-end gap-2">
          <Button
            type="button"
            role="dialog"
            onClick={() => reset()}
            className="btn btn-warning btn-sm my-5"
          >
            <FaEraser /> Limpar
          </Button>
          <Button type="submit" className="btn btn-success btn-sm my-5">
            <FaRegSave className="w-4 h-4" /> {nota ? "Atualizar" : "Salvar"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
