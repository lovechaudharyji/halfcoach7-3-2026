import { useState, useEffect } from "react";
import axios from "axios";
import { FaPlus, FaMoneyBillWave, FaClock, FaInfoCircle } from "react-icons/fa";
import { GiPriceTag } from "react-icons/gi";
import ServiceCard from "./ServiceCard";

const Services = ({ coachId, token }) => {
  const [services, setServices] = useState([]);
  const [newService, setNewService] = useState({
    duration: "",
    price: "",
    description: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchServices = async () => {
      setIsLoading(true);
      try {
        // const response = await axios.get(
        //   `http://localhost:5000/api/coach/profile/${coachId}/services`,
        //   {
          const response = await axios.get(
            `${
              import.meta.env.VITE_BASE_URL
            }/api/coach/profile/${coachId}/services`,
            {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setServices(response.data.services);
      } catch (error) {
        console.error("Error fetching services", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchServices();
  }, [coachId, token]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewService((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCreateService = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      // const response = await axios.post(
      //   `http://localhost:5000/api/coach/profile/${coachId}/services`,
      //   { services: [newService] },
      const response = await axios.post(
        `${
          import.meta.env.VITE_BASE_URL
        }/api/coach/profile/${coachId}/services`,
        { services: [newService] },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setServices(response.data.coach.services);
      setNewService({ duration: "", price: 0, description: "" });
    } catch (error) {
      console.error("Error creating service", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteService = async (serviceId) => {
    if (!window.confirm("Are you sure you want to delete this service?"))
      return;

    setIsLoading(true);
    try {
      // const response = await axios.delete(
      //   `http://localhost:5000/api/coach/profile/${coachId}/services/${serviceId}`,
      //   {
        const response = await axios.delete(
          `${
            import.meta.env.VITE_BASE_URL
          }/api/coach/profile/${coachId}/services/${serviceId}`,
          {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setServices(response.data.coach.services);
    } catch (error) {
      console.error("Error deleting service", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <h2 className="text-3xl font-bold mb-6 text-gray-800 flex items-center">
          <GiPriceTag className="mr-3 text-blue-500" />
          Manage My Services
        </h2>

        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4 text-gray-700 flex items-center">
            <FaPlus className="mr-2 text-green-500" />
            Create New Service
          </h3>
          <form onSubmit={handleCreateService} className="space-y-4">
            {/* Service Duration (Dropdown) */}
            {/* <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaClock className="text-gray-400" />
              </div>
              <select
                name="duration"
                value={newService.duration}
                onChange={handleInputChange}
                required
                className="block w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select Duration</option>
                <option value="15 mins">15 min</option>
                <option value="30 mins">30 min</option>
                <option value="45 mins">45 min</option>
                <option value="1 hour">1 hour</option>
              </select>
            </div> */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaClock className="text-gray-400" />
              </div>
              <input
                list="duration-options"
                name="duration"
                value={newService.duration}
                onChange={handleInputChange}
                required
                placeholder="Select or type duration"
                className="block w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <datalist id="duration-options">
                <option value="15 mins" />
                <option value="30 mins" />
                <option value="45 mins" />
                <option value="1 hour" />
              </datalist>
            </div>

            {/* Price Input */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaMoneyBillWave className="text-gray-400" />
              </div>
              <input
                type="number"
                name="price"
                placeholder="Price"
                value={newService.price}
                onChange={handleInputChange}
                required
                className="block w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Service Description */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 pt-3 flex items-start pointer-events-none">
                <FaInfoCircle className="text-gray-400" />
              </div>
              <textarea
                name="description"
                placeholder="Service Description (Optional)"
                value={newService.description}
                onChange={handleInputChange}
                rows="3"
                className="block w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="flex items-center space-x-4">
              <button
                type="submit"
                className={`flex items-center px-6 py-3 rounded-lg text-white font-medium ${
                  services.length >= 5 || isLoading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                } transition-colors`}
                disabled={services.length >= 5 || isLoading}
              >
                <FaPlus className="mr-2" />
                {isLoading ? "Creating..." : "Create Service"}
              </button>

              {services.length >= 5 && (
                <p className="text-red-500 flex items-center">
                  <FaInfoCircle className="mr-1" />
                  You can only add up to 5 services.
                </p>
              )}
            </div>
          </form>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-6 text-gray-700">
            Existing Services ({services.length})
          </h3>

          {isLoading && services.length === 0 ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : services.length === 0 ? (
            <div className="text-center py-8 bg-gray-50 rounded-lg">
              <p className="text-gray-500">No services added yet</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service) => (
                <ServiceCard
                  key={service._id}
                  service={service}
                  onDelete={handleDeleteService}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Services;