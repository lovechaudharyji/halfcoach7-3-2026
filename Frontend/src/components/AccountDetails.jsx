// src/components/AccountDetails.jsx
import { useState, useEffect } from "react";
import { FaPaypal } from "react-icons/fa";
import { BsBank2 } from "react-icons/bs";
import axios from "axios";
import { useSelector } from "react-redux";

export const AccountDetails = () => {
  const coachId = useSelector((state) => state.coach.coach.coachId);
  const token = localStorage.getItem("token");
  const [accountDetails, setAccountDetails] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
const [formData, setFormData] = useState({
  bankDetails: {
    bankName: "",
    accountNumber: "",
    swiftBicCode: "",
    bankAddress: {
      city: "",
      country: "",
    },
    accountHolderName: "",
    routingNumber: "",
    sortCode: "",
    clabeNumber: "",
    ifscCode: "",
    bsbCode: "",
  },
  paypalDetails: {
    email: "",
  },
  preferredPayoutMethod: "none",
});


  // Fetch account details
  useEffect(() => {
    const fetchAccountDetails = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/account/${coachId}`
        );
        setAccountDetails(response.data);
        if (response.data) {
          setFormData(response.data);
        }
      } catch (error) {
        console.error("Error fetching account details:", error);
      }
    };

    if (coachId) {
      fetchAccountDetails();
    }
  }, [coachId, token]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Handle bank address fields
    if (name.startsWith("bankDetails.bankAddress.")) {
      const field = name.split("bankDetails.bankAddress.")[1];
      setFormData((prev) => ({
        ...prev,
        bankDetails: {
          ...prev.bankDetails,
          bankAddress: {
            ...prev.bankDetails.bankAddress,
            [field]: value,
          },
        },
      }));
    }
    // Handle nested fields in bankDetails and paypalDetails
    else if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }));
    }
    // Handle top-level fields
    else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // await axios.put(
      //   `http://localhost:5000/api/account/${coachId}`,
      //   formData,/
      await axios.put(
        `${import.meta.env.VITE_BASE_URL}/api/account/${coachId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setIsEditing(false);
      setAccountDetails(formData);
      alert("Account details updated successfully!");
    } catch (error) {
      console.error("Error updating account details:", error);
      alert("Failed to update account details");
    }
  };

  if (!accountDetails && !isEditing) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          Account Details
        </h2>
        <p className="text-gray-600 mb-4">No account details found.</p>
        <button
          onClick={() => setIsEditing(true)}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          Add Account Details
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Account Details</h2>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className={`px-4 py-2 rounded-lg font-medium ${
            isEditing
              ? "bg-red-500 hover:bg-red-600 text-white"
              : "bg-blue-500 hover:bg-blue-600 text-white"
          }`}
        >
          {isEditing ? "Cancel" : "Edit"}
        </button>
      </div>

      {isEditing ? (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center">
              <BsBank2 className="mr-2" /> Bank Details
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Bank Name
                </label>
                <input
                  type="text"
                  name="bankDetails.bankName"
                  value={formData.bankDetails.bankName}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  // required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Account Number
                </label>
                <input
                  type="text"
                  name="bankDetails.accountNumber"
                  value={formData.bankDetails.accountNumber}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  // required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  SWIFT/BIC Code
                </label>
                <input
                  type="text"
                  name="bankDetails.swiftBicCode"
                  value={formData.bankDetails.swiftBicCode}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                 
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Account Holder Name
                </label>
                <input
                  type="text"
                  name="bankDetails.accountHolderName"
                  value={formData.bankDetails.accountHolderName}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  // required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Bank City
                </label>
                <input
                  type="text"
                  name="bankDetails.bankAddress.city"
                  value={formData.bankDetails.bankAddress.city}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  // required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Bank Country
                </label>
                <input
                  type="text"
                  name="bankDetails.bankAddress.country"
                  value={formData.bankDetails.bankAddress.country}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  // required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Routing Number (US)
                </label>
                <input
                  type="text"
                  name="bankDetails.routingNumber"
                  value={formData.bankDetails.routingNumber}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Sort Code (UK)
                </label>
                <input
                  type="text"
                  name="bankDetails.sortCode"
                  value={formData.bankDetails.sortCode}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  CLABE Number (Mexico)
                </label>
                <input
                  type="text"
                  name="bankDetails.clabeNumber"
                  value={formData.bankDetails.clabeNumber}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  IFSC Code (India)
                </label>
                <input
                  type="text"
                  name="bankDetails.ifscCode"
                  value={formData.bankDetails.ifscCode}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  BSB Code (Australia)
                </label>
                <input
                  type="text"
                  name="bankDetails.bsbCode"
                  value={formData.bankDetails.bsbCode}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center">
              <FaPaypal className="mr-2" /> PayPal Details
            </h3>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                PayPal Email
              </label>
              <input
                type="email"
                name="paypalDetails.email"
                value={formData.paypalDetails.email}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Payout Preferences</h3>
            <div className="flex items-center space-x-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="preferredPayoutMethod"
                  value="bank"
                  checked={formData.preferredPayoutMethod === "bank"}
                  onChange={handleInputChange}
                  className="form-radio h-4 w-4 text-blue-600"
                />
                <span className="ml-2 text-gray-700">Bank Transfer</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="preferredPayoutMethod"
                  value="paypal"
                  checked={formData.preferredPayoutMethod === "paypal"}
                  onChange={handleInputChange}
                  className="form-radio h-4 w-4 text-blue-600"
                />
                <span className="ml-2 text-gray-700">PayPal</span>
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg font-medium"
          >
            Save Changes
          </button>
        </form>
      ) : (
        <div className="space-y-6">
          {accountDetails.preferredPayoutMethod !== "none" && (
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="font-medium text-blue-800">
                Preferred Payout Method:{" "}
                <span className="capitalize">
                  {accountDetails.preferredPayoutMethod}
                </span>
              </p>
            </div>
          )}

          {accountDetails.bankDetails && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold flex items-center mb-3">
                <BsBank2 className="mr-2" /> Bank Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <DetailItem
                  label="Bank Name"
                  value={accountDetails.bankDetails.bankName}
                />
                <DetailItem
                  label="Account Number"
                  value={accountDetails.bankDetails.accountNumber}
                />
                <DetailItem
                  label="SWIFT/BIC Code"
                  value={accountDetails.bankDetails.swiftBicCode}
                />
                <DetailItem
                  label="Account Holder"
                  value={accountDetails.bankDetails.accountHolderName}
                />
                <DetailItem
                  label="Bank Address"
                  value={`${accountDetails.bankDetails.bankAddress.city}, ${accountDetails.bankDetails.bankAddress.country}`}
                />
                <DetailItem
                  label="Routing Number (US)"
                  value={accountDetails.bankDetails.routingNumber}
                />
                <DetailItem
                  label="Sort Code (UK)"
                  value={accountDetails.bankDetails.sortCode}
                />
                <DetailItem
                  label="CLABE Number (Mexico)"
                  value={accountDetails.bankDetails.clabeNumber}
                />
                <DetailItem
                  label="IFSC Code (India)"
                  value={accountDetails.bankDetails.ifscCode}
                />
                <DetailItem
                  label="BSB Code (Australia)"
                  value={accountDetails.bankDetails.bsbCode}
                />
              </div>
            </div>
          )}

          {accountDetails.paypalDetails?.email && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold flex items-center mb-3">
                <FaPaypal className="mr-2" /> PayPal Details
              </h3>
              <DetailItem
                label="Email"
                value={accountDetails.paypalDetails.email}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const DetailItem = ({ label, value }) => {
  return (
    <div>
      <p className="text-sm font-medium text-gray-500">{label}</p>
      <p className="text-base text-gray-700 mt-1">{value || "Not provided"}</p>
    </div>
  );
};