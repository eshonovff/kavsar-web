export const EmptyState = ({ icon, title, message }) => (
    <div className="col-span-full text-center p-12 bg-white/80 backdrop-blur-md rounded-2xl shadow-lg">
        <div className="w-16 h-16 mx-auto rounded-full bg-indigo-100 flex items-center justify-center mb-4">
            {icon}
        </div>
        <h3 className="text-xl font-medium mb-2 text-gray-800">{title}</h3>
        <p className="text-gray-600">{message}</p>
    </div>
);