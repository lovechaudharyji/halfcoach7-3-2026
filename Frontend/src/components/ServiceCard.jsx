import { FaTrashAlt, FaEdit, FaClock } from "react-icons/fa";
import { GiPriceTag } from "react-icons/gi";

const ServiceCard = ({ service, onDelete, className }) => {
  return (
    <div
      className={`bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border-l-4 border-blue-500 ${className}`}
    >
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <div className="flex items-center mb-2">
            <FaClock className="text-blue-500 mr-2" />
            <h4 className="text-xl font-bold text-gray-800">
              {service.duration}
            </h4>
          </div>

          {service.description && (
            <p className="text-gray-600 mb-4 text-sm">{service.description}</p>
          )}

          <div className="flex items-center justify-between mt-4">
            <span className="text-2xl font-bold text-blue-600 flex items-center">
              <span className="text-sm font-normal mr-1">£</span>
              {service.price}
            </span>

            <div className="flex space-x-2">
              <button
                onClick={() => onDelete(service._id)}
                className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-50 transition-colors"
              >
                <FaTrashAlt />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;