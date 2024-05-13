import { FaEdit, FaPlus } from "react-icons/fa";
import { Button } from "../../components/Button/Button";
import { ModalAluno } from "./ModalAluno";
import { Summary } from "./Summary";
import { useEffect, useState } from "react";
import { api } from "../../lib/api";
import Modal from "react-modal";

export interface notasProps {
  id: number;
  email: string;
  aluno: string;
  nota: number;
  materia: string;
}
export function Home() {
  const [notas, setNotas] = useState<notasProps[]>([]);
  const [nota, setNota] = useState<notasProps>();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isOpenChoice, setIsOpenChoice] = useState<boolean>(false);

  async function handleDelete(id: number) {
    try {
      const { status, data} = await api.delete(`/nota/${id}`);
      console.log(status, data)
      if (status === 200) {
          alert(data.msg)
      }
      setNota(undefined);
      setIsOpenChoice(false);
    } catch (error) {
      alert(error);
    }
  }
  async function fetchData() {
    try {
      const { status, data } = await api.get("/nota");
      if (status === 200) {
        setNotas(data);
      }
    } catch (error) {
      alert(error);
    }
  }

  function handleOpenModal() {
    setIsOpen(true);
    setIsOpenChoice(false);
  }

  function handleCloseModal() {
    setIsOpen(false);
    setIsOpenChoice(false);
    setNota(undefined);
  }

  function handleOpenChoice(item: notasProps) {
    setNota(item);
    setIsOpenChoice(true);
  }
  function handleCloseChoice() {
    setNota(undefined);
    setIsOpenChoice(false);
  }

  useEffect(() => {
    fetchData();
  }, [isOpen, isOpenChoice]);

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
    <main
      data-theme="light"
      className="flex flex-col p-4 justify-start items-center gap-4 bg-base-200 w-full h-screen"
    >
      <Modal
        isOpen={isOpenChoice}
        onRequestClose={handleCloseChoice}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="flex flex-col h-40 m-4 gap-4">
          <div className="flex flex-row justify-between">
            <span className="font-bold text-base-content">ALUNO:</span>
            <span>{nota?.aluno}</span>
          </div>
          <div className="flex flex-row justify-between">
            <span className="font-bold text-base-content">EMAIL:</span>
            <span>{nota?.email}</span>
          </div>
          <div className="flex flex-row justify-between">
            <span className="font-bold text-base-content">MATERIA:</span>
            <span>{nota?.materia}</span>
          </div>
          <div className="flex flex-row justify-between">
            <span className="font-bold text-base-content">NOTA:</span>
            <span>{nota?.nota}</span>
          </div>
        </div>
        <div className="flex flex-row w-full justify-between">
          <Button
            type="button"
            className="btn btn-primary btn-sm"
            onClick={handleOpenModal}
          >
            <FaEdit className="w-4 h-4" /> Editar nota
          </Button>
          <Button
            type="button"
            className="btn btn-error btn-sm"
            onClick={() => {
              if (nota?.id) handleDelete(nota?.id);
            }}
          >
            <FaEdit className="w-4 h-4" /> Excluir nota
          </Button>
        </div>
      </Modal>
      <ModalAluno
        isOpen={isOpen}
        handleCloseModal={handleCloseModal}
        nota={nota}
      />
      <Summary notas={notas} />
      <div className="flex flex-col min-h-40 w-[1050px] gap-4">
        <div className="flex justify-end w-full">
          <Button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={() => {
              handleOpenModal();
            }}
          >
            <FaPlus className="w-4 h-4" /> Adicionar nota
          </Button>
        </div>
        <div className="overflow-x-auto max-h-[600px] w-full bg-base-100 rounded-lg p-4">
          <table className="table">
            <thead className="bg-primary text-white rounded-lg">
              <tr>
                <th>Aluno</th>
                <th>Material</th>
                <th>Nota</th>
                <th className="w-48"></th>
              </tr>
            </thead>
            <tbody>
              {notas.map((item) => {
                return (
                  <tr>
                    <td className="text-lg">
                      {item.aluno}
                      <br />
                      <span className="text-primary text-sm">{item.email}</span>
                    </td>
                    <td>{item.materia}</td>
                    <td>
                      <span className="badge badge-primary text-white">
                        {item.nota.toFixed(2)}
                      </span>
                    </td>
                    <td className="flex w-48 justify-end p-0">
                      <Button
                        type="button"
                        className="btn btn-primary btn-sm my-5"
                        onClick={() => handleOpenChoice(item)}
                      >
                        <FaEdit className="w-4 h-4" /> Editar nota
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
