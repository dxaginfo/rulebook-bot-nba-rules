import { Pinecone, PineconeRecord } from '@pinecone-database/pinecone';
import { OpenAI } from 'openai';
import dotenv from 'dotenv';

dotenv.config();

// Define the structure of a rule fragment
interface RuleFragment {
  id: string;
  text: string;
  section: string;
  metadata: {
    title?: string;
    page?: number;
  };
}

export class PineconeStore {
  private pinecone: Pinecone;
  private openai: OpenAI;
  private indexName: string;

  constructor() {
    // Initialize Pinecone client
    this.pinecone = new Pinecone({
      apiKey: process.env.PINECONE_API_KEY || '',
      environment: process.env.PINECONE_ENVIRONMENT || '',
    });

    // Initialize OpenAI client for embeddings
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    this.indexName = process.env.PINECONE_INDEX || 'nba-rulebook';
  }

  /**
   * Search for relevant rule fragments based on a query
   * @param query The user's question or query
   * @returns Array of relevant rule fragments
   */
  async search(query: string): Promise<RuleFragment[]> {
    try {
      // Get vector embedding for the query
      const embedding = await this.getEmbedding(query);

      // Search Pinecone index
      const index = this.pinecone.index(this.indexName);
      const queryResponse = await index.query({
        vector: embedding,
        topK: 5,
        includeMetadata: true,
      });

      // Map results to RuleFragment interface
      const results: RuleFragment[] = queryResponse.matches.map((match) => {
        return {
          id: match.id,
          text: match.metadata?.text as string || '',
          section: match.metadata?.section as string || '',
          metadata: {
            title: match.metadata?.title as string,
            page: match.metadata?.page as number,
          },
        };
      });

      return results;
    } catch (error) {
      console.error('Error searching vector store:', error);
      return [];
    }
  }

  /**
   * Get vector embedding for a text string
   * @param text The text to get an embedding for
   * @returns Vector embedding as number array
   */
  private async getEmbedding(text: string): Promise<number[]> {
    const response = await this.openai.embeddings.create({
      model: 'text-embedding-ada-002',
      input: text,
    });

    return response.data[0].embedding;
  }

  /**
   * Store rule fragments in the vector store
   * This would be used during initial setup to ingest the rulebook
   * @param fragments Array of rule fragments to store
   */
  async storeRuleFragments(fragments: RuleFragment[]): Promise<void> {
    try {
      const records: PineconeRecord[] = [];

      // Process fragments in batches for efficiency
      for (const fragment of fragments) {
        const embedding = await this.getEmbedding(fragment.text);
        
        records.push({
          id: fragment.id,
          values: embedding,
          metadata: {
            text: fragment.text,
            section: fragment.section,
            title: fragment.metadata.title,
            page: fragment.metadata.page,
          },
        });

        // If we have 100 records, upsert them
        if (records.length >= 100) {
          const index = this.pinecone.index(this.indexName);
          await index.upsert(records);
          records.length = 0; // Clear the array
        }
      }

      // Upsert any remaining records
      if (records.length > 0) {
        const index = this.pinecone.index(this.indexName);
        await index.upsert(records);
      }

      console.log(`Successfully stored ${fragments.length} rule fragments`);
    } catch (error) {
      console.error('Error storing rule fragments:', error);
      throw error;
    }
  }
}