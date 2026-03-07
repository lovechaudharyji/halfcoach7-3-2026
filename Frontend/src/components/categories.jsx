
import { useNavigate } from "react-router-dom";
import {
  FaChalkboardTeacher,
  FaHeart,
  FaBriefcase,
  FaUserTie,
  FaClipboardList,
} from "react-icons/fa";

const categories = [
  { name: "Business Coach", icon: <FaBriefcase />, value: "Business" },
  { name: "Relationship Coach", icon: <FaHeart />, value: "Relationship" },
  { name: "Life Coach", icon: <FaChalkboardTeacher />, value: "Life" },
  { name: "Career Coach", icon: <FaUserTie />, value: "Career" },
  {
    name: "Productivity Coach",
    icon: <FaClipboardList />,
    value: "Productivity",
  },
];

const Categories = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (categoryValue) => {
    navigate(`/coaches?category=${categoryValue}`);
  };

  return (
    <div className="p-8 bg-gray-600">
      <h2 className="text-3xl font-semibold text-center mb-8">
        Browse Coaches by Category
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
        {categories.map((category, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center justify-center hover:bg-gray-100 transition-all cursor-pointer"
            onClick={() => handleCategoryClick(category.value)}
          >
            <div className="text-4xl text-indigo-600 mb-4">{category.icon}</div>
            <h3 className="text-lg font-medium text-gray-700">
              {category.name}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;