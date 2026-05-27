# ADR-004: pgvector over dedicated vector database

## Status
Accepted

## Context
Semantic search requires vector storage and similarity queries. Dedicated vector databases (Pinecone, Weaviate, Qdrant) are purpose-built for this but introduce an additional managed service, additional cost, and an additional failure point.

## Decision
Use pgvector extension on the existing PostgreSQL instance. Vectors stored in content_embeddings table. IVFFlat index for cosine similarity queries.

## Consequences
- Single database service for relational data and vectors
- No additional managed service or API key
- IVFFlat index performs well to ~1M vectors — site content will never approach this
- If vector search requirements grow significantly, migration to a dedicated vector DB is straightforward as the search interface in lib/search.ts is abstracted
