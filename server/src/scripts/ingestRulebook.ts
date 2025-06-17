/**
 * This script can be used to ingest the NBA rulebook into the vector store.
 * It would be run as a one-time setup process before deploying the application.
 */

import dotenv from 'dotenv';
import { parseNBARulebook } from '../utils/pdfParser';
import { PineconeStore } from '../services/pineconeStore';

dotenv.config();

const RULEBOOK_PATH = './data/nba_rulebook.pdf';

async function ingestRulebook() {
  try {
    console.log('Starting NBA rulebook ingestion...');

    // Parse the rulebook PDF
    console.log(`Parsing rulebook from ${RULEBOOK_PATH}...`);
    const fragments = await parseNBARulebook(RULEBOOK_PATH);
    console.log(`Extracted ${fragments.length} rule fragments`);

    // Store the fragments in the vector store
    console.log('Storing fragments in vector database...');
    const vectorStore = new PineconeStore();
    await vectorStore.storeRuleFragments(fragments);

    console.log('NBA rulebook ingestion complete!');
  } catch (error) {
    console.error('Error ingesting rulebook:', error);
    process.exit(1);
  }
}

ingestRulebook();