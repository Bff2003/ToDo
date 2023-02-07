import { useEffect, useState } from "react";
import "./App.css";

function App() {

    class Tarefa {
        constructor(tarefa) {
            this.tarefa = tarefa;
            this.status = false;
        }

        getTarefa() {
            return this.tarefa;
        }

        getStatus() {
            return this.status;
        }

        setStatus(status) {
            this.status = status;
        }

    }

    const [tarefas, setTarefas] = useState([]);
    const localStorageTarefas = localStorage.getItem("tarefas");
    
    const addTarefa = (tarefa) => {
        let newTarefa = new Tarefa(tarefa);
        localStorage.setItem("tarefas", JSON.stringify([...tarefas, newTarefa]));
        setTarefas([...tarefas, newTarefa]);
    };

    const deleteTarefa = (tarefa) => {
        const index = tarefas.indexOf(tarefa);
        tarefas.splice(index, 1);
        setTarefas([...tarefas]);
        localStorage.setItem("tarefas", JSON.stringify(tarefas));
    };


    useEffect(() => {
        if (localStorageTarefas) {
            setTarefas(JSON.parse(localStorageTarefas));
        }
    }, []);

    return (
        <div className="App">
            <div className="add-tarefa">
                <input
                    type="text"
                    placeholder="Adicione uma tarefa"
                    onKeyDown={(event) => {
                        if (event.key === "Enter") {
                            addTarefa(event.target.value);
                            event.target.value = "";
                        }
                    }}
                />
            </div>

            <div className="tarefas">
                {tarefas.map((tarefa) => (
                    <div className="tarefa">
                        <input type="checkbox" checked={tarefa.status} onChange={() => {
                            tarefa.status = !tarefa.status;
                            setTarefas([...tarefas]);
                            localStorage.setItem("tarefas", JSON.stringify(tarefas));
                        }}/>
                        <input type="text" value={tarefa.tarefa} disabled/>
                        <img src="https://img.icons8.com/ios-glyphs/256/filled-trash.png" alt="delete" onClick={() => deleteTarefa(tarefa)}/>
                    </div>


                ))}
            </div>
        </div>
    );
}

export default App;
