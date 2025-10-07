import './Style-BookModal.css';
import { useState } from 'react';

type BookProps = {
  capa: string;
  titulo: string;
  autor: string;
  ano: number;
  genero: string;
  estrelas: number;
  sinopse?: string;
  onClose?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
};

const BookModal = ({ capa, titulo, autor, ano, genero, estrelas, sinopse, onClose, onEdit, onDelete }: BookProps) => {
 
  return (

      <div className="book-modal-visualizar"> 
        <button
          onClick={onClose}
          className="fechar-visualizar"
        >
          x
        </button>
        <img src={capa} alt={`${titulo} - ${autor}`} />

        <div className="componente-titulo">
          <h2 className="titulo-visualizar">{titulo}</h2>
          <p className="info-visualizar">⭐ {estrelas}</p>
        </div>

        <p className="info-visualizar-descricao">{sinopse}</p>
        <p className="info-visualizar componente-retangulo">Autor: {autor} - {ano}</p>
        <p className="info-visualizar componente-retangulo">Gênero: {genero}</p>
        

        <div className="btn-config">
          <button
              onClick={onEdit}
              className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition"
            >
              Editar
            </button>
            <button
              onClick= {onDelete}
              className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
            >
              Excluir
            </button>
        </div>
      </div>
  );
};

export default BookModal;
      