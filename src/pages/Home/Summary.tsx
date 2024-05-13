import { notasProps } from ".";
import { Stet } from "../../components/Stet/Stet";

interface SummaryProps {
  notas: notasProps[]
}
export function Summary({ notas }: SummaryProps) {

  function reducePortugues(notas: notasProps[]) {
    const notasPortugues = notas.filter(aluno => aluno.materia === "Português")
    if (notasPortugues.length === 0 ) return 0
    const soma = notasPortugues.reduce((total, item) => total + item.nota, 0);
    return (soma / notasPortugues.length).toFixed(2);
  }
  function reduceMatematica(notas: notasProps[]) {
    const notasMatematica = notas.filter(aluno => aluno.materia === "Matematica")
    if (notasMatematica.length === 0 ) return 0
    const soma = notasMatematica.reduce((total, item) => total + item.nota, 0);
    return (soma / notasMatematica.length).toFixed(2);
  }
  function reduceCiencia(notas: notasProps[]) {
    const notasCiencia = notas.filter(aluno => aluno.materia === "Ciencias")
    if (notasCiencia.length === 0 ) return 0
    const soma = notasCiencia.reduce((total, item) => total + item.nota, 0);
    return (soma / notasCiencia.length).toFixed(2);
  }
  
  return (
    <div className="flex flex-row w-screen justify-center items-center gap-4">
      <Stet
        title="Português"
        value={reducePortugues(notas)}
        className="bg-secondary w-60 h-40 rounded-lg"
      />
      <Stet
        title="Matematica"
        value={reduceMatematica(notas)}
        className="bg-primary w-60 h-40 rounded-lg"
      />
      <Stet
        title="Ciências"
        value={reduceCiencia(notas)}
        className="bg-accent w-60 h-40 rounded-lg"
      />
    </div>
  );
}
