import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'
import './TodoList.css';

export function TodoList(){

    const [tareas, setTareas] = useState([]);

    const [tarea,setTarea]= useState("");

    //const [chequeado, setChequeado]= useState(false);

    //asigna el valor del input a tarea
    const handleTarea = (event)=>{
        event.preventDefault();
        setTarea(event.target.value);
        console.log(tarea);
    }

    //el valor de tarea se envía a la lista de tareas
    const agregarTarea=(event)=>{
        event.preventDefault();
        let objeto;
        if(tareas.length===0){
            objeto= {id: 1, tarea:tarea, checked:false}
        }
        else{
            objeto= {id: tareas[tareas.length-1].id +1, tarea:tarea, checked:false}
        }
        setTareas([...tareas, objeto]);
        document.getElementById("inputTarea").value = "";
        console.log(tareas);
    }

    //se marca el checkbox de la lista de tareas para saber que está completado
    const marcarTareaHecha=(position)=>{
        const chequeadoActualizado= tareas.map((tarea, index)=>
            index=== position? {id: tarea.id, tarea: tarea.tarea, checked: !tarea.checked}: tarea
        );
        setTareas(chequeadoActualizado);
        var elemento= document.getElementsByClassName("tarea");
       // elemento.style.textDecoration="line-through";
        console.log(tareas)
    }

    //se elimina la tarea mediante el icono de basurero
    const eliminarTarea=(indexDelete)=>{
        const resultado = tareas.filter((tarea, index) => index != indexDelete);
        setTareas(resultado);
        console.log(tareas);
        } 

        //se mapea el array de tareas para mostrar
    const listado= tareas.map(({tarea, checked}, index)=>
        <div key={index} className="index">
            <div className="margen ">
            <input type="checkbox" id="checkbox" className="rounded-checkbox" checked={checked} onChange={()=>marcarTareaHecha(index)}></input>
            {checked==true?<p className="tarea"><del>{tarea}</del></p>:<p className="tarea">{tarea}</p>}
            </div>
            <FontAwesomeIcon className="iconoBasura" icon={faTrashCan} onClick={()=>{eliminarTarea(index)}}/>
        </div>
        )

return(
<div id="contenedor">
    <h1>TO DO LIST</h1>
    <form className=" d-flex justify-content-around contenedorForm">
        <input type="text" onChange={handleTarea} id="inputTarea" className="form-control "/>
        <button onClick={agregarTarea} className="btn btn-primary">Agregar tarea</button>
    </form>
    <br/>
    <div>
        {tareas.length==0?<p className="textoAgregaTarea">Agrega tus tareas</p>:listado}
    </div>
</div>
);
}