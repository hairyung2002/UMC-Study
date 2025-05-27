import React, { useState } from 'react';

interface LpAddModalProps {
  onClose: () => void;
  onAdd: (lp: any) => void;
}

const LpAddModal = ({ onClose, onAdd }: LpAddModalProps) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [image, setImage] = useState<File | null>(null);

  const handleAddTag = () => {
    if (tagInput.trim()) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const handleSubmit = () => {
    const payload = { title, content, tags, image };
    onAdd(payload);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-50"
      onClick={onClose}
    >

      <div
        className="bg-gray-800 rounded-lg p-6 w-[90%] max-w-md relative text-white"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-2 right-2 hover:text-red-500 text-xl"
          onClick={onClose}
        >
          ×
        </button>

        <h2 className="text-2xl font-bold mb-4">LP 추가</h2>

        <input
          placeholder="LP 제목"
          className="w-full p-2 mb-2 border border-gray-300 rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="LP 내용"
          className="w-full p-2 mb-2 border border-gray-300 rounded"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <input
          placeholder="태그 입력"
          className="w-full p-2 mb-2 border border-gray-300 rounded"
          value={tagInput}
          onChange={(e) => setTagInput(e.target.value)}
        />
        <button onClick={handleAddTag} className="bg-blue-500 text-white p-2 rounded mb-2">
          추가
        </button>
        <input type="file" onChange={(e) => setImage(e.target.files?.[0] || null)} />
        <button onClick={handleSubmit} className="bg-pink-500 text-white w-full mt-4 p-2 rounded">
          LP 저장
        </button>
      </div>
    </div>
  );
};

export default LpAddModal;
