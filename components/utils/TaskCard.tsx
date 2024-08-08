import axios from "axios";
import { Trash, Rocket, Check } from "lucide-react";

interface Props {
  id: string;
  title: string;
  description: string;
  onDelete: (id: string) => void;
  onDone: (id: string) => void;
  onDoing: (id: string) => void; // Add this prop
}

const TaskCard = ({
  id,
  title,
  description,
  onDelete,
  onDone,
  onDoing,
}: Props) => {
  const handleDelete = async () => {
    try {
      await axios.delete(`/api/v1/task/${id}`);
      onDelete(id); // Notify the parent component about the deletion
    } catch (error) {
      console.log(error);
    }
  };

  const handleDoing = async () => {
    try {
      await axios.put(`/api/v1/task/fire/${id}`);
      onDoing(id); // Notify the parent component about the update
    } catch (error) {
      console.log(error);
    }
  };

  const handleDone = async () => {
    try {
      await axios.put(`/api/v1/task/done/${id}`);
      onDone(id); // Notify the parent component about the update
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full bg_background p-4 rounded">
      <h1>{title}</h1>
      <p className="text-sm text-gray-400">{description}</p>
      <div className="flex justify-start items-center gap-4 mt-2">
        <div
          onClick={handleDoing}
          className="rounded-full border border-orange-500 p-1 bg-orange-300 cursor-pointer"
        >
          <Rocket width={10} height={10} className="text-orange-600" />
        </div>
        <div
          onClick={handleDone}
          className="rounded-full border border-green-500 p-1 bg-green-300 cursor-pointer"
        >
          <Check width={10} height={10} className="text-green-600" />
        </div>
        <div
          onClick={handleDelete}
          className="rounded-full border border-red-500 p-1 bg-red-300 cursor-pointer"
        >
          <Trash width={10} height={10} className="text-red-600" />
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
