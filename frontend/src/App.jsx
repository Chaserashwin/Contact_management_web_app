import { useState } from "react";
import ContactForm from "./components/ContactForm";
import ContactList from "./components/ContactList";

export default function App() {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleContactAdded = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  const handleContactDeleted = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
          Contact Management
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-1">
            <ContactForm onContactAdded={handleContactAdded} />
          </div>

          {/* Contacts List Section */}
          <div className="lg:col-span-2">
            <ContactList
              refreshTrigger={refreshTrigger}
              onContactDeleted={handleContactDeleted}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
