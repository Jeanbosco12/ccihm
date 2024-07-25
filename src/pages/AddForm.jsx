import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import Footer from '../component/Footer';

function AddForm() {
    const [data, setData] = useState([])
    const [values, setValues] = useState({
        ref: '',
        rang: '',
        deb: '',
        fin: '',
        dure: '',
        im: ''
    });
    

    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:8080/membre/", values)
            .then(res => {
                Swal.fire({ title: "Enregistré !", text: "Requette reussi ", icon: "success" });
                console.log(res);
                navigate("/contrat");
            })
            .catch(err => {
                console.log(err);
                Swal.fire({ title: "Erreur !", text: "Requette refusé ", icon: "error" });
            })
    };

    return (
        <div>
            <>
                FORMULAIRE
            </>
        </div>
    )
}

export default AddForm
