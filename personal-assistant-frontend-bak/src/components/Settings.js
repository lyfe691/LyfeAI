// Settings.js
import React from 'react';

function Settings() {
  return (
    <div>
      <h2>Settings</h2>
      <div>
        <label>
          Theme:
          <select>
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </label>
      </div>
    </div>
  );
}

export default Settings;
