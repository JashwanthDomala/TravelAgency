import React, { useState } from "react";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import { OpenRouter } from "@openrouter/sdk";
import ReactMarkdown from 'react-markdown';

export default function PreferredDestination() {
  const ref = useScrollReveal();
  
  // Grouped state for form inputs
  const [formData, setFormData] = useState({
    date: "",
    travelType: "",
    groupType: "",
  });
  
  const [recommendation, setRecommendation] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.date || !formData.travelType || !formData.groupType) {
      setRecommendation("Please fill out all fields so we can find the best match!");
      return;
    }

    setIsLoading(true);
    setRecommendation("Analyzing your preferences to find the perfect getaway...");

    try {
      // Initialize OpenRouter (Ensure your env var prefix matches your bundler, e.g., VITE_)
      const openrouter = new OpenRouter({
        apiKey: import.meta.env.VITE_RECOMENDATION_KEY 
      });

        // Construct the prompt based on user input
        const prompt = `I want to go on a ${formData.travelType} trip. I will be traveling as a ${formData.groupType} around ${formData.date}. Can you recommend 2 great destinations and give a brief 1-sentence reason for each? Keep it concise.`;

        // Call the API with streaming enabled AND the required chatRequest wrapper
        const stream = await openrouter.chat.send({
        chatRequest: { // <-- You MUST wrap the payload here!
            model: "poolside/laguna-m.1:free",
            messages: [
            {
                role: "user",
                content: prompt
            }
            ],
            stream: true
        }
});

      // Clear the "Analyzing..." message before appending the stream
      setRecommendation("");
      let fullResponse = "";

      // Read the stream chunks
      for await (const chunk of stream) {
        const content = chunk.choices[0]?.delta?.content;
        if (content) {
          fullResponse += content;
          setRecommendation(fullResponse);
        }
      }
    } catch (error) {
      console.error("Error fetching recommendation:", error);
      setRecommendation("Oops! Something went wrong while fetching your recommendation. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="section-padding">
      <div ref={ref} className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="heading-display text-3xl md:text-5xl font-bold mb-4">
            Confused about where to go?
          </h2>
          <p className="text-muted max-w-xl mx-auto">
            Let us handle the struggle. Tell us a bit about your travel plans, and we'll find your perfect destination.
          </p>
        </div>

        <div className="glass rounded-3xl p-8 md:p-12 shadow-xl">
          <form onSubmit={handleSubmit} className="grid md:grid-cols-3 gap-6 items-end">
            
            {/* Travel Date */}
            <div className="flex flex-col text-left">
              <label className="text-sm font-semibold text-brand-700 mb-2">
                When do you want to travel?
              </label>
              <input 
                type="date" 
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="input-field" 
              />
            </div>

            {/* Travel Type */}
            <div className="flex flex-col text-left">
              <label className="text-sm font-semibold text-brand-700 mb-2">
                Where are you interested in?
              </label>
              <select 
                name="travelType" 
                value={formData.travelType}
                onChange={handleChange}
                className="input-field cursor-pointer"
              >
                <option value="">Select an option</option>
                <option value="domestic">Domestic</option>
                <option value="international">International</option>
              </select>
            </div>

            {/* Group Type */}
            <div className="flex flex-col text-left">
              <label className="text-sm font-semibold text-brand-700 mb-2">
                Who are you traveling with?
              </label>
              <select 
                name="groupType" 
                value={formData.groupType}
                onChange={handleChange}
                className="input-field cursor-pointer"
              >
                <option value="">Select an option</option>
                <option value="group">Group</option>
                <option value="couple">Couple</option>
                <option value="family">Family</option>
              </select>
            </div>

            {/* Submit Button */}
            <div className="md:col-span-3 text-center mt-6">
              <button 
                type="submit"
                disabled={isLoading}
                className={`px-8 py-3 rounded-xl font-medium transition-all duration-300 shadow-lg w-full md:w-auto ${
                  isLoading 
                    ? "bg-brand-500/50 text-cream/50 cursor-not-allowed" 
                    : "bg-brand-500 hover:bg-brand-600 text-cream shadow-brand-500/20"
                }`}
              >
                {isLoading ? "Thinking..." : "Get Recommendation"}
              </button>
            </div>
          </form>

          {/* Recommendation Results Area */}
          {recommendation && (
            <div className="mt-8 p-6 bg-brand-500/10 rounded-2xl border border-brand-500/20 text-left transition-all duration-500 ease-in-out">
              <div className="text-brand-800 font-medium text-lg leading-relaxed">
                {/* Wrap your state variable in the ReactMarkdown component */}
                <ReactMarkdown>{recommendation}</ReactMarkdown>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}