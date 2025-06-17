import { openai } from '../config/openaiConfig';
import { searchRules } from './vectorStore';

/**
 * Generate a response based on user's question about NBA rules
 * @param userQuestion - The user's question about NBA rules
 * @returns A formatted response with rule citation and explanation
 */
export async function generateRuleResponse(userQuestion: string): Promise<string> {
  try {
    // In a real implementation, this would search the vector database
    // for now, we'll return a simulated response
    const relevantRules = await searchRules(userQuestion);

    // Build prompt with retrieved rule context
    const prompt = `
      You are RuleBook Bot, an AI assistant that helps people understand the NBA rulebook.
      
      Relevant NBA rulebook sections:
      ${relevantRules.join('\n\n')}
      
      User Question: ${userQuestion}
      
      Provide a clear, concise answer based on the official NBA rulebook. 
      Include the specific rule citation (Rule X, Section Y) when applicable.
      Use plain language to explain complex rules and include a brief example when helpful.
      If the answer isn't clearly covered in the provided rulebook sections, acknowledge this and provide your best interpretation based on general basketball knowledge, but make it clear you're not citing an official rule.
    `;

    // This would call the real OpenAI API in production
    // For this implementation, we'll simulate a response
    console.log('Generated prompt for OpenAI:', prompt);
    
    // For development, return a simulated response instead of calling the API
    return simulateAIResponse(userQuestion);
  } catch (error) {
    console.error('Error generating rule response:', error);
    throw new Error('Failed to generate a response to your question');
  }
}

// This function simulates an AI response for development purposes
// In a production environment, this would be replaced with a real API call
function simulateAIResponse(question: string): string {
  const responses: Record<string, string> = {
    'default': "According to the NBA rulebook, this specific scenario isn't explicitly covered in the sections I have access to. However, based on general basketball principles, I can provide some guidance. For a more definitive answer, you might want to consult the full official NBA rulebook or an official NBA referee.",
    
    'backcourt': "According to the NBA rulebook (Rule 8, Section II), a backcourt violation occurs when a team in possession of the ball in their frontcourt causes the ball to go into the backcourt, and they are the first to touch the ball in the backcourt. Once a team establishes possession in the frontcourt, they cannot return the ball to the backcourt. The penalty is loss of possession, with the opposing team receiving the ball at the nearest point on the sideline.",
    
    'three': "According to the NBA rulebook (Rule 10, Section VIII), an offensive player cannot remain in the restricted area (the 'key' or 'paint') for more than three consecutive seconds while their team is in control of the ball in the frontcourt. This is commonly known as the '3-second violation' or 'three in the key.' The count resets when the ball is shot, possession changes, or the offensive player steps out of the restricted area with both feet. The penalty is a turnover, and the opposing team is awarded the ball at the nearest point on the sideline.",
    
    'goaltending': "According to the NBA rulebook (Rule 11, Section I), goaltending occurs when a player touches the ball on its downward flight, entirely above the rim level, with a chance to go into the basket. It's also goaltending when a player touches the ball while it's in the cylinder (imaginary extension of the rim), or touches the ball after it touches the backboard when it's above ring level. The penalty is that the basket counts (2 or 3 points) if it was an offensive shot, or a basket interference technical if done on a free throw.",
    
    'clear path': "According to the NBA rulebook (Rule 12, Section I, item 3), a clear path foul occurs when a defender commits a personal foul against an offensive player who has a clear path to the basket with no defenders ahead. The specific criteria are: the ball is ahead of the tip of the circle in the backcourt, the offensive player is in control of the ball with a clear path to the basket, and no defender is ahead of the offensive player. The penalty is two free throws plus possession of the ball on the sideline nearest the spot of the foul."
  };

  // Match the question to the most relevant pre-defined response
  if (question.toLowerCase().includes('backcourt') || question.toLowerCase().includes('back court')) {
    return responses['backcourt'];
  } else if (question.toLowerCase().includes('three second') || question.toLowerCase().includes('3 second') || question.toLowerCase().includes('3-second')) {
    return responses['three'];
  } else if (question.toLowerCase().includes('goaltend') || question.toLowerCase().includes('goal tend')) {
    return responses['goaltending'];
  } else if (question.toLowerCase().includes('clear path')) {
    return responses['clear path'];
  }

  return responses['default'];
}