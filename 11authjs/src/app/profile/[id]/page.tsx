export default function UseProfile({params}: any) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-200 via-purple-200 to-pink-100 p-4">
            <div className="bg-white shadow-2xl rounded-3xl max-w-sm w-full p-8 flex flex-col items-center space-y-6 text-black">
                {/* Illustration Placeholder */}
                <div className="w-24 h-24 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-500 font-bold text-xl">
                    {/* Replace this with <Image /> from next/image if you have an SVG or PNG */}
                    Logo
                </div>

                <h2 className="text-2xl font-semibold">Profile Page</h2>
                    <p>This is where your stuff at home will be displayed.</p>
                    <span className="bg-orange-600 text-white rounded-lg p-2">{params.id}</span>
                
            </div>
        </div>
    );
}