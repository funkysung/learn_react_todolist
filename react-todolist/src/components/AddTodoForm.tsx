import { useState } from "react";

interface AddTodoFormProps {
    onSubmit: (title: string) => void;
}

export default function AddTodoForm({onSubmit}: AddTodoFormProps) {
    const [input, setInput] = useState("");

    //function for when form is submitted
    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault(); //prevent defaultautomatic page refresh done my html
        
        if(!input.trim()) return;
        
        onSubmit(input);
        setInput("");
    }




    return(
        <form className="flex" onSubmit={handleSubmit}>
            <input
            value={input} //set value input
            onChange={(e) => setInput(e.target.value)} //what we type gets stored in the input variable variable
                placeholder="what needs to be done?"
                className="rounded-s-md grow border border-green-100 p-2"
            />
            <button 
            type="submit"
            className="w-16 rounded-e-md bg-slate-900 text-white hover:bg-slate-800"
            >
                Add
            </button>
        </form>
    )
}