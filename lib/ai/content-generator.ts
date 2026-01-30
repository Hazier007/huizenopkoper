import {
  getProvinceContentPrompt,
  getCityContentPrompt,
  getHighlightsPrompt,
  getNeighborhoodsPrompt,
  getAmenitiesPrompt,
  type ProvinceContentPromptData,
  type CityContentPromptData,
} from './prompts';

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';

interface OpenAIMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

interface OpenAIResponse {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
}

async function callOpenAI(messages: OpenAIMessage[], temperature = 0.7): Promise<string> {
  if (!OPENAI_API_KEY) {
    throw new Error('OpenAI API key not configured');
  }

  const response = await fetch(OPENAI_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages,
      temperature,
      max_tokens: 2000,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`OpenAI API error: ${response.status} - ${error}`);
  }

  const data: OpenAIResponse = await response.json();
  return data.choices[0].message.content;
}

export interface ProvinceContent {
  sales_content: string;
  market_highlights: string[];
  area_features: Record<string, string[]>;
}

export interface CityContent {
  sales_content: string;
  neighborhoods: Array<{ name: string; description: string }>;
  amenities: {
    schools?: string[];
    transport?: string[];
    shopping?: string[];
    leisure?: string[];
  };
  market_appeal: string;
}

export async function generateProvinceContent(
  data: ProvinceContentPromptData
): Promise<ProvinceContent> {
  try {
    // Generate main sales content
    const salesContentPrompt = getProvinceContentPrompt(data);
    const salesContent = await callOpenAI([
      {
        role: 'system',
        content: 'Je bent een expert vastgoedmarketeer die overtuigende content schrijft in het Nederlands.',
      },
      {
        role: 'user',
        content: salesContentPrompt,
      },
    ]);

    // Generate highlights
    const highlightsPrompt = getHighlightsPrompt(data.name, 'province');
    const highlightsResponse = await callOpenAI([
      {
        role: 'system',
        content: 'Je bent een expert vastgoedmarketeer. Retourneer alleen valide JSON.',
      },
      {
        role: 'user',
        content: highlightsPrompt,
      },
    ], 0.5);

    let highlights: string[] = [];
    try {
      highlights = JSON.parse(highlightsResponse.trim());
    } catch (e) {
      console.error('Failed to parse highlights:', e);
      highlights = [
        'Uitstekende bereikbaarheid',
        'Sterke arbeidsmarkt',
        'Goede voorzieningen',
      ];
    }

    return {
      sales_content: salesContent,
      market_highlights: highlights,
      area_features: {
        connectivity: ['Goed ontsloten'],
        economy: ['Diverse economie'],
      },
    };
  } catch (error) {
    console.error('Error generating province content:', error);
    throw error;
  }
}

export async function generateCityContent(
  data: CityContentPromptData
): Promise<CityContent> {
  try {
    // Generate main sales content
    const salesContentPrompt = getCityContentPrompt(data);
    const salesContent = await callOpenAI([
      {
        role: 'system',
        content: 'Je bent een expert vastgoedmarketeer die overtuigende content schrijft in het Nederlands.',
      },
      {
        role: 'user',
        content: salesContentPrompt,
      },
    ]);

    // Generate neighborhoods
    const neighborhoodsPrompt = getNeighborhoodsPrompt(data.name);
    const neighborhoodsResponse = await callOpenAI([
      {
        role: 'system',
        content: 'Je bent een expert vastgoedmarketeer. Retourneer alleen valide JSON.',
      },
      {
        role: 'user',
        content: neighborhoodsPrompt,
      },
    ], 0.5);

    let neighborhoods: Array<{ name: string; description: string }> = [];
    try {
      neighborhoods = JSON.parse(neighborhoodsResponse.trim());
    } catch (e) {
      console.error('Failed to parse neighborhoods:', e);
      neighborhoods = [
        { name: 'Centrum', description: 'Het bruisende hart van de stad' },
      ];
    }

    // Generate amenities
    const amenitiesPrompt = getAmenitiesPrompt(data.name);
    const amenitiesResponse = await callOpenAI([
      {
        role: 'system',
        content: 'Je bent een expert vastgoedmarketeer. Retourneer alleen valide JSON.',
      },
      {
        role: 'user',
        content: amenitiesPrompt,
      },
    ], 0.5);

    let amenities: CityContent['amenities'] = {};
    try {
      amenities = JSON.parse(amenitiesResponse.trim());
    } catch (e) {
      console.error('Failed to parse amenities:', e);
      amenities = {
        schools: ['Diverse scholen'],
        transport: ['Goed bereikbaar'],
        shopping: ['Winkelcentrum'],
        leisure: ['Recreatiemogelijkheden'],
      };
    }

    // Generate market appeal
    const marketAppealPrompt = `Schrijf in 2-3 zinnen waarom woningen in ${data.name} goed verkopen. Wees specifiek en overtuigend.`;
    const marketAppeal = await callOpenAI([
      {
        role: 'system',
        content: 'Je bent een expert vastgoedmarketeer die overtuigende content schrijft in het Nederlands.',
      },
      {
        role: 'user',
        content: marketAppealPrompt,
      },
    ], 0.7);

    return {
      sales_content: salesContent,
      neighborhoods,
      amenities,
      market_appeal: marketAppeal,
    };
  } catch (error) {
    console.error('Error generating city content:', error);
    throw error;
  }
}
