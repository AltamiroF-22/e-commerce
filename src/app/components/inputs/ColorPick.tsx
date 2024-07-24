"use client";
import React, { useState } from "react";
import axios from "axios";

const ProductForm: React.FC = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [mainImage, setMainImage] = useState("");
  const [category, setCategory] = useState("");
  const [gender, setGender] = useState("UNISEX");
  const [choises, setChoises] = useState<{ color: string; size: string; stock: number }[]>([]);
  const [currentColor, setCurrentColor] = useState("");
  const [currentSize, setCurrentSize] = useState("");
  const [currentStock, setCurrentStock] = useState(0);

  const handleAddChoise = () => {
    setChoises([...choises, { color: currentColor, size: currentSize, stock: currentStock }]);
    setCurrentColor("");
    setCurrentSize("");
    setCurrentStock(0);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await axios.post('/api/products', {
        title,
        description,
        images,
        mainImage,
        category,
        gender,
        choises,
      });
      alert('Produto criado com sucesso!');
    } catch (error) {
      console.error('Erro ao criar o produto:', error);
      alert('Erro ao criar o produto.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label>Título:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="border p-2"
        />
      </div>
      <div>
        <label>Descrição:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="border p-2"
        />
      </div>
      <div>
        <label>Imagens (URLs separados por vírgula):</label>
        <input
          type="text"
          value={images.join(',')}
          onChange={(e) => setImages(e.target.value.split(','))}
          className="border p-2"
        />
      </div>
      <div>
        <label>Imagem Principal (URL):</label>
        <input
          type="text"
          value={mainImage}
          onChange={(e) => setMainImage(e.target.value)}
          className="border p-2"
        />
      </div>
      <div>
        <label>Categoria:</label>
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border p-2"
        />
      </div>
      <div>
        <label>Gênero:</label>
        <select
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          className="border p-2"
        >
          <option value="UNISEX">Unisex</option>
          <option value="MALE">Masculino</option>
          <option value="FEMALE">Feminino</option>
        </select>
      </div>
      <div>
        <label>Cor:</label>
        <select
          value={currentColor}
          onChange={(e) => setCurrentColor(e.target.value)}
          className="border p-2"
        >
          <option value="">Selecione uma cor</option>
          <option value="BLACK">Preto</option>
          <option value="WHITE">Branco</option>
          <option value="RED">Vermelho</option>
          <option value="BLUE">Azul</option>
        </select>
      </div>
      <div>
        <label>Tamanho:</label>
        <input
          type="text"
          value={currentSize}
          onChange={(e) => setCurrentSize(e.target.value)}
          className="border p-2"
        />
      </div>
      <div>
        <label>Estoque:</label>
        <input
          type="number"
          value={currentStock}
          onChange={(e) => setCurrentStock(Number(e.target.value))}
          className="border p-2"
        />
      </div>
      <button type="button" onClick={handleAddChoise} className="bg-green-500 text-white p-2 rounded">
        Adicionar Variante
      </button>
      <div>
        {choises.map((choise, index) => (
          <div key={index} className="border p-2 my-2">
            Cor: {choise.color}, Tamanho: {choise.size}, Estoque: {choise.stock}
          </div>
        ))}
      </div>
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        Criar Produto
      </button>
    </form>
  );
};

export default ProductForm;
