import { useEffect } from "react";
import { FaSave, FaCloudUploadAlt } from "react-icons/fa";

const EditProfile = ({
  formData,
  handleInputChange,
  handleSubmit,
  handleFileChange,
  isEditing,
}) => {
    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Personal Details Section */}
        <div className="bg-gray-50 p-6 rounded-xl shadow-sm">
          <h3 className="text-xl font-semibold text-gray-800 mb-5 pb-2 border-b border-gray-200">
            Personal Details
          </h3>
          <div className="space-y-5">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Profile Picture
              </label>
              <div className="flex items-center space-x-4">
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <FaCloudUploadAlt className="w-8 h-8 text-gray-400 mb-2" />
                    <p className="text-sm text-gray-500">
                      Click to upload or drag and drop
                    </p>
                  </div>
                  <input
                    type="file"
                    name="profilePicture"
                    onChange={handleFileChange}
                    className="hidden"
                    accept="image/*"
                  />
                </label>
              </div>
            </div>

            <InputField
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              type="text"
            />

            <InputField
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              type="email"
            />

            <InputField
              label="Coach Type"
              name="coachType"
              value={formData.coachType}
              onChange={handleInputChange}
              type="text"
            />

            <InputField
              label="Country"
              name="country"
              value={formData.country}
              onChange={handleInputChange}
              type="text"
            />

            <InputField
              label=" Year of Experience"
              name="experience"
              value={formData.experience}
              onChange={handleInputChange}
              type="text"
            />

            <InputField
              label="Specialization"
              name="specialization"
              value={formData.specialization}
              onChange={handleInputChange}
              type="text"
            />

<InputField
                label="Availability (Example 7 days working timing)"
                name="availability"
                value={formData.availability}
                onChange={handleInputChange}
                type="text"
              />
          </div>
        </div>

        {/* Contact Info Section */}
        <div className="bg-gray-50 p-6 rounded-xl shadow-sm">
          <h3 className="text-xl font-semibold text-gray-800 mb-5 pb-2 border-b border-gray-200">
            Contact Information
          </h3>
          <div className="space-y-5">
            <InputField
              label="Hourly Rate (£)"
              name="hourlyRate"
              value={formData.hourlyRate}
              onChange={handleInputChange}
              type="number"
            />

            <InputField
              label="Languages (comma separated)"
              name="languages"
              value={formData.languages.join(", ")}
              onChange={(e) =>
                handleInputChange({
                  target: {
                    name: "languages",
                    value: e.target.value.split(", "),
                  },
                })
              }
              type="text"
            />

            <InputField
              label="Phone Number"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              type="tel"
            />

            {/* <InputField
              label="Address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              type="text"
            /> */}

            <div className="grid grid-cols-2 gap-4">
              <InputField
                label="City"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                type="text"
              />
              {/* <InputField
                label="State"
                name="state"
                value={formData.state}
                onChange={handleInputChange}
                type="text"
              /> */}
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* <InputField
                label="Zip Code"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleInputChange}
                type="text"
              /> */}
              {/* <InputField
                label="Availability"
                name="availability"
                value={formData.availability}
                onChange={handleInputChange}
                type="text"
              /> */}
            </div>
          </div>
        </div>

        {/* Professional Details Section */}
        <div className="bg-gray-50 p-6 rounded-xl shadow-sm md:col-span-2">
          <h3 className="text-xl font-semibold text-gray-800 mb-5 pb-2 border-b border-gray-200">
            Professional Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-5">
              <InputField
                label="Certifications (comma separated)"
                name="certifications"
                value={formData.certifications.join(", ")}
                onChange={(e) =>
                  handleInputChange({
                    target: {
                      name: "certifications",
                      value: e.target.value.split(", "),
                    },
                  })
                }
                type="text"
              />

              <InputField
                label="Qualifications"
                name="qualifications"
                value={formData.qualifications}
                onChange={handleInputChange}
                type="text"
              />
            </div>

            <div className="space-y-5">
              <InputField
                label="Social Media Links (comma separated)"
                name="socialMediaLinks"
                value={formData.socialMediaLinks.join(", ")}
                onChange={(e) =>
                  handleInputChange({
                    target: {
                      name: "socialMediaLinks",
                      value: e.target.value.split(", "),
                    },
                  })
                }
                type="text"
              />

              <InputField
                label="Website"
                name="website"
                value={formData.website}
                onChange={handleInputChange}
                type="url"
                placeholder="https://"
              />
            </div>
          </div>

          <div className="mt-5 space-y-5">
            <TextAreaField
              label="Bio"
              name="bio"
              value={formData.bio}
              onChange={handleInputChange}
              rows={4}
            />

            <TextAreaField
              label="Additional Notes"
              name="additionalNotes"
              value={formData.additionalNotes}
              onChange={handleInputChange}
              rows={3}
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg font-medium flex items-center space-x-2 hover:from-blue-600 hover:to-blue-700 transition-all shadow-md"
        >
          <FaSave className="mr-2" />
          <span>Save Changes</span>
        </button>
      </div>
    </form>
  );
};

// Reusable Input Field Component
const InputField = ({ label, name, value, onChange, type, placeholder }) => {
  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <input
        type={type || "text"}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
        placeholder={placeholder}
      />
    </div>
  );
};

// Reusable TextArea Component
const TextAreaField = ({ label, name, value, onChange, rows }) => {
  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        rows={rows || 3}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
      />
    </div>
  );
};

export default EditProfile;
