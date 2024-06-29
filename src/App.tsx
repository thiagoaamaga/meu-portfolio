import React, {useEffect, useState} from "react";
import ImageCarousel from "./Carousel";
import "./App.css";

export interface Project
{
    nome: string;
    imagens: string[];
}

export interface Manifest
{
    foto: string;
    nome: string;
    subtitulo: string;
    cargos: string;
    formacao: string;
    projetos: Project[];
    habilidades: string[];
    link_whatsapp: string;
    link_linkedin: string;
    link_instagram: string;
}

const App = () =>
{
    const [data, setData] = useState<Manifest | null>(null);

    useEffect(() =>
    {
        fetch(`${process.env.PUBLIC_URL}/manifest.json`)
            .then(response => response.json())
            .then(data => setData(data))
            .catch(error => console.error("Error fetching manifest:", error));
    }, []);

    if (!data)
    {
        return <div>Loading...</div>;
    }

    return (
        <div className="">
            <div className="content">
                <section>
                    <div className="profile">
                        <img src={`${process.env.PUBLIC_URL}/${data.foto}`} alt="Foto" className="mainPhoto"/>
                        <h1>{data.nome}</h1>
                        <h6>{data.subtitulo}</h6>
                        <h6>{data.cargos}</h6>
                        <p>{data.formacao}</p>

                        <br/>

                        <div>
                            <a href={data.link_whatsapp} target="_blank" rel="noopener noreferrer">
                                <i className="bi bi-whatsapp h2"></i>
                            </a>
                            <a href={data.link_linkedin} target="_blank" rel="noopener noreferrer">
                                <i className="bi bi-linkedin h2"></i>
                            </a>
                            <a href={data.link_instagram} target="_blank" rel="noopener noreferrer">
                                <i className="bi bi-instagram h2"></i>
                            </a>
                        </div>
                    </div>
                </section>

                <section>
                    <h2>Habilidades</h2><br/>
                    <ul className="row">
                        {data.habilidades.map((habilidade, index) => (
                            <li key={index} className="col-4">{habilidade}</li>
                        ))}
                    </ul>
                </section>

                <section>
                    <h2>Projetos</h2>
                    {data.projetos.map((projeto, index) => (
                        <div key={index} className="project">
                            <h4>{projeto.nome}</h4><br/>
                            <ImageCarousel key={index} imagens={projeto.imagens}/>
                        </div>
                    ))}
                </section>
            </div>

            <footer>
                <h6>Entre em Contato</h6>
                <div className="icons">
                    <a href={data.link_whatsapp} target="_blank" rel="noopener noreferrer">
                        <i className="bi bi-whatsapp h2"></i>
                    </a>
                    <a href={data.link_linkedin} target="_blank" rel="noopener noreferrer">
                        <i className="bi bi-linkedin h2"></i>
                    </a>
                    <a href={data.link_instagram} target="_blank" rel="noopener noreferrer">
                        <i className="bi bi-instagram h2"></i>
                    </a>
                </div>
            </footer>
        </div>
    );
};

export default App;
