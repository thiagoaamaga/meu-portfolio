import React, {useEffect, useState} from "react";
import ImageCarousel from "./Carousel";
import "./App.css";

interface Project
{
    nome: string;
    descricao: string;
    imagens: string[];
}

interface Service
{
    titulo: string;
    descricao: string;
}

interface Rating
{
    nome: string;
    texto: string;
}

export interface Manifest
{
    foto: string;
    nome: string;
    subtitulo: string;
    cargos: string;
    formacao: string;
    projetos: Project[];
    servicos: Service[];
    avaliacoes: Rating[];
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
        return <></>;
    }

    return (
        <>
            <div className="content">
                <section>
                    <div className="profile">
                        <img src={`${process.env.PUBLIC_URL}/${data.foto}`} alt="Foto" className="mainPhoto"/>
                        <h1 className="name">{data.nome}</h1>
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
                    <h1>Habilidades</h1><br/>
                    <ul className="row">
                        {data.habilidades.map((habilidade, index) => (
                            <li key={index} className="col-4">{habilidade}</li>
                        ))}
                    </ul>
                </section>

                <section style={{paddingTop: '10px'}}>
                    <h1>Projetos</h1>
                    {data.projetos.map((projeto, index) => (
                        <div key={index} className="carousel-item-space">
                            <h4 className="bold-text">{projeto.nome}</h4>
                            <p>{projeto.descricao}</p>
                            <ImageCarousel key={index} imagens={projeto.imagens}/>
                        </div>
                    ))}
                </section>

                <section>
                    <h1>Avaliações</h1><br/>
                    <div className="row">
                        {data.avaliacoes.map((avaliacao, index) => (
                            <div key={index} className="col-lg-4 col-sm-6 item-space">
                                <i className="bi bi-person-circle"></i>
                                <h4 className="rating-name">{avaliacao.nome}</h4>
                                <p>{avaliacao.texto}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <section>
                    <h1>Nossos Serviços</h1> <br/>
                    <div className="row">
                        {data.servicos.map((servico, index) => (
                            <div key={index} className="col-lg-6 col-sm-12 item-space">
                                <h4 className="bold-text">{servico.titulo}</h4>
                                <p>{servico.descricao}</p>
                            </div>
                        ))}
                    </div>
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
        </>
    );
};

export default App;
