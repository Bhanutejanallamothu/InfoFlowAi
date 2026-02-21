'use server';
/**
 * @fileOverview An AI agent that answers employee questions based on an internal knowledge base.
 *
 * - employeeKnowledgeQuery - A function that handles the employee knowledge query process.
 * - EmployeeKnowledgeQueryInput - The input type for the employeeKnowledgeQuery function.
 * - EmployeeKnowledgeQueryOutput - The return type for the employeeKnowledgeQuery function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

// Input Schema
const EmployeeKnowledgeQueryInputSchema = z
  .string()
  .describe('The natural language question from the employee.');
export type EmployeeKnowledgeQueryInput = z.infer<typeof EmployeeKnowledgeQueryInputSchema>;

// Output Schema
const EmployeeKnowledgeQueryOutputSchema = z
  .string()
  .describe('A concise and accurate answer derived from the internal knowledge base.');
export type EmployeeKnowledgeQueryOutput = z.infer<typeof EmployeeKnowledgeQueryOutputSchema>;

// Tool to retrieve documents
const retrieveDocumentsTool = ai.defineTool(
  {
    name: 'retrieveDocuments',
    description: 'Retrieves relevant documents from the internal knowledge base based on the user\'s query.',
    inputSchema: z.object({
      query: z.string().describe('The user\'s question to query the knowledge base.'),
    }),
    outputSchema: z.array(z.string()).describe('An array of relevant document snippets or summaries.'),
  },
  async (input) => {
    // In a real application, this would call a backend service or directly query a vector database
    // to retrieve relevant document chunks based on the 'input.query'.
    // For this implementation, we will return mock data.
    console.log(`Retrieving documents for query: "${input.query}"`);
    if (input.query.toLowerCase().includes('vacation policy')) {
      return [
        "Company vacation policy states that all full-time employees are eligible for 15 days of paid vacation leave per year.",
        "Vacation requests must be submitted at least two weeks in advance through the HR portal.",
        "Unused vacation days can be rolled over to the next year, up to a maximum of 5 days."
      ];
    } else if (input.query.toLowerCase().includes('expense report')) {
      return [
        "Expense reports must be submitted within 30 days of the expense incurrence.",
        "All expenses over $50 require a receipt. Digital copies are acceptable.",
        "Approved expense categories include travel, client entertainment, and office supplies."
      ];
    } else if (input.query.toLowerCase().includes('onboarding process')) {
        return [
          "The onboarding process for new employees includes a one-week orientation program.",
          "New hires are assigned a mentor for their first three months.",
          "Access to company systems is provisioned on the first day of employment."
        ]
    }
    return [
      "No specific documents found for this query. The knowledge base contains general information about company policies and guidelines.",
      "For detailed information, please refer to the official company handbook available on the intranet."
    ];
  }
);

// Prompt definition
const employeeKnowledgeQueryPrompt = ai.definePrompt({
  name: 'employeeKnowledgeQueryPrompt',
  input: { schema: EmployeeKnowledgeQueryInputSchema },
  output: { schema: EmployeeKnowledgeQueryOutputSchema },
  tools: [retrieveDocumentsTool],
  prompt: `You are InfoFlow AI, an intelligent internal knowledge assistant for company employees.\nYour task is to answer employee questions concisely and accurately, strictly based on the information available in the internal knowledge base.\n\nFirst, use the 'retrieveDocuments' tool to find relevant information for the user's question.\nThen, synthesize the retrieved documents to formulate a clear and direct answer.\nIf the retrieved documents do not contain enough information to answer the question, state that you cannot provide a complete answer based on the available information.\nDo not make up information or speculate.\n\nQuestion: {{{this}}}`,
});

// Flow definition
const employeeKnowledgeQueryFlow = ai.defineFlow(
  {
    name: 'employeeKnowledgeQueryFlow',
    inputSchema: EmployeeKnowledgeQueryInputSchema,
    outputSchema: EmployeeKnowledgeQueryOutputSchema,
  },
  async (question) => {
    const { output } = await employeeKnowledgeQueryPrompt(question);
    return output!;
  }
);

// Wrapper function
export async function employeeKnowledgeQuery(
  question: EmployeeKnowledgeQueryInput
): Promise<EmployeeKnowledgeQueryOutput> {
  return employeeKnowledgeQueryFlow(question);
}
