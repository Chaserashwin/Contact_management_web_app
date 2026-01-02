import { useState, useEffect } from "react";
import API_BASE_URL from "../config";

export default function ContactList({ refreshTrigger, onContactDeleted }) {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch contacts on mount and when refreshTrigger changes
  useEffect(() => {
    fetchContacts();
  }, [refreshTrigger]);

  const fetchContacts = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(`${API_BASE_URL}/api/contacts`);
      if (response.ok) {
        const data = await response.json();
        setContacts(data);
      } else {
        setError("Failed to fetch contacts");
      }
    } catch (err) {
      setError("Error fetching contacts");
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this contact?")) {
      try {
        const response = await fetch(`${API_BASE_URL}/api/contacts/${id}`, {
          method: "DELETE",
        });
        if (response.ok) {
          onContactDeleted();
        } else {
          setError("Failed to delete contact");
        }
      } catch (err) {
        setError("Error deleting contact");
        console.error("Error:", err);
      }
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (loading && contacts.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <p className="text-gray-500 text-center">Loading contacts...</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Contacts List</h2>

      {error && (
        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      {contacts.length === 0 ? (
        <p className="text-gray-500 text-center py-8">
          No contacts yet. Add one to get started!
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">
                  Name
                </th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">
                  Email
                </th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">
                  Phone
                </th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">
                  Date Added
                </th>
                <th className="text-center py-3 px-4 font-semibold text-gray-700">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((contact) => (
                <tr
                  key={contact._id}
                  className="border-b border-gray-100 hover:bg-gray-50"
                >
                  <td className="py-3 px-4 text-gray-800">{contact.name}</td>
                  <td className="py-3 px-4 text-gray-600">{contact.email}</td>
                  <td className="py-3 px-4 text-gray-600">{contact.phone}</td>
                  <td className="py-3 px-4 text-gray-600 text-sm">
                    {formatDate(contact.createdAt)}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <button
                      onClick={() => handleDelete(contact._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="mt-4 text-sm text-gray-500 text-right">
        Total contacts: {contacts.length}
      </div>
    </div>
  );
}
