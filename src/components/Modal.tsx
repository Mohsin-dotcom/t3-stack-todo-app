import { todoList } from '@prisma/client';
import { Dispatch, FC, SetStateAction, useState } from 'react';
import { trpc } from '../utils/trpc';

interface ModalProps {
  setShowModal: Dispatch<SetStateAction<boolean>>
  setItemsList: Dispatch<SetStateAction<todoList[]>>
}

const Modal: FC<ModalProps> = ({ setShowModal, setItemsList }) => {

  const [inputValue, setInputValue] = useState<string>('')

  const mutation = trpc.item.addTodo.useMutation();

  const handleAddTodo = async () => {
    mutation.mutate({ name: inputValue }, {
      onSuccess(item) {
        setItemsList((prev) => [...prev, item]);
        setShowModal(false);
      }
    });
  };

  return (
    <div className="absolute inset-0 bg-black/75 flex items-center justify-center">
      <div className='space-y-4 p-3 bg-white'>
        <h3 className='text-xl font-semibold'>Name</h3>
        <input
          type={'text'}
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
          className='w-full bg-gray-2 rounded-md border-gray-300 bg-gray-300 shadow-sm focus:border-violet-300 focus:ring focus:ring-violet-200 focus:ring-opacity-50'
        />
        <div className='grid grid-cols-2 gap-8'>
          <button
            type='button'
            onClick={() => setShowModal(false)}
            className='rounded-md bg-gray-500 p-1 text-xs text-white transition hover:bg-gray-600'>
            Cancel
          </button>
          <button
            type='button'
            onClick={() => handleAddTodo()}
            className='rounded-md bg-violet-500 p-1 text-xs text-white transition hover:bg-violet-600'>
            Add
          </button>
        </div >
      </div >
    </div >
  )
}

export default Modal