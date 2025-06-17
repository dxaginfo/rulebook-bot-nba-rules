import fs from 'fs';
import pdf from 'pdf-parse';

interface RuleFragment {
  id: string;
  text: string;
  section: string;
  metadata: {
    title?: string;
    page?: number;
  };
}

/**
 * Parse NBA rulebook PDF and extract rule fragments
 * @param pdfPath Path to the NBA rulebook PDF file
 * @returns Array of rule fragments
 */
export async function parseNBARulebook(pdfPath: string): Promise<RuleFragment[]> {
  try {
    // Read the PDF file
    const dataBuffer = fs.readFileSync(pdfPath);
    const data = await pdf(dataBuffer);

    // Split the text into sections
    const text = data.text;
    const fragments: RuleFragment[] = [];

    // TODO: Implement more sophisticated parsing logic
    // This is a simplified example - a real implementation would need more complex parsing
    const sections = text.split(/RULE \d+:/);
    
    let fragmentId = 1;
    sections.forEach((section, sectionIndex) => {
      if (section.trim().length === 0) return;

      // Try to extract the section title
      let title = '';
      const titleMatch = section.match(/^[\s\n]*([A-Z][A-Z\s\n]+)/i);
      if (titleMatch) {
        title = titleMatch[1].replace(/\n/g, ' ').trim();
      }

      // Split section into paragraphs for more granular fragments
      const paragraphs = section.split(/\n{2,}/);
      
      paragraphs.forEach((paragraph, paraIndex) => {
        const trimmedPara = paragraph.replace(/\n/g, ' ').trim();
        if (trimmedPara.length < 20) return; // Skip very short paragraphs

        fragments.push({
          id: `fragment-${fragmentId++}`,
          text: trimmedPara,
          section: `RULE ${sectionIndex}: ${title}`,
          metadata: {
            title: title,
            page: paraIndex + 1, // Approximate page number
          }
        });
      });
    });

    return fragments;
  } catch (error) {
    console.error('Error parsing NBA rulebook:', error);
    throw error;
  }
}