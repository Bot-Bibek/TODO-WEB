import { useState } from "react";

const App = () => {
	const [tab, setTabs] = useState(1);
	//Handle Tabs Function
	const handleTabs = (tab) => {
		setTabs(tab);
		console.log(tab);
	};
	return (
		<div className="container mx-auto p-4 max-w-md">
			{/* Heading Dev */}
			<div className="mb-6">
				<h2 className="text-2xl font-bold text-center text-gray-800">
					TO-DO LIST
				</h2>
			</div>

			{/* Placeholder and add button */}
			<div className="flex space-x-2">
				<input
					type="text"
					placeholder="Enter Your Task"
					className="flex-grow px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
				/>
				<button className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400">
					Add Task
				</button>
			</div>

			{/* Tab Navigation */}
			<div className="flex space-x-10 justify-center mt-4">
				<p
					onClick={() => handleTabs(1)}
					className={
						`${tab === 1 ? 'text-blue-700': 'text-black'} cursor-pointer font-semibold`
					}
				>
					All
				</p>
				<p
					onClick={() => handleTabs(2)}
					className={
						`${tab === 2 ? 'text-blue-700': 'text-black'} cursor-pointer font-semibold`
					}
				>
					Active
				</p>
				<p
					onClick={() => handleTabs(3)}
					className={
						`${tab === 3 ? 'text-blue-700': 'text-black'} cursor-pointer font-semibold`
					}
				>
					Completed
				</p>
			</div>

			{/* Task List */}
			<div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6 mt-4">
				<div className="mb-4">
					<p className="text-xl font-semibold">Buy Rice</p>
					<p className="text-gray-600">21/12/2024</p>
					<p className="text-green-600 font-medium">Status: Active</p>
				</div>

				{/* Buttons */}
				<div className="flex space-x-2">
					<button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200">
						Edit
					</button>
					<button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-200">
						Delete
					</button>
					<button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-200">
						Completed
					</button>
				</div>
			</div>
		</div>
	);
};

export default App;
