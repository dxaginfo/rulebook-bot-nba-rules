/**
 * This is a simulated vector database search service
 * In a real application, this would connect to Pinecone or another vector DB
 */

// Mock database of rule sections for development
const mockRuleSections = [
  "RULE 1 - COURT DIMENSIONS. The playing court shall be measured and marked as shown in the court diagram. The court shall be 94 feet long and 50 feet wide from the inner edges of the boundary lines. The court shall be divided into two equal parts by the center line, which shall be drawn parallel to the end lines.",
  
  "RULE 8, SECTION II—BALL IN BACKCOURT. A player shall not be the first to touch a ball which he or a teammate caused to go from frontcourt to backcourt while his team was in control of the ball. EXCEPTION: Rule 8—Section III—e. During a jump ball, a try for a goal, or a situation in which a player taps the ball away from a congested area as defined in Rule 8—Section II—d. PENALTY: Loss of ball. The ball is awarded to the opposing team at the midcourt line.",
  
  "RULE 10, SECTION VIII—THREE-SECOND RULE. An offensive player shall not remain for more than three seconds in that part of his free throw lane between the end line and extended 4' (imaginary) off the court and the farther edge of the free throw line while the ball is in control of his team. Allowance may be made for a player who, having been in this area for less than three seconds, is in the act of shooting at the end of the third second. Under these conditions, the 3-second count is discontinued while his continuous motion is toward the basket. If that continuous motion ceases, the previous 3-second count is continued. This is not to be confused with the count toward the 5-second rule.",
  
  "RULE 11, SECTION I—GOALTENDING. A player shall not touch the ball or the basket ring when the ball is sitting or rolling on the ring and using the basket ring as its lower base or hang on the rim while the ball is passing through. EXCEPTION: If a player near his own basket has his hand legally in contact with the ball, it is not a violation if his contact with the ball continues after the ball enters the cylinder, or if, in such action, he touches the basket. The cylinder is the imaginary vertical extension of the ring. All players must be allowed to play the ball in the vertical space immediately above the ring. PENALTY: The goal is scored when it involves the offensive team. A game ball shall be awarded to the offensive team at the free throw line extended when it involves the defensive team. NOTE: If the imaginary rectangle above the basket is violated, the points are awarded.",
  
  "RULE 12, SECTION I—FOULS (3) Clear Path to the Basket: If a personal foul is committed against an offensive player with the ball while that offensive player has a clear path to the basket, a clear path to the basket foul is called and the offensive team is awarded two free throws and the ball out of bounds on the sideline nearest the spot where play was interrupted but no further back than the free throw line extended. The clear path to the basket foul is defined as a personal foul against any offensive player during his team's transition scoring opportunity in the following circumstances: (1) the ball is ahead of the tip of the circle in the backcourt; (2) the offensive player is in control of the ball (or a pass has been thrown to him) with a clear path to the basket; and (3) there is no defender ahead of the offensive player in the frontcourt who is in a position to defend against the offensive player."
];

/**
 * Search for relevant rule sections based on the user's question
 * @param query - The user's question about NBA rules
 * @returns An array of relevant rule sections
 */
export async function searchRules(query: string): Promise<string[]> {
  // In a real implementation, this would:
  // 1. Convert the query to an embedding using OpenAI or another embedding service
  // 2. Search the vector database for similar embeddings
  // 3. Return the corresponding rule sections
  
  // For this simplified version, we'll just filter based on keywords
  const keywords = query.toLowerCase().split(' ');
  
  const relevantRules = mockRuleSections.filter(rule => {
    const ruleLower = rule.toLowerCase();
    return keywords.some(keyword => 
      keyword.length > 3 && ruleLower.includes(keyword)
    );
  });
  
  // If no specific rules were found, return a default subset
  return relevantRules.length > 0 ? relevantRules : [mockRuleSections[0]];
}