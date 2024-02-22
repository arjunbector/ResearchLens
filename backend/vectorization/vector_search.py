import cohere
from pinecone import Pinecone
import numpy as np

co = cohere.Client("t0Mx5tqf3LUES4txS8wBJoy59SqbEGG0t2s23geS")
pc = Pinecone(api_key="9700a57b-5f74-475e-b556-2cd1b75f494f")

query = "What are biopotential electrodes and what are their applications?"
index_name = 'researchlens'

xq = co.embed(
    texts=[query],
    model='embed-english-v3.0',
    input_type='search_query',
    truncate='END'
).embeddings

xq = xq[0]
index = pc.Index(index_name)

res = index.query(
  vector=xq,
  top_k=3,
  include_metadata=True
)

for match in res['matches']:
    print(match['metadata']['original_text'])