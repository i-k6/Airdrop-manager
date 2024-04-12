import React from 'react';
import Timer from './Timer';
import Card from './Card';

function DailyList() {
  return (
    <div className="flex flex-col h-screen overflow-y-auto">
      {/* Daily Check-in Section */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4 ml-2 border-b">Daily Check-in</h2>
        <Timer />
      </section>

      {/* Task List Section */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold ml-2 mb-4 border-b">Tasklist</h2>
        <Card />
      </section>
    </div>
  );
}

export default DailyList;
