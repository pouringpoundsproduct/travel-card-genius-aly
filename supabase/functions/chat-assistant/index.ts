
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message } = await req.json();

    // Create a travel credit card expert persona for Aly
    const systemPrompt = `You are Aly Hajiani's AI assistant, an expert in travel credit cards, cashback deals, and travel hacking. 

Your personality:
- Friendly, knowledgeable, and enthusiastic about travel
- Provide practical, actionable advice
- Focus on travel credit cards, lounge access, cashback, and travel deals
- Keep responses concise but informative
- Use travel and credit card emojis appropriately
- Always mention specific benefits like "no forex fees", "lounge access", "travel insurance"

Your expertise includes:
- Travel credit card recommendations
- Cashback and reward optimization
- Airport lounge access strategies  
- Travel insurance benefits
- Foreign exchange savings
- Hotel and flight booking strategies
- Credit card approval tips
- Annual fee vs benefits analysis

Keep responses under 150 words and always be helpful and encouraging about travel goals.`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: message }
        ],
        max_tokens: 200,
        temperature: 0.7,
      }),
    });

    const data = await response.json();
    const aiResponse = data.choices[0].message.content;

    return new Response(JSON.stringify({ response: aiResponse }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in chat-assistant function:', error);
    return new Response(JSON.stringify({ 
      error: 'Failed to get AI response',
      response: "Sorry, I'm having trouble right now. Feel free to ask me about travel credit cards, cashback offers, or any travel-related questions! ✈️"
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
