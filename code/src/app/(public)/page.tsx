export default function Home() {
    return (
        <main className="min-h-screen text-black flex items-center justify-center px-6">
            <div className="max-w-2xl text-center space-y-8">

                <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight dark:text-gray-200">
                    NutriAI
                </h1>

                <p className="text-lg text-gray-600 dark:text-gray-400">
                    Adaptive AI Nutritionist
                </p>

                <div className="h-px bg-gray-200 w-24 mx-auto" />

                <p className="text-gray-500">
                    A behavior-based AI system that dynamically adapts nutrition plans
                    based on energy, diet, habits, and predictive health modeling.
                </p>
            </div>
        </main>
    );
}
