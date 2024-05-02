import React from "react";
import { DashXProvider, Preference, Preferences, useDashXProvider } from "@dashx/react";

const IdentifyUser = () => {
  const dashX = useDashXProvider();
  dashX.identify("8603");

  return null;
};

const Switch = ({ label, ...props }) => {
  console.log(props);
  return (
    <label className="inline-flex items-center cursor-pointer">
      <input type="checkbox" className="sr-only" {...props} />
      <div
        className={`relative w-10 h-5 rounded-full ${
          props.checked ? "after:translate-x-full bg-cyan-400" : "bg-gray-200"
        } after:content-[''] after:absolute after:top-[-2px] after:start-[-2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all`}
      ></div>
      <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
        {label}
      </span>
    </label>
  );
};

const renderPreference = ({ onChange, preference }) => {
  const handleChange = (event) => {
    onChange(event, preference);
  };
  return (
    <div key={preference[0]} className="table-row">
      <span className="table-cell py-3 px-6 border-t border-gray-200 font-semibold uppercase text-gray-600">
        {preference[0]}
      </span>
      <span className="table-cell py-3 px-6 border-t border-gray-200">
        <Switch
          name="email"
          checked={preference[1].email}
          onChange={handleChange}
        />
      </span>
      <span className="table-cell py-3 px-6 border-t border-gray-200">
        <Switch
          name="sms"
          checked={preference[1].sms}
          onChange={handleChange}
        />
      </span>
      <span className="table-cell py-3 px-6 border-t border-gray-200">
        <Switch
          name="push"
          checked={preference[1].push}
          onChange={handleChange}
        />
      </span>
    </div>
  );
};

const renderPreferences = ({ preferences, loading, onChange }) => {
  if (preferences)
    return (
      <div className="table">
        <div className="table-row">
          <div className="table-cell uppercase py-3 px-6"></div>
          <div className="table-cell uppercase py-3 px-6 text-gray-400">
            Email
          </div>
          <div className="table-cell uppercase py-3 px-6 text-gray-400">
            Text
          </div>
          <div className="table-cell uppercase py-3 px-6 text-gray-400">
            In-app
          </div>
        </div>
        {preferences.map((pref) => (
          <Preference
            preference={pref}
            onChange={onChange}
            key={pref[0]}
            // custom code
            renderPreference={renderPreference}
          ></Preference>
        ))}
      </div>
    );
  if (loading) return <div>Loading...</div>;
  return <div>An unexpected error ocurred</div>;
};

export default function App() {
  console.log("app")
  return (
    <DashXProvider
      publicKey="IAEmpUtzeHOQTdD0cDYQeJ83"
      targetEnvironment="staging"
    >
      <IdentifyUser />
      <Preferences
        // Custom code
        renderPreferences={renderPreferences}
      ></Preferences>
    </DashXProvider>
  );
}
